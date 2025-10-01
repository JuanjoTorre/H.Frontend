/*****************************************************LAYOUT DE  FLECHA
 * ********************************************************************* */

import { NavLink } from "react-router-dom";

export const MenuFlecha = () => {
    return (
        <div className="header__menu">
            <div className="menu__box">
                <div className="menu__icon">
                    <NavLink to="/portada">
                        <i className="fa-solid fa-circle-chevron-left"></i>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
