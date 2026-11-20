import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Favoritos.module.css';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const storedFavoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
      return storedFavoritos;
    } catch {
      return [];
    }
  });

  const eliminarFavorito = (id) => {
    setFavoritos((favoritosActuales) => {
      const nuevosFavoritos = favoritosActuales.filter((item) => item.id !== id);
      localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
      return nuevosFavoritos;
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>
        Mis Juegos Favoritos
        {favoritos.length > 0 && (
          <span className={styles.badgeCounter}>{favoritos.length}</span>
        )}
      </h1>

      {favoritos.length === 0 ? (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>No tienes juegos guardados en tus favoritos todavía. 🎮</p>
          <Link to="/categorias" className={styles.exploreButton}>
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className={styles.gridFavoritos}>
          {favoritos.map((juego) => (
            <div key={juego.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={juego.imagen} alt={juego.nombre} className={styles.cardImage} />
                <span className={styles.categoryBadge}>{juego.categoria || 'Juego'}</span>
              </div>
              
              <div className={styles.cardInfo}>
                <h3 className={styles.gameTitle}>{juego.nombre}</h3>
                <p className={styles.gamePrice}>${juego.precio?.toLocaleString('es-AR')}</p>
                
                <div className={styles.actions}>
                  <Link to={`/producto/${juego.id}`} className={styles.btnDetail}>
                    Ver Detalle
                  </Link>
                  <button 
                    onClick={() => eliminarFavorito(juego.id)} 
                    className={styles.btnRemove}
                    title="Quitar de favoritos"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;