import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import Opiniones from '../components/products/Opiniones';
import styles from './DetalleMerch.module.css';

const DetalleMerch = () => {
  const { id } = useParams();
  const { agregarACarrito } = useCarrito();

  const [itemMerch, setItemMerch] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const obtenerRutaImagen = (ruta) => {
    if (!ruta) return '';
    return ruta.startsWith('../') ? ruta.replace('..', '') : ruta;
  };

  const manejarAgregarACarrito = () => {
    if (!itemMerch) return;

    const productoFormateado = {
      id: itemMerch.id,
      nombre: itemMerch.nombre,
      precio: itemMerch.precio,
      imagen: obtenerRutaImagen(itemMerch.imagen)
    };

    agregarACarrito({ producto: productoFormateado, cantidad: 1 });
  };

  useEffect(() => {
    const obtenerMerch = async () => {
      try {
        setCargando(true);
        setError(null);

        const res = await fetch('/data/merch.json');
        if (!res.ok) {
          throw new Error('No se pudo cargar el catálogo de merchandising');
        }

        const datosLocales = await res.json();
        const encontrado = datosLocales.find(
          (item) => String(item.id) === String(id)
        );

        if (!encontrado) {
          throw new Error('El artículo de merchandising no existe');
        }

        setItemMerch(encontrado);
      } catch (err) {
        console.error('Error al cargar detalle de merch:', err);
        setError(err.message || 'Error al cargar el artículo');
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      obtenerMerch();
    }
  }, [id]);

  if (cargando) {
    return <div className={styles.statusContainer}>Cargando detalle del artículo...</div>;
  }

  if (error) {
    return <div className={styles.statusContainer}>Error: {error}</div>;
  }

  if (!itemMerch) {
    return <div className={styles.statusContainer}>Artículo no encontrado</div>;
  }

  return (
    <div className={styles.container}>
      
      <h1 className={styles.pageTitle}>Equipamiento Arcadia</h1>

      
      <Link to="/productos" className={styles.backLink}>
        ← Volver a equipamiento
      </Link>

      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          <img
            src={obtenerRutaImagen(itemMerch.imagen)}
            alt={itemMerch.nombre}
            className={styles.image}
          />
        </div>

        <div className={styles.infoSection}>
          <span className={styles.categoryTag}>
            {itemMerch.categoria}
          </span>
          <h2 className={styles.title}>{itemMerch.nombre}</h2>
          <p className={styles.price}>AR${itemMerch.precio.toLocaleString('es-AR')}</p>

          <h3 className={styles.descriptionTitle}>Descripción</h3>
          <p className={styles.description}>{itemMerch.descripcion}</p>

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

export default DetalleMerch;