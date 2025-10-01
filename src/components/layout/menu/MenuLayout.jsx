/********************************************************LAYOUT DE MENU
 * ********************************************************************* */
//import React from 'react'
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const MenuLayout = () => {
    return (
        <>
            {/**LAYOUT */}
            <Header />

            {/**CONTENIDO PRINCIPAL */}
            <Outlet />

            {/**PIE DE PAGINA */}
            <Footer />
        </>
    );
};
