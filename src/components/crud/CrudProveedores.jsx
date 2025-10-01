/* eslint-disable no-unused-vars */
/**************************************************CRUD DE PROVEEDORES
 * ********************************************************************* */

import { NavLink, useNavigate } from "react-router-dom";
import { Authentication } from "../../helpers/Authentication";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

export const CrudProveedores = () => {
    //Creo un estado para gestionar el listado de proveedores que vamos a mostrar por pantalla
    const [prov, setProv] = useState([]);

    //Utililo el hook useNavigate para ir al form de edicion de concreto pasandole el nombre y el id
    const navigate = useNavigate();

    //CUANDO SE CARGUE EL COMPONENTE SE EJECUTARA LO SIGUIENTE
    useEffect(() => {
        iniciar();
    }, []);

    //AL CARGAR LA PAGINA LLENO EL CRUD CON EL LISTADO DE PROVEEDORES
    const iniciar = async () => {
        Authentication();

        try {
            //Obtenemos todos los proveedores
            const request = await fetch(Global.url + "proveedor/listarProveedor", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            //Recojo la informacion que devuelve la consulta y la convierto a formato json
            const data = await request.json();

            //Si todo esta correcto
            if (data.status == "success") {
                setProv(data.listProv);
            }
            else{
                setProv("error");
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //METODO PARA BORRAR UN PROVEEDOR
    const borrarProveedor = async (e, id) => {
        try {
            const request = await fetch(Global.url + `proveedor/borrarProveedor/${id}`, {
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
                location.href = "/crudProveedor";
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //METODO PARA EDITAR UN PROVEEDOR
    const editarProveedor = async (e, id, nombre) => {
        //Llamamos al formulario de edicion de concreto y le pasamos el nombre y el id del concreto
        navigate(`/formEditProveedor/${id}/${nombre}`, {
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
                    <NavLink to="/formProveedor">
                        <p className="crud__NuevoTexto crud__NuevoTexto-resto">Nuevo Proveedor</p>
                    </NavLink>
                </div>
                <div className="crud__box crud__box-resto">
                    <div className="crud__titulo">
                        <p className="titulo__texto titulo__texto-nombreR ">Nombre</p>
                        <p className="titulo__texto titulo__texto-accionR ">Acción</p>
                    </div>
                    {prov.map((item) => {
                        return (
                            <div className="crud__linea" key={item._id}>
                                <div className="linea__texto linea__texto-nombreR">
                                    <p className="linea__texto">{item.name}</p>
                                </div>
                                <div className="linea__texto linea__texto-accionR ">
                                <i
                                        className="fa-solid fa-trash-can linea__texto-acciones-trash"
                                        onClick={(event) => borrarProveedor(event, item._id)}
                                    ></i>

                                    <i
                                        className="fa-solid fa-pen-to-square linea__texto-acciones-edit"
                                        onClick={(event) => editarProveedor(event, item._id, item.name)}
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
