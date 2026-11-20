import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCarrito } from '../context/CarritoContext';
import Opiniones from '../components/products/Opiniones';
import styles from './DetalleProducto.module.css';

const DetalleProducto = () => {
  const { id } = useParams();
  const { agregarACarrito } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const manejarAgregarACarrito = () => {
    if (!producto) return;

    const productoFormateado = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen || producto.image
    };

    agregarACarrito({ producto: productoFormateado, cantidad: 1 });
  };

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setCargando(true);
        setError(null);

        
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          
          const res = await fetch('/data/productos.json');
          if (!res.ok) throw new Error('No se pudo acceder a la lista de respaldo');
          
          const datosLocales = await res.json();
          const productoEncontrado = datosLocales.find(p => String(p.id) === String(id));

          if (!productoEncontrado) {
            throw new Error('El producto no existe en el catálogo');
          }

          setProducto(productoEncontrado);
        }
      } catch (err) {
        console.error("Error al cargar producto:", err);
        setError(err.message || 'Error al cargar el producto');
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      obtenerProducto();
    }
  }, [id]);

  if (cargando) {
    return <div className={styles.statusContainer}>Cargando detalle del producto...</div>;
  }

  if (error) {
    return <div className={styles.statusContainer}>Error: {error}</div>;
  }

  if (!producto) {
    return <div className={styles.statusContainer}>Producto no encontrado</div>;
  }

  return (
    <div className={styles.container}>
      <Link to="/juegos" className={styles.backLink}>
        ← Volver al catalogo
      </Link>

      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <img 
            src={producto.imagen || producto.image} 
            alt={producto.nombre} 
            className={styles.image} 
          />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.categoryTag}>
            {producto.categoria || producto.genero || 'Juego Digital'}
          </span>
          <h1 className={styles.title}>{producto.nombre}</h1>
          <p className={styles.price}>AR${producto.precio}</p>
          
          <h3 className={styles.descriptionTitle}>Descripción</h3>
          <p className={styles.description}>{producto.descripcion}</p>

          <button className={styles.buyButton} onClick={manejarAgregarACarrito}>
            Agregar al carrito
          </button>
        </div>
      </div>

      
      <section className={styles.seccionOpiniones}>
        <Opiniones productoId={id} />
      </section>
    </div>
  );
};

export default DetalleProducto;