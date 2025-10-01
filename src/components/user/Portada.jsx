/*****************************************************PORTADA DE  CRUDS
 * ********************************************************************* */

import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import {Authentication}  from "../../helpers/Authentication"





export const Portada = () => {
    
        //Cuando se cargue el componente se ejecutara lo siguiente
        useEffect(() => {
            iniciar();
        }, []);   

        const  iniciar =  () => {
            Authentication();
        };



    return (
        <>
            <main className="layout__main">
                <div className="main__box">
                    <div className="main__portada">
                        <div className="portada__box">
                            <div className="portada__enlace">
                                <NavLink to="/crudProducto" className="portada__enlace-enlace">
                                    <p className="portada__enlace--texto">Productos</p>
                                </NavLink>
                            </div>
                            <div className="portada__enlace">
                                <NavLink to="/crudProveedor" className="portada__enlace-enlace">
                                    <p className="portada__enlace--texto">Proveedores</p>
                                </NavLink>
                            </div>
                            <div className="portada__enlace">
                                <NavLink to="/crudGRestringido" className="portada__enlace-enlace">
                                    <p className="portada__enlace--texto">Restringidos</p>
                                </NavLink>
                            </div>
                            <div className="portada__enlace">
                                <NavLink to="/crudGenerico" className="portada__enlace-enlace">
                                    <p className="portada__enlace--texto">Genéricos</p>
                                </NavLink>
                            </div>
                            <div className="portada__enlace">
                                <NavLink to="/crudConcreto" className="portada__enlace-enlace">
                                    <p className="portada__enlace--texto">Concretos</p>
                                </NavLink>
                            </div>
                            <div className="portada__enlace">
                                <NavLink to="/crudDirigidoA" className="portada__enlace-enlace">
                                    <p className="portada__enlace--texto">Dirigidos A</p>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
