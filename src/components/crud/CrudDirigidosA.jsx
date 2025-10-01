/***************************************************CRUD DE DIRIGIDOS A
 * ********************************************************************* */
/* eslint-disable no-unused-vars */

import { NavLink, useNavigate } from "react-router-dom";
import { Authentication } from "../../helpers/Authentication";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

export const CrudDirigidosA = () => {
    //Creo un estado para gestionar el listado de dirigidos que vamos a mostrar por pantalla
    const [dir, setDir] = useState([]);

    //Utililo el hook useNavigate para ir al form de edicion de concreto pasandole el nombre y el id
    const navigate = useNavigate();

    //CUANDO SE CARGUE EL COMPONENTE SE EJECUTARA LO SIGUIENTE
    useEffect(() => {
        iniciar();
    }, []);

    //AL CARGAR LA PAGINA LLENO EL CRUD CON EL LISTADO DE CONCRETOS
    const iniciar = async () => {
        Authentication();

        try {
            //Obtenemos todos los dirigidos
            const request = await fetch(Global.url + "dirigido/listarDirigido", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            //Recojo la informacion que devuelve la consulta y la convierto a formato JSON
            const data = await request.json();

            //Si todo este correcto
            if (data.status == "success") {
                setDir(data.dgList);
            } else {
                console.log("no");
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //METODO PARA BORRAR UN DIRIGIDO A
    const borrarDirigidoA = async (e, id) => {
        try {
            const request = await fetch(Global.url + `dirigido/borrarDirigido/${id}`, {
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
                location.href = "/crudDirigidoA";
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //METODO PARA EDITAR UN DIRIGIDO A
    const editarDirigidoA = async (e, id, nombre) => {
        //Llamamos al formulario de edicion de concreto y le pasamos el nombre y el id del concreto
        navigate(`/formEditDirigidoA/${id}/${nombre}`, {
            state: {
                nombre,
                id,
            },
        });
    };
    return (
        <main className="layout__crud">
            <div className="crud__principal">
                <div className="crud__nuevo crud__nuevo-resto">
                    <NavLink to="/formDirigidoA">
                        <p className="crud__NuevoTexto crud__NuevoTexto-resto">Nuevo Dirigido A</p>
                    </NavLink>
                </div>
                <div className="crud__box crud__box-resto">
                    <div className="crud__titulo">
                        <p className="titulo__texto titulo__texto-nombreR ">Nombre</p>
                        <p className="titulo__texto titulo__texto-accionR ">Acción</p>
                    </div>
                    {dir.map((item) => {
                        return (
                            <div className="crud__linea" key={item._id}>
                                <div className="linea__texto linea__texto-nombreR ">
                                    <p className="linea__texto">{item.name}</p>
                                </div>
                                <div className="linea__texto linea__texto-accionR ">
                                <i
                                        className="fa-solid fa-trash-can linea__texto-acciones-trash"
                                        onClick={(event) => borrarDirigidoA(event, item._id)}
                                    ></i>

                                    <i
                                        className="fa-solid fa-pen-to-square linea__texto-acciones-edit"
                                        onClick={(event) => editarDirigidoA(event, item._id, item.name)}
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
