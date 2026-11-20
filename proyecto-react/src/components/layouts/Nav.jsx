import { Link, useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import { useCarrito } from '../../context/CarritoContext';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';
import { useFavoritos } from '../../context/FavoritosContext'; 

const Nav = () => {
  const { itemsEnCarrito } = useCarrito();
  const { user, logout } = useAuth();
  const { busqueda, setBusqueda } = useSearch();
  const { favoritos } = useFavoritos(); 
  const navigate = useNavigate();
  const totalItems = itemsEnCarrito();
  const totalFavoritos = favoritos.length; 

  const handleSearchChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/productos');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logoContainer}>
        <img
          src="https://i.ibb.co/tMr83KNq/Logo.png"
          alt="Arcadia"
          className={styles.logo}
        />
      </Link>

      <div className={styles.navLinks}>
        <Link to="/">Inicio</Link>
        <Link to="/categorias">Categorías</Link> 
        <Link to="/productos">Productos</Link>
        <Link to="/juegos">Juegos</Link>
        <Link to="/contacto">Contacto</Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.busqueda}>
        <input
          type="text"
          placeholder="¿Qué estás buscando?"
          value={busqueda}
          onChange={handleSearchChange}
        />
      </form>

      <div className={styles.icons}>
        <div className={styles.authMenu}>
          <ul>
            {user ? (
              <>
                {user.rol === "admin" && (
                  <li>
                    <Link to="/panel" className={styles.adminLink}>
                      Panel
                    </Link>
                  </li>
                )}
                <li>
                  <span className={styles.userGreeting}>¡Hola, {user.email.split('@')[0]}!</span>
                </li>
                <li>
                  <button onClick={logout} className={styles.logoutBtn}>Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className={styles.loginLink}>
                  <img src="/images/login.png" alt="Login" className={styles.loginImg} />
                </Link>
              </li>
            )}
          </ul>
        </div>

        <Link to="/favoritos" className={styles.cartIconWrapper}>
          <img src="/images/favorito.png" alt="Favoritos" className={styles.iconImg} />
          {totalFavoritos > 0 && <span className={styles.badge}>{totalFavoritos}</span>}
        </Link>
        
        
        <Link to="/carrito" className={styles.cartIconWrapper} style={{ position: 'relative' }}>
          <img src="/images/carrito.png" alt="Carrito de compras" />
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>} 
        </Link>
      </div>
    </nav>
  );
};

export default Nav;