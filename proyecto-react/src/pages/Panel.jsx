import { useState, useEffect, useMemo, useCallback } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import merch from '../../public/data/merch.json';
import productos from '../../public/data/productos.json';
import FormProductoContainer from '../components/products/FormProductoContainer';
import Paginacion from '../components/Paginacion';
import Cupon from '../components/Cupon';
import ConfirmModal from '../components/ConfirmModal';
import Registro from './Registro';
import styles from './Panel.module.css';

const TAMANO_PAGINA = 8;

const Panel = () => {
  const [tabActivo, setTabActivo] = useState('productos');
  const [productosFirestore, setProductosFirestore] = useState([]);
  const [productosJson, setProductosJson] = useState(() => {
    const merchItems = (merch || []).map((item, idx) => ({
      ...item,
      id: item.id ?? `merch-${idx}`,
      origen: 'json',
      fuente: 'merch.json',
    }));

    const prodItems = (productos || []).map((item, idx) => ({
      ...item,
      id: item.id ?? `prod-${idx}`,
      origen: 'json',
      fuente: 'productos.json',
    }));

    return [...merchItems, ...prodItems];
  });

  const [usuarios, setUsuarios] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);

  const [productoAEditar, setProductoAEditar] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const cargarDatosPanel = useCallback(async () => {
    setCargandoProductos(true);
    try {
      const productosRef = collection(db, 'productos');
      const respProductos = await getDocs(productosRef);
      setProductosFirestore(
        respProductos.docs.map((documento) => ({
          ...documento.data(),
          id: documento.id,
          origen: 'firestore',
        }))
      );

      const usuariosRef = collection(db, 'usuarios');
      const respUsuarios = await getDocs(usuariosRef);
      setUsuarios(
        respUsuarios.docs.map((documento) => ({
          ...documento.data(),
          id: documento.id,
        }))
      );
    } catch (error) {
      console.error('Error al obtener los datos del panel:', error);
    } finally {
      setCargandoProductos(false);
    }
  }, []);

  useEffect(() => {
    cargarDatosPanel();
  }, [cargarDatosPanel]);

  const todosLosProductos = useMemo(
    () => [...productosFirestore, ...productosJson],
    [productosFirestore, productosJson]
  );

  const totalPaginas = useMemo(
    () => Math.max(1, Math.ceil(todosLosProductos.length / TAMANO_PAGINA)),
    [todosLosProductos.length]
  );

  const paginaSegura = Math.min(paginaActual, totalPaginas);

  useEffect(() => {
    if (paginaActual > totalPaginas) {
      setPaginaActual(totalPaginas);
    }
  }, [paginaActual, totalPaginas]);

  const productosPaginados = useMemo(() => {
    const inicio = (paginaSegura - 1) * TAMANO_PAGINA;
    return todosLosProductos.slice(inicio, inicio + TAMANO_PAGINA);
  }, [todosLosProductos, paginaSegura]);

  const solicitarEliminacion = (producto) => {
    setProductoAEliminar(producto);
  };

  const confirmarEliminacion = async () => {
    if (!productoAEliminar) return;

    try {
      setEliminando(true);
      if (productoAEliminar.origen === 'firestore') {
        await deleteDoc(doc(db, 'productos', productoAEliminar.id));
        setProductosFirestore((prev) =>
          prev.filter((prod) => prod.id !== productoAEliminar.id)
        );
      } else {
        setProductosJson((prev) =>
          prev.filter(
            (prod) =>
              !(prod.id === productoAEliminar.id && prod.fuente === productoAEliminar.fuente)
          )
        );
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    } finally {
      setEliminando(false);
      setProductoAEliminar(null);
    }
  };

  const abrirModalAgregar = () => {
    setProductoAEditar(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoAEditar(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setProductoAEditar(null);
    setModalAbierto(false);
  };

  const handleProductoGuardado = async (productoGuardado, esEdicion) => {
    if (esEdicion && productoAEditar?.origen === 'json') {
      setProductosJson((prev) =>
        prev.map((p) =>
          p.id === productoAEditar.id && p.fuente === productoAEditar.fuente
            ? { ...p, ...productoGuardado, id: p.id, origen: 'json', fuente: p.fuente }
            : p
        )
      );
      cerrarModal();
      return;
    }

    if (productoGuardado?.id) {
      const itemConOrigen = { ...productoGuardado, origen: 'firestore' };
      setProductosFirestore((prev) =>
        esEdicion
          ? prev.map((p) => (p.id === itemConOrigen.id ? itemConOrigen : p))
          : [...prev, itemConOrigen]
      );
    } else {
      await cargarDatosPanel();
    }
    cerrarModal();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Panel de Administración</h2>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${tabActivo === 'productos' ? styles.activeTab : ''}`}
          onClick={() => setTabActivo('productos')}
        >
          Productos
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tabActivo === 'cupones' ? styles.activeTab : ''}`}
          onClick={() => setTabActivo('cupones')}
        >
          Cupones
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tabActivo === 'registros' ? styles.activeTab : ''}`}
          onClick={() => setTabActivo('registros')}
        >
          Usuarios Registrados
        </button>
        <button
          type="button"
          className={`${styles.tab} ${tabActivo === 'nuevo-registro' ? styles.activeTab : ''}`}
          onClick={() => setTabActivo('nuevo-registro')}
        >
          + Registrar Usuario
        </button>
      </div>

      {tabActivo === 'productos' && (
        <section>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              Listado de Productos ({todosLosProductos.length})
            </h3>
            <button type="button" className={styles.btnPrimary} onClick={abrirModalAgregar}>
              <span>+</span> Agregar Producto
            </button>
          </div>

          {cargandoProductos ? (
            <p className={styles.emptyText}>Cargando productos...</p>
          ) : todosLosProductos.length === 0 ? (
            <p className={styles.emptyText}>No hay productos cargados todavía.</p>
          ) : (
            <>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th style={{ textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosPaginados.map((prod) => (
                      <tr key={`${prod.origen}-${prod.fuente || 'db'}-${prod.id}`}>
                        <td>
                          <img
                            src={prod.imagen || 'https://via.placeholder.com/50'}
                            alt={prod.nombre}
                            className={styles.productImg}
                          />
                        </td>
                        <td>
                          <strong>{prod.nombre}</strong>
                        </td>
                        <td>{prod.categoria || '-'}</td>
                        <td>${Number(prod.precio).toLocaleString('es-AR')}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            type="button"
                            className={styles.btnOutline}
                            onClick={() => abrirModalEditar(prod)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className={styles.btnDanger}
                            onClick={() => solicitarEliminacion(prod)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Paginacion
                paginaActual={paginaSegura}
                totalPaginas={totalPaginas}
                alCambiarPagina={(nuevaPagina) => setPaginaActual(nuevaPagina)}
              />
            </>
          )}
        </section>
      )}

      {tabActivo === 'cupones' && (
        <section>
          <Cupon />
        </section>
      )}

      {tabActivo === 'registros' && (
        <section>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Usuarios Registrados</h3>
          </div>

          {usuarios.length === 0 ? (
            <p className={styles.emptyText}>No hay usuarios registrados en la plataforma todavía.</p>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Gamertag / Nombre</th>
                    <th>Correo Electrónico</th>
                    <th>Rol</th>
                    <th>Fecha de Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <strong>
                          {user.nombre || user.displayName || 'Gamer Anónimo'} {user.apellido || ''}
                        </strong>
                      </td>
                      <td>{user.email || 'No disponible'}</td>
                      <td>
                        <span className={user.rol === 'admin' ? styles.badgeAdmin : styles.badgeUser}>
                          {user.rol || 'Cliente'}
                        </span>
                      </td>
                      <td>{user.fechaRegistro || 'Reciente'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {tabActivo === 'nuevo-registro' && (
        <section>
          <Registro />
        </section>
      )}

      {modalAbierto && (
        <div className={styles.modalOverlay} onClick={cerrarModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.sectionTitle}>
                {productoAEditar ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h3>
              <button type="button" className={styles.btnClose} onClick={cerrarModal}>
                ✕
              </button>
            </div>

            <FormProductoContainer
              productoAEditar={productoAEditar}
              setProductoAEditar={setProductoAEditar}
              onProductoAgregado={handleProductoGuardado}
            />
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(productoAEliminar)}
        title="¿Eliminar producto?"
        message={
          productoAEliminar?.origen === 'firestore'
            ? 'Esta acción borrará el producto de forma permanente de tu inventario en Firestore.'
            : 'Este producto proviene de un archivo JSON local y se quitará de la lista actual.'
        }
        onConfirm={confirmarEliminacion}
        onCancel={() => setProductoAEliminar(null)}
        loading={eliminando}
      />
    </div>
  );
};

export default Panel;