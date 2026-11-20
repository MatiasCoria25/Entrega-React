import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import Cupon from '../components/Cupon';
import styles from './Carrito.module.css';

const Carrito = () => {
  const { 
    carrito, 
    vaciarCarrito, 
    eliminarDelCarrito, 
    incrementarCantidad, 
    decrementarCantidad, 
    cobroTotal 
  } = useCarrito();

  if (carrito.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h1 className={styles.emptyTitle}>El carrito está vacío</h1>
        <p className={styles.emptyText}>Agrega productos para continuar la compra.</p>
        <Link to="/productos" className={styles.exploreButton}>
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Carrito de Compras</h1>
      
      <div className={styles.itemsList}>
        {carrito.map(item => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.imageWrapper}>
              <img 
                src={item.imagen || item.image} 
                alt={item.nombre} 
                className={styles.itemImage} 
              />
            </div>
            
            <div className={styles.itemInfo}>
              <h4 className={styles.itemName}>{item.nombre}</h4>
              <p className={styles.itemPrice}>
                Precio unitario: <span>${item.precio}</span>
              </p>
              <p className={styles.itemSubtotal}>
                Subtotal: <span>${(item.precio * item.cantidad).toFixed(2)}</span>
              </p>
            </div>

            <div className={styles.quantityControls}>
              <button 
                onClick={() => decrementarCantidad(item.id)} 
                className={styles.qtyBtn}
              >
                -
              </button>
              <span className={styles.qtyNumber}>{item.cantidad}</span>
              <button 
                onClick={() => incrementarCantidad(item.id)} 
                className={styles.qtyBtn}
              >
                +
              </button>
            </div>

            <button 
              onClick={() => eliminarDelCarrito(item.id)}
              title="Eliminar producto"
              className={styles.deleteBtn}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div style={{ width: '100%' }}>
          <h3 className={styles.totalText}>
            Total a pagar: <span className={styles.totalAmount}>${cobroTotal().toFixed(2)}</span>
          </h3>
          
          
          <Cupon />
        </div>

        <div className={styles.actionButtons} style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
          <button onClick={vaciarCarrito} className={styles.clearBtn}>
            Vaciar Carrito
          </button>
          <button className={styles.checkoutBtn}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrito;