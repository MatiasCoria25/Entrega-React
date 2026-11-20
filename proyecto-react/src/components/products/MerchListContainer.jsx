import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import styles from "./Productos.module.css";
import { useSearch } from "../../context/SearchContext"; // <-- Ajusta la ruta según tu estructura

const MerchListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Consumimos 'busqueda' directamente desde tu SearchContext
  const { busqueda } = useSearch();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        setError(null);

        const res = await fetch('/data/merch.json');
        if (!res.ok) {
          throw new Error('No se pudo cargar el catálogo de merchandising');
        }

        const datos = await res.json();
        setProductos(datos);
      } catch (err) {
        console.error("Error al cargar el merchandising:", err);
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  // Filtramos usando la variable 'busqueda' del contexto global
  const productosFiltrados = productos.filter((producto) => {
    const nombre = producto.nombre || producto.title || "";
    const categoria = producto.categoria || producto.genre || "";
    const termino = (busqueda || "").toLowerCase();

    return (
      nombre.toLowerCase().includes(termino) ||
      categoria.toLowerCase().includes(termino)
    );
  });

  if (cargando) {
    return <div className={styles.loader}>Cargando equipamiento de Arcadia...</div>;
  }

  if (error) {
    return <div className={styles.emptyMessage}>Error: {error}</div>;
  }

  return (
    <section className={styles.pageContainer}>
      <h1 className={styles.mainTitle}>Equipamiento y Merchandising</h1>

      {productosFiltrados.length === 0 ? (
        <div className={styles.emptyMessage}>No se encontraron productos para tu búsqueda.</div>
      ) : (
        <ItemList productos={productosFiltrados} />
      )}
    </section>
  );
};

export default MerchListContainer;