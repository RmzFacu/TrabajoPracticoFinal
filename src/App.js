import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './componentes/navbar';
import Inicio from './pages/inicio';
import Footer from './componentes/Footer';
import Detalle from "./pages/Detalle";
import Crear from "./pages/Crear";
import Editar from "./pages/Editar";
import initLibros from './seedFirestore';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    initLibros();
  }, []);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Detalle/:id" element={<Detalle />} />
        <Route path="/Creacion" element={<Crear />} />
        <Route path="/Editar/:id" element={<Editar />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
