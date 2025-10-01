/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/********************************************LAYOUT DE  ASIDE DE MENU
 * ********************************************************************* */
//import React from 'react'
import { useEffect, useState } from "react";
import { Global } from "../../../helpers/Global";

export const Aside = () => {
    //Estado que gestiona el menuHamburguesa
    const [isOpen, setIsOpen] = useState(false);

    //Creo un estado para gestionar el listado de proveedores
    const [prov, setProv] = useState([]);
    //Creo un estado para gestionar el listado de genericos
    const [gen, setGen] = useState([]);
    //Creo un estado para gestionar el listado de concretos
    const [conc, setConc] = useState([]);
    //Creo un estado para gestionar el listado de restringidos
    const [rest, setRest] = useState([]);
    //Creo un estado para gestionar el listado de dirigidos
    const [dir, setDir] = useState([]);

    //Cuando se cargue el componente se ejecutara lo siguiente
    useEffect(() => {
        iniciar();
    }, []);

    const iniciar = () => {
        proveedores();
        genericos();
        concretos();
        restringidos();
        dirigidos();
    };

    //Metodo que extraera el listado de proveedores
    const proveedores = async () => {
        try {
            //Obtenemos todos los proveedores
            const request = await fetch(Global.url + "proveedor/listarProveedor", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(request)
            //Recojo la informacion que devuelve la consulta y la convierto a formato json
            const data = await request.json();

            //Si todo esta correcto
            if (data.status == "success") {
                setProv(data.listProv);
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //Metodo que extraera el listado de genericos
    const genericos = async () => {
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
                setGen(data.todosGN);
            } else {
                console.log("no");
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //Metodo que extraera el listado de concretos
    const concretos = async () => {
        try {
            //Obtenemos todos los concretos
            const request = await fetch(Global.url + "concreto/listarConcreto", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            //Recojo la informacion que devuelve la consulta y la convierto a formato JSON
            const data = await request.json();

            //Cuando todo este correcto
            if (data.status == "success") {
                setConc(data.todosCR);
            } else {
                console.log("no");
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //Metodo que extraera el listado de restringidos
    const restringidos = async () => {
        try {
            //Obtenemos todos los restringidos
            const request = await fetch(Global.url + "restringido/listarRestringido", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            //Recojo la informacion que devuelve la consulta y la convierto a formato json
            const data = await request.json();

            //Cuando todo este correcto
            if (data.status == "success") {
                setRest(data.grList);
            } else {
                console.log("no");
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //Metodo que extraera el listado de dirigidos
    const dirigidos = async () => {
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

            //Cuando todo este correcto
            if (data.status == "success") {
                setDir(data.dgList);
            } else {
                console.log("no");
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //Metodo que llamara al index pasandole el criterio de busqueda
    const buscar = async (e) => {
        //Recogemos los parametros para la busqueda
        const grupo = e.name;
        const tipo = e.value;

        //Llamamos a la ruta de busqueda y le paso los parametros
        window.location.href = `/index/${grupo}/${tipo}`;




    };

    return (
        <>
            {/* Menu hamburguesa */}
            <div className="header__menu">
                <div className="menu__box">
                    <div className="menu__icon">
                        <i
                            className={`fa-solid fa-${isOpen ? "xmark" : "bars"} menu__icon--${
                                isOpen ? "xmark" : "bars"
                            }`}
                            onClick={() => setIsOpen(!isOpen)}
                        ></i>
                    </div>
                </div>
            </div>

            {/* Aside */}
            <aside className={`aside__form ${isOpen ? "aside__form--visible" : ""}`}>
                <form action="#" className="form__formulario">
                    <label className="formulario__etiqueta">Proveedor</label>
                    <select
                        name="proveedor"
                        id="proveedor"
                        className="formulario__select"
                        onChange={(e) => buscar(e.target)}
                    >
                        <option value="Proveedor" selected></option>
                        {prov.map((item) => {
                            return (
                                <option className="select__option" key={item._id}>
                                    {item.name}
                                </option>
                            );
                        })}
                    </select>

                    <label className="formulario__etiqueta">Genérico</label>
                    <select
                        name="generico"
                        id="generico"
                        className="formulario__select"
                        onChange={(e) => buscar(e.target)}
                    >
                        <option value=""></option>
                        {gen.map((item) => {
                            return <option key={item._id}>{item.name}</option>;
                        })}
                    </select>

                    <label className="formulario__etiqueta">Concreto</label>
                    <select
                        name="concreto"
                        id="concreto"
                        className="formulario__select"
                        onChange={(e) => buscar(e.target)}
                    >
                        <option value=""></option>
                        {conc.map((item) => {
                            return <option key={item._id}>{item.name}</option>;
                        })}
                    </select>

                    <label className="formulario__etiqueta">Restringido</label>
                    <select
                        name="restringido"
                        id="restringido"
                        className="formulario__select"
                        onChange={(e) => buscar(e.target)}
                    >
                        <option value=""></option>
                        {rest.map((item) => {
                            return <option key={item._id}>{item.name}</option>;
                        })}
                    </select>

                    <label className="formulario__etiqueta">Dirigido A</label>
                    <select
                        name="dirigido"
                        id="dirigido"
                        className="formulario__select"
                        onChange={(e) => buscar(e.target)}
                    >
                        <option value=""></option>
                        {dir.map((item) => {
                            return <option key={item._id}>{item.name}</option>;
                        })}
                    </select>

                    {/* <div className="formulario__contenedorInput">
                        <input type="submit" value="Buscar" className="formulario__input"></input>
                    </div> */}
                </form>
            </aside>
        </>
    );
};
