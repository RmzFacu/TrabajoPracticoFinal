import React, { useEffect, useState } from "react";
import { obtenerLibros, eliminarLibro } from "../util/crud";
import styles from "./inicio.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Inicio() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // para redirigir a EditarLibro

  useEffect(() => {
    async function fetchLibros() {
      setLoading(true);
      const data = await obtenerLibros();
      setLibros(data);
      setLoading(false);
    }
    fetchLibros();
  }, []);

  async function handleEliminar(id) {
    if (window.confirm("¿Seguro que quieres eliminar este libro?")) {
      await eliminarLibro(id);
      setLibros((prevLibros) => prevLibros.filter((libro) => libro.id !== id));
    }
  }

  if (loading) {
    return <p style={{ padding: "1rem" }}>Cargando libros...</p>;
  }

  if (!loading && libros.length === 0) {
    return <p style={{ padding: "1rem" }}>No hay ningún libro disponible.</p>;
  }

  return (
    <div className={styles.grid}>
      {libros.map((libro) => (
        <div key={libro.id} className={styles.card}>
          <Link to={`/detalle/${libro.id}`} className={styles.link}>
            {libro.imagen && (
              <img
                src={libro.imagen}
                alt={libro.nombre}
                className={styles.imagen}
              />
            )}
            <h2 className={styles.titulo}>{libro.nombre}</h2>
            <p className={styles.detalle}>{libro.detalle}</p>
          </Link>

          <div className={styles.botones}>
            <button
              className={styles.botonEliminar}
              onClick={() => handleEliminar(libro.id)}
            >
              Eliminar
            </button>
            <button
              className={styles.botonEditar}
              onClick={() => navigate(`/editar/${libro.id}`)} // redirige a EditarLibro
            >
              Editar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
