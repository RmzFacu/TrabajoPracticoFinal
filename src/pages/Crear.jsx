import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from './Crear.module.css';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export default function Crear() {
  const [nombre, setNombre] = useState('');
  const [detalle, setDetalle] = useState('');
  const [imagen, setImagen] = useState('');
  const [precio, setPrecio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const precioNum = precio ? parseFloat(precio) : 0;

      const docRef = await addDoc(collection(db, 'libros'), {
        nombre,
        detalle,
        imagen,
        precio: precioNum,
      });

      setMensaje(`✅ Libro creado con ID: ${docRef.id}`);
      setNombre('');
      setDetalle('');
      setImagen('');
      setPrecio('');

      // Redirigir inmediatamente al componente Inicio
      navigate('/'); // Cambiar '/' si tu ruta de inicio es diferente
    } catch (error) {
      console.error('Error creando libro:', error);
      setMensaje('❌ Error al crear libro');
    }
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Introducir Producto</h2>

      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className={styles.grupo}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.input}
            placeholder="Nombre del Producto"
            required
          />
        </div>

        <div className={styles.grupo}>
          <label className={styles.label}>Detalle</label>
          <textarea
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            className={styles.textarea}
            placeholder="Descripcion del producto"
            required
          />
        </div>

        <div className={styles.grupo}>
          <label className={styles.label}>Imagen (URL)</label>
          <input
            type="url"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className={styles.input}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div className={styles.grupo}>
          <label className={styles.label}>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className={styles.input}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        {imagen && (
          <div className={styles.vistaPrevia}>
            <p>Vista previa:</p>
            <img
              src={imagen}
              alt="Vista previa"
              className={styles.imagenPrevia}
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/250x150.png?text=No+disponible';
              }}
            />
          </div>
        )}

        <button type="submit" className={styles.boton}>
          Guardar
        </button>
      </form>

      {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
    </div>
  );
}
