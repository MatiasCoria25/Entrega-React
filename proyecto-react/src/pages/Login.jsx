import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const manejarLogin = async (evento) => {
    evento.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      setCargando(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error("Error en el login:", err.code);

      
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Correo electrónico o contraseña incorrectos.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Demasiados intentos fallidos. Inténtalo más tarde.");
      } else {
        setError("Ocurrió un error al intentar iniciar sesión.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Iniciar Sesión</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={manejarLogin} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Correo Electrónico</label>
          <input
            type="email"
            placeholder="ejemplo@gamer.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" disabled={cargando} className={styles.submitButton}>
          {cargando ? "Iniciando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default Login;