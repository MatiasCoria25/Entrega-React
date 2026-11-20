import styles from "./FormProducto.module.css";

const FormProducto = ({
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  datosForm,
  cargando,
  esEdicion,
  errores = {}
}) => {
  return (
    <form className={styles.formulario} onSubmit={manejarEnvio} noValidate>
      
      <div className={styles.grupoInput}>
        <label className={styles.label}>Nombre del producto</label>
        <input
          name="nombre"
          type="text"
          placeholder="Ej: Doom Eternal"
          value={datosForm.nombre}
          onChange={manejarCambio}
          className={`${styles.input} ${errores.nombre ? styles.inputError : ""}`}
        />
        {errores.nombre && <span className={styles.mensajeError}>{errores.nombre}</span>}
      </div>

      
      <div className={styles.grupoInput}>
        <label className={styles.label}>Precio (AR$)</label>
        <input
          name="precio"
          type="number"
          placeholder="Ej: 15000"
          value={datosForm.precio}
          onChange={manejarCambio}
          className={`${styles.input} ${errores.precio ? styles.inputError : ""}`}
        />
        {errores.precio && <span className={styles.mensajeError}>{errores.precio}</span>}
      </div>

      
      <div className={styles.grupoInput}>
        <label className={styles.label}>Categoría</label>
        <select
          name="categoria"
          value={datosForm.categoria || ""}
          onChange={manejarCambio}
          className={`${styles.select} ${errores.categoria ? styles.inputError : ""}`}
        >
          <option value="" disabled>Selecciona una categoría</option>
          <option value="rpg">RPG</option>
          <option value="terror">Terror</option>
          <option value="aventura">Aventura</option>
          <option value="shooter">Shooter</option>
          <option value="carreras">Carreras</option>
          <option value="fantasia">Fantasía</option>
          <option value="accion">Acción</option>
          <option value="arcade">Arcade</option>
        </select>
        {errores.categoria && <span className={styles.mensajeError}>{errores.categoria}</span>}
      </div>

      
      <div className={styles.grupoInput}>
        <label className={styles.label}>Descripción</label>
        <textarea
          name="descripcion"
          placeholder="Escribe los detalles del juego..."
          value={datosForm.descripcion}
          onChange={manejarCambio}
          className={`${styles.textarea} ${errores.descripcion ? styles.inputError : ""}`}
        />
        {errores.descripcion && <span className={styles.mensajeError}>{errores.descripcion}</span>}
      </div>

      
      <div className={styles.grupoInput}>
        <label className={styles.label}>
          {esEdicion ? "Cambiar Imagen (Opcional)" : "Imagen del Producto"}
        </label>
        <input
          name="imagen"
          type="file"
          accept="image/*"
          onChange={manejarCambioImagen}
          className={`${styles.input} ${errores.imagen ? styles.inputError : ""}`}
        />
        {errores.imagen && <span className={styles.mensajeError}>{errores.imagen}</span>}
        
        
        {esEdicion && datosForm.imagen && (
          <div>
            <span style={{ fontSize: "0.75rem", color: "#666" }}>Imagen actual:</span>
            <br />
            <img src={datosForm.imagen} alt="Vista previa" className={styles.previewImagen} />
          </div>
        )}
      </div>

      
      <button type="submit" className={styles.botonSubmit} disabled={cargando}>
        {cargando
          ? "Procesando..."
          : esEdicion
          ? "Guardar Cambios"
          : "Crear Producto"}
      </button>
    </form>
  );
};

export default FormProducto;