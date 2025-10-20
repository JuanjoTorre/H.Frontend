/* eslint-disable no-unused-vars */
/****************************************************CRUD DE GENERICOS
 * ********************************************************************* */
//import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { Authentication } from "../../helpers/Authentication";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

export const CrudGenericos = () => {
    //Creo un estado para gestionar el listado de genericos que vamos a mostrar por pantalla
    const [gen, setGen] = useState([]);

        //Utililo el hook useNavigate para ir al form de edicion de concreto pasandole el nombre y el id
        const navigate = useNavigate();


    //CUANDO SE CARGUE EL COMPONENTE SE EJECUTARA LO SIGUIENTE
    useEffect(() => {
        iniciar();
    }, []);

        //AL CARGAR LA PAGINA LLENO EL CRUD CON EL LISTADO DE GENERICOS
    const iniciar = async () => {
        Authentication();

        try {
            //Obtenemos todos los genericos
            const request = await fetch(Global.url + "generico/ListarGenerico", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
   
            //Recojo la informacion que devuelve la consulta y la convierto a formato json
            const data = await request.json();

            //Cuando todo esta correcto
            if (data.status == "success") {
                setGen(data.listGN);

            } else {
                console.log("error");
            }
        } catch (error) {
            console.log("error general");
        }
    };

        //METODO PARA BORRAR UN GENERICO
        const borrarGenerico = async (e, id) => {
            try {
                const request = await fetch(Global.url + `generico/borrarGenerico/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                //Recojo la informacion que devuelve la consulta y la convierto a formato JSON
                const data = await request.json();
    
                //Si todo este correcto
                if (data.status == "success") {
                    //Redirecciono hacia el crud
                    location.href = "/crudGenerico";
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.log("error general");
            }
        };
    
        //METODO PARA EDITAR UN CONCRETO
        const editarGenerico = async (e, id, nombre) => {
            //Llamamos al formulario de edicion de generico y le pasamos el nombre y el id del concreto
            navigate(`/formEditGenerico/${id}/${nombre}`, {
                state: {
                    nombre,
                    id,
                },
            });
        };
    return (
        <main className="layout__crud">
            <div className="crud__principal">
                <div className="crud__nuevo  crud__nuevo-resto">
                    <NavLink to="/formGenerico">
                        <p className="crud__NuevoTexto crud__NuevoTexto-resto">Nuevo Genérico</p>
                    </NavLink>
                </div>
                <div className="crud__box crud__box-resto">
                    <div className="crud__titulo">
                        <p className="titulo__texto titulo__texto-nombreR">Nombre</p>
                        <p className="titulo__texto titulo__texto-accionR">Acción</p>
                    </div>
                    {gen.map((item) => {
                        return (
                            <div className="crud__linea" key={item._id}>
                                <div className="linea__texto linea__texto-nombreR ">
                                    <p className="linea__texto">{item.name}</p>
                                </div>
                                <div className="linea__texto linea__texto-accionR ">
                                <i
                                        className="fa-solid fa-trash-can linea__texto-acciones-trash"
                                        onClick={(event) => borrarGenerico(event, item._id)}
                                    ></i>

                                    <i
                                        className="fa-solid fa-pen-to-square linea__texto-acciones-edit"
                                        onClick={(event) => editarGenerico(event, item._id, item.name)}
                                    ></i>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};
