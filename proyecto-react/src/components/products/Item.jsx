import { Link, useNavigate } from "react-router-dom";
import BotonFavorito from "../BotonFavorito";
import { useCarrito } from "../../context/CarritoContext";
import styles from "./Item.module.css";

const Item = (props) => {
  const id = props.id;
  const nombre = props.nombre || props.title || "Producto sin nombre";
  const precio = props.precio || props.price || 0;
  const imagen = props.imagen || props.image || props.background_image;
  const categoria = props.categoria || props.genre || "General";

  const productoData = { id, nombre, precio, imagen, categoria };
  const { agregarACarrito } = useCarrito();
  const navigate = useNavigate();

  
  const esMerch = String(id).startsWith("merch") || props.tipo === "merch";
  
  
  const rutaDetalle = esMerch ? `/productos/${id}` : `/producto/${id}`;

  const handleComprar = () => {
    console.log("Intentando agregar:", productoData);
    agregarACarrito({ producto: productoData, cantidad: 1 });
    navigate("/carrito");
  };

  return (
    <div className={styles.card}>
      <Link to={rutaDetalle} className={styles.imageLink}>
        <img src={imagen} alt={nombre} className={styles.image} />
      </Link>

      <div className={styles.header}>
        <Link to={rutaDetalle} className={styles.titleLink}>
          <h2 className={styles.title}>{nombre}</h2>
        </Link>
        
        <BotonFavorito producto={productoData} />
      </div>

      <p className={styles.price}>AR${Number(precio).toLocaleString('es-AR')}</p>

      <div className={styles.controls}>
        <button onClick={handleComprar} className={styles.buyButton}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Item;