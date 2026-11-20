import { useState } from "react";
import styles from "./Contacto.module.css";

const Contacto = () => {
    const [enviado, setEnviado] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        mail: "",
        telefono: "",
        mensaje: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setEnviado(true);
    };

    return (
        <section className={styles.contactoSection}>
            <div className={styles.container}>
                <div className={styles.formularioWrapper}>
                    <h2>Contacto</h2>
                    <p>¡Dejanos tu mensaje y te responderemos a la brevedad!</p>

                    {enviado ? (
                        <div className={styles.successMessage}>
                            <h3>¡Mensaje enviado con éxito! 🎮</h3>
                            <p>Gracias por contactarte. Te responderemos pronto.</p>
                            <button 
                                onClick={() => { setEnviado(false); setFormData({ nombre: "", mail: "", telefono: "", mensaje: "" }); }}
                                className={styles.resetButton}
                            >
                                Enviar otro mensaje
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <input 
                                    type="text" 
                                    name="nombre"
                                    placeholder="Nombre" 
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input 
                                    type="email" 
                                    name="mail"
                                    placeholder="Mail" 
                                    value={formData.mail}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input 
                                    type="tel" 
                                    name="telefono"
                                    placeholder="Teléfono (opcional)" 
                                    value={formData.telefono}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <textarea 
                                    name="mensaje"
                                    placeholder="Mensaje" 
                                    rows="5"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className={styles.submitButton}>Enviar</button>
                        </form>
                    )}
                </div>

                <div className={styles.imagenWrapper}>
                    <div className={styles.imageCard}>
                        <img
                            src="https://i.ibb.co/YTjXqmZ5/Contacto.jpg"
                            alt="Fondo Contacto"
                            className={styles.imagen}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contacto;