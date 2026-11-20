import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import styles from './Opiniones.module.css';

const Opiniones = ({ productoId }) => {
  const [opiniones, setOpiniones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [rating, setRating] = useState('5');
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  // Cargar opiniones de Firebase
  useEffect(() => {
    const fetchOpiniones = async () => {
      if (!productoId) return;
      setCargando(true);
      try {
        const opinionesRef = collection(db, "opiniones");
        const q = query(opinionesRef, where("productoId", "==", String(productoId)));
        const querySnapshot = await getDocs(q);

        const listaOpiniones = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setOpiniones(listaOpiniones);
      } catch (err) {
        console.error("Error al obtener opiniones:", err);
        setError("No se pudieron cargar las opiniones");
      } finally {
        setCargando(false);
      }
    };

    fetchOpiniones();
  }, [productoId]);

  // Manejar el envío de la nueva opinión
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !comentario.trim()) return;

    try {
      setEnviando(true);
      setExito(false);

      const nuevaOpinion = {
        productoId: String(productoId),
        clienteNombre: nombre.trim(),
        comentario: comentario.trim(),
        rating: Number(rating),
        fecha: new Date().toLocaleDateString('es-AR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      };

      const docRef = await addDoc(collection(db, 'opiniones'), nuevaOpinion);
      
      const opinionCreada = { id: docRef.id, ...nuevaOpinion };

      // Actualizar el estado local para que aparezca al instante
      setOpiniones((prev) => [opinionCreada, ...prev]);

      // Limpiar formulario
      setNombre('');
      setComentario('');
      setRating('5');
      setExito(true);
    } catch (err) {
      console.error("Error al enviar la opinión:", err);
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) return <div className={styles.cargando}>Cargando opiniones...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.opinionesContainer}>
      <h2>Opiniones de los clientes</h2>

      {/* Formulario integrado */}
      <div className={styles.formContainer}>
        <h3 className={styles.formTitle}>Deja tu opinión</h3>
        
        {exito && <p className={styles.successMessage}>¡Opinión publicada con éxito! ⚡</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Tu Nombre / Gamertag</label>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              placeholder="Ej: GamerPro99" 
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Calificación</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(e.target.value)}
              className={styles.select}
            >
              <option value="5">⭐⭐⭐⭐⭐ (5/5 - Juegazo)</option>
              <option value="4">⭐⭐⭐⭐ (4/5 - Muy bueno)</option>
              <option value="3">⭐⭐⭐ (3/5 - Regular)</option>
              <option value="2">⭐⭐ (2/5 - Malo)</option>
              <option value="1">⭐ (1/5 - No lo recomiendo)</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Tu Comentario</label>
            <textarea 
              value={comentario} 
              onChange={(e) => setComentario(e.target.value)} 
              placeholder="Cuenta qué te pareció el juego..." 
              rows="3"
              required
              className={styles.textarea}
            />
          </div>

          <button type="submit" disabled={enviando} className={styles.submitButton}>
            {enviando ? 'Enviando...' : 'Publicar Opinión'}
          </button>
        </form>
      </div>

      {/* Listado de opiniones */}
      {opiniones.length === 0 ? (
        <p className={styles.emptyOpinions}>Aún no hay opiniones para este producto. ¡Sé el primero en dejar la tuya!</p>
      ) : (
        <ul className={styles.listaOpiniones}>
          {opiniones.map((op) => (
            <li key={op.id} className={styles.opinionCard}>
              <div className={styles.headerOpinion}>
                <strong>{op.clienteNombre || 'Anónimo'}</strong>
                <span>⭐ {op.rating} / 5</span>
              </div>
              <p>{op.comentario}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Opiniones;