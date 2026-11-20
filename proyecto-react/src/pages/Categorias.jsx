import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import ItemList from '../components/products/ItemList';
import styles from './Categorias.module.css';


const productosLocales = [
  {
    id: "local-1",
    nombre: "Marvels Spider-Man 2 Deluxe Edition",
    precio: 11000,
    imagen: "https://i.ibb.co/zWMkZWn6/Spider-Man.avif",
    descripcion: "Vive una nueva aventura de Spider-Man con Peter Parker y Miles Morales.",
    categoria: "Acción/Aventura"
  },
  {
    id: "local-2",
    nombre: "Red Dead Redemption 2 Ultimate Edition",
    precio: 7999,
    imagen: "https://i.ibb.co/dTJnz1Q/Red-Dead-Redemption.avif",
    descripcion: "Explora el salvaje oeste en una de las aventuras más premiadas.",
    categoria: "Acción/Aventura"
  },
  {
    id: "local-3",
    nombre: "Dragon Ball: Sparking! Zero",
    precio: 10500,
    imagen: "https://i.ibb.co/QjMm7T0q/Dragon-Ball.avif",
    descripcion: "Experimenta combates épicos con los personajes de Dragon Ball.",
    categoria: "Lucha"
  },
  {
    id: "local-4",
    nombre: "NBA 2K27 Ultra Edition PC Steam",
    precio: 15699,
    imagen: "https://i.ibb.co/b5M5w1XQ/Nba-2K27.avif",
    descripcion: "La experiencia definitiva de baloncesto con gráficos mejorados.",
    categoria: "Deportes"
  },
  {
    id: "local-5",
    nombre: "Captain Tsubasa 2: WORLD FIGHTERS",
    precio: 10899,
    imagen: "https://i.ibb.co/hRS1J2kM/Captain-Tsubasa.avif",
    descripcion: "Disfruta partidos espectaculares inspirados en el anime clásico.",
    categoria: "Deportes"
  },
  {
    id: "local-6",
    nombre: "EA Sports FC 26 Standard Edition",
    precio: 12600,
    imagen: "https://i.ibb.co/8LxyTx4X/Fc26.avif",
    descripcion: "La nueva generación del simulador de fútbol más popular.",
    categoria: "Deportes"
  },
  {
    id: "local-7",
    nombre: "Minecraft Java & Bedrock Edition",
    precio: 23750,
    imagen: "https://i.ibb.co/wrPbHTmS/Minecraft.avif",
    descripcion: "Construye, explora y sobrevive en mundos infinitos.",
    categoria: "Mundo abierto"
  },
  {
    id: "local-8",
    nombre: "F1 25: 2026 Season Edition Pack",
    precio: 13500,
    imagen: "https://i.ibb.co/hRhSrnWW/f1-25.avif",
    descripcion: "Compite en la temporada más reciente del campeonato mundial de Fórmula 1.",
    categoria: "Deportes"
  },
  {
    id: "local-9",
    nombre: "MARVEL Tokon: Fighting Souls",
    precio: 12999,
    imagen: "https://i.ibb.co/JRJT5NvM/Marvel-Tokon.avif",
    descripcion: "Combates intensos con los héroes y villanos más famosos de Marvel.",
    categoria: "Lucha"
  },
  {
    id: "local-10",
    nombre: "SILENT HILL: Deluxe Edition",
    precio: 9999,
    imagen: "https://i.ibb.co/cStN421d/Silent-Hill.avif",
    descripcion: "Sumérgete en una experiencia de terror psicológico inolvidable.",
    categoria: "Terror"
  },
  {
    id: "local-11",
    nombre: "Mafia: The Old Country Definitive Edition",
    precio: 13399,
    imagen: "https://i.ibb.co/8nTCt1L8/Mafia.avif",
    descripcion: "Descubre los orígenes de la mafia en una historia cinematográfica.",
    categoria: "Acción/Aventura"
  },
  {
    id: "local-12",
    nombre: "The Blood Dawnwalker Eclipse Edition",
    precio: 10999,
    imagen: "https://i.ibb.co/ksqVKNgg/The-Blood.avif",
    descripcion: "Una aventura de fantasía oscura cargada de acción y exploración.",
    categoria: "Mundo abierto"
  }
];

const Categorias = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProductosCombinados = async () => {
      try {
        setCargando(true);
        
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const docsFirebase = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        
        const productosCombinados = [...docsFirebase, ...productosLocales];
        setProductos(productosCombinados);
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
        
        setProductos(productosLocales);
      } finally {
        setCargando(false);
      }
    };

    fetchProductosCombinados();
  }, []);

  
  const productosPorCategoria = useMemo(() => {
    return productos.reduce((acc, producto) => {
      const catRaw = producto.categoria || producto.genero || 'Sin Categoría';
      const cat = catRaw.trim();

      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(producto);
      return acc;
    }, {});
  }, [productos]);

  if (cargando) {
    return (
      <div className={styles.container}>
        <p className={styles.statusMessage}>Cargando catálogo combinado...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Catálogo por Categorías</h1>

      {Object.keys(productosPorCategoria).length === 0 ? (
        <p className={styles.emptyMessage}>No hay productos disponibles en el catálogo.</p>
      ) : (
        Object.entries(productosPorCategoria).map(([categoria, listaProductos]) => (
          <section key={categoria} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{categoria}</h2>
              <span className={styles.countBadge}>
                {listaProductos.length} {listaProductos.length === 1 ? 'juego' : 'juegos'}
              </span>
            </div>
            
            <ItemList productos={listaProductos} />
          </section>
        ))
      )}
    </div>
  );
};

export default Categorias;