// Crear.jsx
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from './Crear.module.css';

export default function Crear() {
  const [nombre, setNombre] = useState('');
  const [detalle, setDetalle] = useState('');
  const [imagen, setImagen] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'libros'), {
        nombre,
        detalle,
        imagen
      });

      setMensaje(`✅ Libro creado con ID: ${docRef.id}`);
      setNombre('');
      setDetalle('');
      setImagen('');
    } catch (error) {
      console.error('Error creando libro:', error);
      setMensaje('❌ Error al crear libro');
    }
  };

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>Crear libro</h2>

      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className={styles.grupo}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.input}
            placeholder="Nombre del libro"
            required
          />
        </div>

        <div className={styles.grupo}>
          <label className={styles.label}>Detalle</label>
          <textarea
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            className={styles.textarea}
            placeholder="Descripción o detalles del libro"
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

        {/* Vista previa */}
        {imagen && (
          <div className={styles.vistaPrevia}>
            <p>Vista previa:</p>
            <img
              src={imagen}
              alt="Vista previa"
              className={styles.imagenPrevia}
              onError={(e) => {
                // si la URL no carga imagen mostramos fallback
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
