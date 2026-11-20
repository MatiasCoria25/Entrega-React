import styles from './Paginacion.module.css';

const Paginacion = ({
  paginaActual = 1,
  totalPaginas = 1,
  alCambiarPagina,
  maximoVisibles = 5,
  deshabilitado = false,
}) => {
  const totalSeguro = Math.max(1, totalPaginas);
  const visiblesSeguros = Math.max(1, maximoVisibles);
  const paginaSegura = Math.min(Math.max(1, paginaActual), totalSeguro);

  const obtenerNumerosPagina = () => {
    const mitad = Math.floor(visiblesSeguros / 2);
    let inicio = Math.max(1, paginaSegura - mitad);
    let fin = Math.min(totalSeguro, inicio + visiblesSeguros - 1);

    if (fin - inicio + 1 < visiblesSeguros) {
      inicio = Math.max(1, fin - visiblesSeguros + 1);
    }

    const paginas = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  };

  const seleccionarPagina = (numero) => {
    if (deshabilitado || typeof alCambiarPagina !== 'function') return;
    const destino = Math.min(Math.max(1, numero), totalSeguro);
    if (destino !== paginaSegura) {
      alCambiarPagina(destino);
    }
  };

  const paginasVisibles = obtenerNumerosPagina();
  const anteriorDeshabilitado = deshabilitado || paginaSegura <= 1;
  const siguienteDeshabilitado = deshabilitado || paginaSegura >= totalSeguro;

  return (
    <nav className={styles.contenedorPaginacion} aria-label="Paginación">
      <button
        type="button"
        className={`${styles.botonPagina} ${styles.botonFlecha}`}
        onClick={() => seleccionarPagina(paginaSegura - 1)}
        disabled={anteriorDeshabilitado}
        aria-label="Página anterior"
      >
        &lt;
      </button>

      {paginasVisibles.map((numero) => {
        const esActiva = numero === paginaSegura;
        return (
          <button
            key={numero}
            type="button"
            className={`${styles.botonPagina} ${esActiva ? styles.paginaActiva : ''}`}
            onClick={() => seleccionarPagina(numero)}
            disabled={deshabilitado}
            aria-current={esActiva ? 'page' : undefined}
          >
            {numero}
          </button>
        );
      })}

      <button
        type="button"
        className={`${styles.botonPagina} ${styles.botonFlecha}`}
        onClick={() => seleccionarPagina(paginaSegura + 1)}
        disabled={siguienteDeshabilitado}
        aria-label="Página siguiente"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Paginacion;