import { db } from './firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

async function initLibros() {
  const colRef = collection(db, 'libros');
  const snapshot = await getDocs(colRef);

  if (snapshot.empty) {
    // no hay libros, creamos iniciales
    await addDoc(colRef, { nombre: 'El principito', detalle: 'Libro clásico infantil', imagen:"https://acdn-us.mitiendanube.com/stores/001/021/730/products/624412-mla27973414072_082018-o-eb4a7ede087f96cbeb15632087585210-1024-1024.webp" });
    await addDoc(colRef, { nombre: '1984', detalle: 'Novela distópica',imagen:"https://media.revistagq.com/photos/662e65beac53f837bf67e619/16:9/w_1600,c_limit/cover-52391.jpg" });
    console.log('Colección libros creada con datos iniciales');
  } else {
    console.log('Ya hay libros, no se crean nuevos');
  }
}

export default initLibros;
