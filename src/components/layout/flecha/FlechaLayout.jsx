/*****************************************************LAYOUT DE  FLECHA
 * ********************************************************************* */
//import React from 'react'
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const FlechaLayout = () => {
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
