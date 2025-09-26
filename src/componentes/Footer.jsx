import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.
        </p>
        <div className={styles.links}>
          <a href="#about">Acerca de</a>
          <a href="#services">Servicios</a>
          <a href="#contact">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
