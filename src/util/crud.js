import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function crearLibro(nombre, detalle, imagen) {
  try {
    const docRef = await addDoc(collection(db, "libros"), {
      nombre: nombre,
      detalle: detalle,
      imagen: imagen // 👈 nuevo campo
    });
    console.log("Documento creado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creando libro:", error);
    throw error;
  }
}


// Corregido: usar getDocs para colecciones
export async function obtenerLibros() {
  try {
    const querySnapshot = await getDocs(collection(db, "libros"));
    const libros = [];
    querySnapshot.forEach((doc) => {
      libros.push({ id: doc.id, ...doc.data() });
    });
    return libros; // <-- aquí devolvemos el array
  } catch (error) {
    console.error("Error obteniendo libros:", error);
    return []; // devolver array vacío si hay error
  }
}

export async function obtenerLibroPorID(id) {
  try {
    const docRef = doc(db, "libros", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }; // <-- devolver datos
    } else {
      console.log("No existe el libro");
      return null;
    }
  } catch (error) {
    console.error("Error obteniendo libro por ID:", error);
    return null;
  }
}


export async function actualizarLibro(id, datosActualizados) {
  try {
    const docRef = doc(db, "libros", id);
    await updateDoc(docRef, datosActualizados); 
    console.log("Libro actualizado");
  } catch (error) {
    console.error("Error actualizando libro:", error);
  }
}

export async function eliminarLibro(id) {
  try {
    const docRef = doc(db, "libros", id);
    await deleteDoc(docRef);
    console.log("Libro eliminado");
  } catch (error) {
    console.error("Error eliminando libro:", error);
  }
}
