import { useRef } from 'react';
import styles from './Reseñas.module.css';

const listaReseñas = [
  {
    id: 1,
    juego: "Marvel's Spider-Man 2",
    imagen: "https://i.ibb.co/zWMkZWn6/Spider-Man.avif",
    usuario: "LucasGamer99",
    estrellas: 5,
    tituloReseña: "¡Una obra maestra absoluta!",
    textoReseña: "Llegó al segundo que lo compré y cumple con todo lo que te dice, una ganga."
  },
  {
    id: 2,
    juego: "Red Dead Redemption 2",
    imagen: "https://i.ibb.co/dTJnz1Q/Red-Dead-Redemption.avif",
    usuario: "VaqueroEstelar",
    estrellas: 5,
    tituloReseña: "Inigualable de principio a fin",
    textoReseña: "Nada que decir, muy buen juego, sin errores ni nada por el estilo al iniciarlo."
  },
  {
    id: 3,
    juego: "Dragon Ball: Sparking! Zero",
    imagen: "https://i.ibb.co/QjMm7T0q/Dragon-Ball.avif",
    usuario: "SaiyanMaster",
    estrellas: 4,
    tituloReseña: "Combates hiper dinámicos",
    textoReseña: "Compren tranquilos, super confiables."
  },
  {
    id: 4,
    juego: "NBA 2K27",
    imagen: "https://i.ibb.co/b5M5w1XQ/Nba-2K27.avif",
    usuario: "HoopsKing",
    estrellas: 4,
    tituloReseña: "Muy buen gameplay este año",
    textoReseña: "Todo espectacular y facil de instalar!! Por ahora 0 problemas y muy rápido todo!! Gracias"
  },
  {
    id: 5,
    juego: "Captain Tsubasa 2",
    imagen: "https://i.ibb.co/hRS1J2kM/Captain-Tsubasa.avif",
    usuario: "OliverFan",
    estrellas: 5,
    tituloReseña: "Nostalgia pura en la cancha",
    textoReseña: "Muy confiables, gracias por cada detalle para poder disfrutar el juego! Seguro que seguiré comprando aquí :)"
  },
  {
    id: 6,
    juego: "EA Sports FC 26",
    imagen: "https://i.ibb.co/8LxyTx4X/Fc26.avif",
    usuario: "DT_Decidido",
    estrellas: 3,
    tituloReseña: "Cumple con lo justo",
    textoReseña: "Muy buen servicio, las instrucciones de instalación fueron de gran ayuda. Toda la compra fue excelente. Volvería a confiar en esta página."
  },
  {
    id: 7,
    juego: "Minecraft Java & Bedrock",
    imagen: "https://i.ibb.co/wrPbHTmS/Minecraft.avif",
    usuario: "BuilderPro",
    estrellas: 5,
    tituloReseña: "El rey indiscutible de la creatividad",
    textoReseña: "Buen juego, barato y fácil de ingresar, recomendado."
  },
  {
    id: 8,
    juego: "F1 25",
    imagen: "https://i.ibb.co/hRhSrnWW/f1-25.avif",
    usuario: "ApexPredator",
    estrellas: 4,
    tituloReseña: "Sensación de velocidad increíble",
    textoReseña: "Me pareció un excelente juego y muy buena la atención"
  },
  {
    id: 9,
    juego: "MARVEL Tokon",
    imagen: "https://i.ibb.co/JRJT5NvM/Marvel-Tokon.avif",
    usuario: "ArcadeHero",
    estrellas: 5,
    tituloReseña: "Una locura visual de lucha",
    textoReseña: "Juego increíble con gráficos espectaculares y combates emocionantes."
  },
  {
    id: 10,
    juego: "SILENT HILL",
    imagen: "https://i.ibb.co/cStN421d/Silent-Hill.avif",
    usuario: "TerrorGamer",
    estrellas: 5,
    tituloReseña: "Terror psicológico de otro nivel",
    textoReseña: "Juegaso de verdad,lo jugue de 10"
 }
];

const Reseñas = () => {
  const carouselRef = useRef(null);

  const renderEstrellas = (cantidad) => {
    return "★".repeat(cantidad) + "☆".repeat(5 - cantidad);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.mainTitle}>Reseñas de la Comunidad</h1>
        <div className={styles.carouselButtons}>
          <button className={styles.navButton} onClick={scrollLeft} aria-label="Anterior">
            ◀
          </button>
          <button className={styles.navButton} onClick={scrollRight} aria-label="Siguiente">
            ▶
          </button>
        </div>
      </div>
      
      <div className={styles.carouselContainer} ref={carouselRef}>
        {listaReseñas.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.gameHeader}>
              <img src={item.imagen} alt={item.juego} className={styles.gameThumb} />
              <div className={styles.gameInfo}>
                <span className={styles.gameTitle}>{item.juego}</span>
                <span className={styles.userName}>Por: @{item.usuario}</span>
              </div>
            </div>

            <div className={styles.reviewContent}>
              <div className={styles.ratingAndTitle}>
                <span className={styles.stars}>{renderEstrellas(item.estrellas)}</span>
                <h3 className={styles.reviewTitle}>"{item.tituloReseña}"</h3>
              </div>
              <p className={styles.reviewText}>{item.textoReseña}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reseñas;