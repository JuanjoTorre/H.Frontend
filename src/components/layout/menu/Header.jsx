/********************************************LAYOUT DE HEADER DE MENU
 * ********************************************************************* */

import avatar from "../../../assets/img/logotipo.svg";
import { Aside } from "./Aside";
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
                <Aside />
            </header>
        </>
    );
};
