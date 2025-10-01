/*******************************************LAYOUT DE HEADER DE FLECHA
 * ********************************************************************* */

import { MenuFlecha } from "./MenuFlecha";
import avatar from "../../../assets/img/logotipo.svg";
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <>
            <header className="layout__header">
                <div className="header__logo">
                    <NavLink to="/index" className="logo__box">
                        <img src={avatar} className="logo__img" alt="Honyaldi S.L.L."></img>
                    </NavLink>
                </div>
                <MenuFlecha />
            </header>
        </>
    );
};
