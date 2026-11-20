import { Link } from 'react-router-dom';
import styles from './Genero.module.css';

const Genero = () => {
  const generos = [
    { nombre: 'Souls-like', imagen: 'https://i.ibb.co/JFn4PX63/Wukong.webp', ruta: '/productos?genero=souls-like' },
    { nombre: 'Terror', imagen: 'https://i.ibb.co/TMmc2thS/Resident-Evil.webp', ruta: '/productos?genero=terror' },
    { nombre: 'Supervivencia', imagen: 'https://i.ibb.co/C5Fssq3f/Proyect-Zomboid.webp', ruta: '/productos?genero=supervivencia' },
    { nombre: 'Mundo abierto', imagen: 'https://i.ibb.co/Ps390Jxx/GTA-V.webp', ruta: '/productos?genero=mundo-abierto' },
    { nombre: 'Acción', imagen: 'https://i.ibb.co/FkQnpLtZ/God-of-War.jpg', ruta: '/productos?genero=accion' },
    { nombre: 'Deportes', imagen: 'https://i.ibb.co/qYtW3HVZ/Fifa.webp', ruta: '/productos?genero=deportes' },
    { nombre: 'RPG', imagen: 'https://i.ibb.co/Kpv9J8bh/Elden-Ring.jpg', ruta: '/productos?genero=rpg' },
    { nombre: 'Shooter', imagen: 'https://i.ibb.co/MyK69JZh/Call-of-Duty.webp', ruta: '/productos?genero=shooter' },
    { nombre: 'Retro', imagen: 'https://i.ibb.co/7JpK3s9Y/Retro.avif', ruta: '/productos?genero=retro' },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Explora por género</h2>
      <div className={styles.grid}>
        {generos.map((gen, index) => (
          <Link to={gen.ruta} key={index} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={gen.imagen} alt={gen.nombre} className={styles.image} />
            </div>
            <h6 className={styles.cardTitle}>{gen.nombre}</h6>
          </Link>
        ))}
      </div>

      <div className={styles.bannerContainer}>
        <img src="https://i.ibb.co/ch0FLdVs/Arcade.jpg" alt="Arcadia Banner" className={styles.bannerImage} />
      </div>
    </div>
  );
};

export default Genero;