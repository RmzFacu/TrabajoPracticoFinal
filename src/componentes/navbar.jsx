// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* logo con imagen que lleva al inicio */}
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImg} />
          BooksLib
        </Link>

        <ul className={styles.links}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/creacion">Creación</Link></li>
        </ul>
      </div>
    </nav>
  );
}
