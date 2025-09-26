import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerLibroPorID, actualizarLibro } from "../util/crud";
import styles from "../pages/Edita.module.css"; // CSS Module sugerido

export default function EditarLibro() {
  const { id } = useParams(); // id del libro
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [detalle, setDetalle] = useState("");
  const [imagen, setImagen] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Cargar datos del libro al montar
  useEffect(() => {
    async function fetchLibro() {
      try {
        const libro = await obtenerLibroPorID(id);
        if (libro) {
          setNombre(libro.nombre);
          setDetalle(libro.detalle);
          setImagen(libro.imagen || "");
        }
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLibro();
  }, [id]);

  // Guardar cambios
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await actualizarLibro(id, { nombre, detalle, imagen });
      navigate("/"); // volver al listado
    } catch (error) {
      console.error("Error al actualizar libro:", error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p style={{ padding: "1rem" }}>Cargando libro...</p>;

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.titulo}>Editar Libro</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre</label>
          <input
            className={styles.input}
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Detalle</label>
          <textarea
            className={styles.textarea}
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>URL Imagen</label>
          <input
            className={styles.input}
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </div>

        <div className={styles.botones}>
          <button type="submit" className={styles.botonGuardar} disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            className={styles.botonCancelar}
            onClick={() => navigate("/")}
            disabled={saving}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
