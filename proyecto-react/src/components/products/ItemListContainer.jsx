import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import ItemList from "./ItemList";
import { useSearch } from "../../context/SearchContext";

const productosLocales = 
  [
  {
    "id": 1,
    "nombre": "Marvels Spider-Man 2 Deluxe Edition",
    "precio": 11000,
    "imagen": "https://i.ibb.co/zWMkZWn6/Spider-Man.avif",
    "descripcion": "Vive una nueva aventura de Spider-Man con Peter Parker y Miles Morales.",
    "categoria": "Acción/Aventura"
  },
  {
    "id": 2,
    "nombre": "Red Dead Redemption 2 Ultimate Edition",
    "precio": 7999,
    "imagen": "https://i.ibb.co/dTJnz1Q/Red-Dead-Redemption.avif",
    "descripcion": "Explora el salvaje oeste en una de las aventuras más premiadas.",
    "categoria": "Acción/Aventura"
  },
  {
    "id": 3,
    "nombre": "Dragon Ball: Sparking! Zero",
    "precio": 10500,
    "imagen": "https://i.ibb.co/QjMm7T0q/Dragon-Ball.avif",
    "descripcion": "Experimenta combates épicos con los personajes de Dragon Ball.",
    "categoria": "Lucha"
  },
  {
    "id": 4,
    "nombre": "NBA 2K27 Ultra Edition PC Steam",
    "precio": 15699,
    "imagen": "https://i.ibb.co/b5M5w1XQ/Nba-2K27.avif",
    "descripcion": "La experiencia definitiva de baloncesto con gráficos mejorados.",
    "categoria": "Deportes"
  },
  {
    "id": 5,
    "nombre": "Captain Tsubasa 2: WORLD FIGHTERS",
    "precio": 10899,
    "imagen": "https://i.ibb.co/hRS1J2kM/Captain-Tsubasa.avif",
    "descripcion": "Disfruta partidos espectaculares inspirados en el anime clásico.",
    "categoria": "Deportes"
  },
  {
    "id": 6,
    "nombre": "EA Sports FC 26 Standard Edition",
    "precio": 12600,
    "imagen": "https://i.ibb.co/8LxyTx4X/Fc26.avif",
    "descripcion": "La nueva generación del simulador de fútbol más popular.",
    "categoria": "Deportes"
  },
  {
    "id": 7,
    "nombre": "Minecraft Java & Bedrock Edition",
    "precio": 23750,
    "imagen": "https://i.ibb.co/wrPbHTmS/Minecraft.avif",
    "descripcion": "Construye, explora y sobrevive en mundos infinitos.",
    "categoria": "Mundo abierto"
  },
  {
    "id": 8,
    "nombre": "F1 25: 2026 Season Edition Pack",
    "precio": 13500,
    "imagen": "https://i.ibb.co/hRhSrnWW/f1-25.avif",
    "descripcion": "Compite en la temporada más reciente del campeonato mundial de Fórmula 1.",
    "categoria": "Deportes"
  },
  {
    "id": 9,
    "nombre": "MARVEL Tokon: Fighting Souls",
    "precio": 12999,
    "imagen": "https://i.ibb.co/JRJT5NvM/Marvel-Tokon.avif",
    "descripcion": "Combates intensos con los héroes y villanos más famosos de Marvel.",
    "categoria": "Lucha"
  },
  {
    "id": 10,
    "nombre": "SILENT HILL: Deluxe Edition",
    "precio": 9999,
    "imagen": "https://i.ibb.co/cStN421d/Silent-Hill.avif",
    "descripcion": "Sumérgete en una experiencia de terror psicológico inolvidable.",
    "categoria": "Terror"
  },
  {
    "id": 11,
    "nombre": "Mafia: The Old Country Definitive Edition",
    "precio": 13399,
    "imagen": "https://i.ibb.co/8nTCt1L8/Mafia.avif",
    "descripcion": "Descubre los orígenes de la mafia en una historia cinematográfica.",
    "categoria": "Acción/Aventura"
  },
  {
    "id": 12,
    "nombre": "The Blood Dawnwalker Eclipse Edition",
    "precio": 10999,
    "imagen": "https://i.ibb.co/ksqVKNgg/The-Blood.avif",
    "descripcion": "Una aventura de fantasía oscura cargada de acción y exploración.",
    "categoria": "Mundo abierto"
  }
]

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { busqueda } = useSearch();
  const [searchParams] = useSearchParams();
  const generoParam = searchParams.get("genero");

  useEffect(() => {
    const obtenerProductosCombinados = async () => {
      try {
        setCargando(true);
        setError(null);

        const querySnapshot = await getDocs(collection(db, "productos"));
        const docsFirebase = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const idsFirebase = new Set(docsFirebase.map((p) => p.id));
        const localesFiltrados = productosLocales.filter((p) => !idsFirebase.has(p.id));

        const productosTotales = [...docsFirebase, ...localesFiltrados];
        setProductos(productosTotales);
      } catch (err) {
        console.error("Error al obtener productos de Firestore:", err);
        setError(err.message || "No se pudieron cargar los productos.");
        setProductos(productosLocales);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductosCombinados();
  }, []);

  const normalizar = (texto) =>
    texto
      ? texto
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "-")
      : "";

  const productosFiltrados = useMemo(() => {
    return productos.filter((prod) => {
      const coincideBusqueda = prod.nombre
        ?.toLowerCase()
        .includes(busqueda.toLowerCase());

      if (!generoParam) return coincideBusqueda;

      const catProducto = normalizar(prod.categoria || prod.genero || "");
      const coincideGenero = catProducto.includes(normalizar(generoParam));

      return coincideBusqueda && coincideGenero;
    });
  }, [productos, busqueda, generoParam]);

  if (cargando) {
    return <div>Cargando catálogo...</div>;
  }

  if (error && productos.length === 0) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <h1>
        {generoParam
          ? `Categoría: ${generoParam.replace(/-/g, " ").toUpperCase()}`
          : ""}  
      </h1>

      {productosFiltrados.length === 0 ? (
        <div>
          {busqueda || generoParam
            ? "No se encontraron juegos con los filtros seleccionados."
            : "No hay productos disponibles."}
        </div>
      ) : (
        <ItemList productos={productosFiltrados} />
      )}
    </section>
  );
};

export default ItemListContainer;