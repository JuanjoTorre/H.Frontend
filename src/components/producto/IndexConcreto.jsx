/*****************LAYOUT DE IMAGENES DE PRODUCTOS DE UN CONCRETO
 * ********************************************************************* */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

//import React from 'react'
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

export const IndexConcreto = () => {
    //Creo un estado para controlar los productos que mostraremos en la portada
    const [prods, setProds] = useState([]);

    //Extraigo de la url el tipo de producto
    const location = useLocation();
    const url = location.pathname;
    const cadena = url.split("/");    
    const tipo = cadena[3]
    

    //Cuando se cargue el componente se ejecutara lo siguiente
    useEffect(() => {
        iniciar();
    }, []);
    const iniciar = async () => {
        //Limpio el local Storage
        localStorage.clear();

        try {
            //Obtengo un listado de productos del generico
            const request = await fetch(Global.url + `producto/listarProductosConcreto/${tipo}`, {
                method: "GET",
                headers: {
                    ContentType: "application/json",
                },
            });
            //Convierto los datos que recibo a formato json
            const data = await request.json();


            //Si todo es correcto
            if (data.status == "success") {
                setProds(data.productos);
            }
        } catch (error) {
            console.log("error general");
        }

    };
    return (
        <main className="layout__main">
            <div className="main__box">
                <div className="main__principal">
                    <div className="principal__box">
                        <div className="principal__titulo">
                            <p className="titulo__text"><strong className="titulo">{tipo.replaceAll("%20", " ")}</strong></p>
                        </div>
                        <div className="principal__imagenes">
                            {prods.map((producto) => {
                                return (
                                    <div className="imagenes__box" key={producto._id}>
                                        <NavLink to={`/producto/?id=${producto._id}`} className="imagenes__enlace">
                                            <img
                                                src={`/images/${producto.codigo}.jpg`}
                                                
                                                alt=""
                                                className="imagenes__imagen"
                                            ></img>
                                        </NavLink>
                                        <div className="imagenes__boxTexto">
                                            <p className="imagenes__texto">{producto.name}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
