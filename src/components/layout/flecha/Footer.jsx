/******************************************LAYOUT DE  FOOTER DE FLECHA
 * ********************************************************************* */
import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="layout__footer">
            <div className="footer__box">
                <div className="footer__box">
                    <p className="footer__texto">
                        Desarrollado por J.J.T  &copy; para honyaldi@honyaldi.com <i class="fa-solid fa-phone"></i> 943333874
                        <span className="footer__texto--transparente">--</span>
                        <NavLink to="entrada" className="footer__enlace">
                            <i className=" footer__icon fa-solid fa-gear"></i>
                        </NavLink>
                    </p>
                </div>
            </div>
        </footer>
    );
};
