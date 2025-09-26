// Detalle.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ajusta según tu configuración de Firebase
import styles from "./Detalle.module.css"; // Crea tu CSS Module para detalle

export default function Detalle() {
  const { id } = useParams(); // Obtenemos el id de la URL
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLibro() {
      try {
        const docRef = doc(db, "libros", id); // Referencia al documento específico
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLibro({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No existe el libro con ese ID");
        }
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLibro();
  }, [id]);

  if (loading) return <p>Cargando libro...</p>;
  if (!libro) return <p>Libro no encontrado</p>;

  return (
    <div className={styles.detalleContainer}>
      {libro.imagen && (
        <img src={libro.imagen} alt={libro.nombre} className={styles.imagen} />
      )}
      <h1 className={styles.titulo}>{libro.nombre}</h1>
      <p className={styles.descripcion}>{libro.detalle}</p>
    </div>
  );
}
