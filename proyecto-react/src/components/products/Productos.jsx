import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";

import styles from "./Productos.module.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);
        
        const listaProductos = resp.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProductos(listaProductos);
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) return <div className={styles.loader}>Cargando productos...</div>;

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.mainTitle}>Catálogo de Juegos</h1>
      <h2 className={styles.subTitle}>Juegos en oferta</h2>

      {productos.length === 0 ? (
        <p className={styles.emptyMessage}>No hay productos disponibles.</p>
      ) : (
        <div className={styles.container}>
          {productos.map(prod => (
            <div key={prod.id} className={styles.card}>
              <Link to={`/producto/${prod.id}`} className={styles.imageLink}>
                {prod.imagen && (
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className={styles.image}
                  />
                )}
              </Link>

              <div className={styles.header}>
                <Link to={`/producto/${prod.id}`} className={styles.titleLink}>
                  <h3 className={styles.title}>{prod.nombre}</h3>
                </Link>
              </div>

              {prod.categoria && (
                <span className={styles.category}>{prod.categoria}</span>
              )}

              <p className={styles.price}>AR${prod.precio}</p>

              <div className={styles.controls}>
                <Link to={`/producto/${prod.id}`} className={styles.buyButton}>
                  Ver Detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;