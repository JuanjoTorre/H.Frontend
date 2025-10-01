//import React from 'react'
import { Link } from "react-router-dom";
export const Error = () => {
    return (
        <main className="layout__main">
            <div className="main__box">
                <div className="main__principal">
                    <div className="principal__box">
                        <div className="principal__titulo">
                            <p className="titulo__text-error">Error 404</p>
                            <p className="enlace__link">
                                <Link to="/"> Volver al inicio</Link>
                            </p>
                             
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
