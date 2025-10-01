/***************************************LAYOUT DE MENUBURGER DE MENU
 * ********************************************************************* */
//import React from 'react'

import { useState } from "react";

export const MenuBurger = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="header__menu">
            <div className="menu__box">
                <div className="menu__icon">
                    <i
                        className={`fa-solid fa-${isOpen ? "bars" : "xmark"} menu__icon--${isOpen ? "bars" : "xmark"}`}
                        onClick={() => setIsOpen(!isOpen)}
                    ></i>
                </div>
            </div>
        </div>
    );
};
