import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore'; 
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext"; 
import styles from './Registro.module.css';

const Registro = ({ enPanel = false, onUsuarioCreado }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("usuario"); // Opcional: útil si quieres elegir rol desde el panel
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  
  const navigate = useNavigate();
  const { signup } = useAuth(); 
  
  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    setError(null);
    setExito(false);
    setCargando(true);

    try {
      const credencialUsuario = await signup(email, password);
      const user = credencialUsuario.user;

      const nuevoUsuarioData = {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        rol: enPanel ? rol : "usuario", 
        email: email,
        fechaRegistro: new Date().toLocaleDateString('es-AR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      };

      await setDoc(doc(db, "usuarios", user.uid), nuevoUsuarioData);

      if (enPanel) {
        setExito(true);
        setNombre("");
        setApellido("");
        setEmail("");
        setPassword("");
        setRol("usuario");
        if (onUsuarioCreado) onUsuarioCreado({ id: user.uid, ...nuevoUsuarioData });
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        if (enPanel) {
          setError("Este correo electrónico ya está registrado en el sistema.");
        } else {
          const quiereLoguearse = window.confirm(
            "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?"
          );
          if (quiereLoguearse) navigate("/login");
          else navigate("/");
        }
      } else {
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente."
        );
        console.error("Error en el registro:", error.message);
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={enPanel ? styles.authPanelWrapper : styles.authSection}>
      <div className={enPanel ? styles.panelContainer : styles.authContainer}>
        <h2 className={styles.title}>{enPanel ? 'Registrar Usuario' : 'Crear Cuenta'}</h2>
        {!enPanel && <p className={styles.subtitle}>¡Unite a la red de Arcadia y sumá puntos con cada partida!</p>}
        
        {exito && <p className={styles.successMessage}>¡Usuario registrado con éxito en Firestore! ⚡</p>}

        <form onSubmit={manejarSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              placeholder="Ej: Matias"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Apellido</label>
            <input
              type="text"
              value={apellido}
              onChange={(evento) => setApellido(evento.target.value)}
              placeholder="Ej: Coria"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              placeholder="correo@ejemplo.com"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
              required
              placeholder="Mínimo 6 caracteres"
              className={styles.input}
            />
          </div>

          {enPanel && (
            <div className={styles.inputGroup}>
              <label>Rol</label>
              <select
                value={rol}
                onChange={(evento) => setRol(evento.target.value)}
                className={styles.input}
              >
                <option value="usuario">Usuario / Cliente</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          )}

          {error && <p className={styles.errorMessage}>{error}</p>}

          <button type="submit" disabled={cargando} className={styles.submitButton}>
            {cargando ? 'Registrando...' : (enPanel ? 'Crear Cuenta en el Sistema' : 'Registrarse')}
          </button>
        </form>

        {!enPanel && (
          <p className={styles.loginRedirect}>
            ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión acá</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Registro;