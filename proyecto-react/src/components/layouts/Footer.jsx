import { Link } from "react-router-dom";
import style from "./Footer.module.css";
import { GrYoutube } from "react-icons/gr";
import { GrInstagram } from "react-icons/gr";
import { GrTwitter } from "react-icons/gr";
import { GrFacebookOption } from "react-icons/gr";
import { GrPinterest } from "react-icons/gr";

const Footer = () => {
    return (
        <footer className={style.footerContainer}>
            <div className={style.footerContent}>
                <div className={style.footer}>
                    <h4>Contacto</h4>
                    <p><strong>Dirección:</strong> Av. Siempreviva 742, Ciudad Autónoma de Buenos Aires</p>
                    <p><strong>Teléfono:</strong> +54 11 1234 5678</p>
                    <p><strong>Horario:</strong> 9:00 - 18:00, Lunes a Viernes</p>
                    <div className={style.follow}>
                        <h4>Seguinos</h4>
                        <div className={style.icon}>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <GrFacebookOption />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <GrTwitter />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <GrInstagram />
                            </a>
                            <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                                <GrPinterest />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <GrYoutube />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={style.footer}>
                    <h4>Mi Cuenta</h4>
                    <Link to="/login">Iniciar Sesión</Link>
                    <Link to="/carrito">Ver Carrito</Link>
                    <Link to="/favoritos">Mis Favoritos</Link>
                    <Link to="/contacto">Seguimiento de Pedido</Link>
                    <Link to="/contacto">Ayuda</Link>
                </div>

                <div className={style.footer}>
                    <h4>Descargá la App</h4>
                    <p>Desde App Store o Google Play</p>
                    <div className={style.fila}>
                        <img src="/images/app.jpg" alt="App Store" />
                        <img src="/images/play.jpg" alt="Google Play" />
                    </div>
                    <p>Pasarelas de pago seguras</p>
                    <img src="/images/pay.png" alt="Métodos de Pago" />
                </div>
            </div>

            <div className={style.copyright}>
                <p>© 2026, Matias Gustavo Coria | Talento Tech - Ecommerce</p>
            </div>
        </footer>
    );
};

export default Footer;