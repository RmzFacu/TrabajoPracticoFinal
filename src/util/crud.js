import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Crear libro con precio
export async function crearLibro(nombre, detalle, imagen, precio = 0) {
  try {
    const docRef = await addDoc(collection(db, "libros"), {
      nombre,
      detalle,
      imagen,
      precio, // nuevo campo
    });
    console.log("Documento creado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creando libro:", error);
    throw error;
  }
}

// Obtener todos los libros
export async function obtenerLibros() {
  try {
    const querySnapshot = await getDocs(collection(db, "libros"));
    const libros = [];
    querySnapshot.forEach((doc) => {
      libros.push({ id: doc.id, ...doc.data() });
    });
    return libros;
  } catch (error) {
    console.error("Error obteniendo libros:", error);
    return [];
  }
}

// Obtener libro por ID
export async function obtenerLibroPorID(id) {
  try {
    const docRef = doc(db, "libros", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No existe el libro");
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo libro por ID:", error);
    return null;
  }
}

// Actualizar libro incluyendo precio
export async function actualizarLibro(id, datosActualizados) {
  try {
    const docRef = doc(db, "libros", id);
    await updateDoc(docRef, datosActualizados);
    console.log("Libro actualizado");
  } catch (error) {
    console.error("Error actualizando libro:", error);
  }
}

// Eliminar libro
export async function eliminarLibro(id) {
  try {
    const docRef = doc(db, "libros", id);
    await deleteDoc(docRef);
    console.log("Libro eliminado");
  } catch (error) {
    console.error("Error eliminando libro:", error);
  }
}
