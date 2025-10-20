/* eslint-disable no-unused-vars */
/****************************************************CRUD DE PRODUCTOS
 * ********************************************************************* */
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Authentication } from "../../helpers/Authentication";
import { Global } from "../../helpers/Global";




export const CrudProductos = () => {
    //Creo un estado para gestionar el listado de productos que vamos a mostrar por pantalla
    const [prods, setProds] = useState([]);
    //Utililo el hook useNavigate para ir al form de edicion de concreto pasandole el nombre y el id
    const navigate = useNavigate();

    //Cuando se cargue el componente se ejecutara lo siguiente
    useEffect(() => {
        iniciar();
    }, []);

    const iniciar = async () => {
        //Control de usuario
        Authentication();

        try {
            //Obtenemos todos los productos
            const request = await fetch(Global.url + "producto/listarProductos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //Recojo la informacion que devuelve la consulta y la convierto a formato JSON
            const data = await request.json();
            //Cuando todo este correcto
            if (data.status == "success") {
                setProds(data.productos);
            } else {
                console.log("no");
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //METODO PARA BORRAR UN PRODUCTO
    const borrarProducto = async (e, id) => {
        try {
            const request = await fetch(Global.url + `producto/borrarProducto/${id}`, {
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
                location.href = "/crudProducto";
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log("error general");
        }
    };

    //METODO PARA EDITAR UN PRODUCTO
    const editarProducto = async (e, producto) => {
        //Llamamos al formulario de edicion de producto y le pasamos los datos del producto
        navigate(`/formEditProducto/${producto._id}/${producto}`, {
            state: {
                producto,
            },
        });
    };

    return (
        <main className="layout__crud">
            <div className="crud__principal">
                <div className="crud__nuevo crud__nuevo-producto">
                    <NavLink to="/formProducto">
                        <p className="crud__NuevoTexto crud__NuevoTexto-producto">Nuevo Producto</p>
                    </NavLink>
                </div>
                <div className="crud__box crud__box-producto">
                    <div className="crud__titulo">
                        <p className="titulo__texto titulo__texto-fotoP ancho3">Imagen</p>
                        <p className="titulo__texto titulo__texto-codigoP ancho3">Código</p>
                        <p className="titulo__texto titulo__texto-nombreP ancho2">Nombre</p>
                        {/* <p className="titulo__texto titulo__texto-descripcionP ancho1">Descripción</p> */}
                        <p className="titulo__texto titulo__texto-proveedorP ancho2">Proveedor</p>
                        <p className="titulo__texto titulo__texto-tipoP ancho2">Genérico</p>
                        <p className="titulo__texto titulo__texto-tipoP ancho2">Concreto</p>
                        {/* <p className="titulo__texto titulo__texto-restringidoP ancho2">Restringido</p> */}
                        {/* <p className="titulo__texto titulo__texto-dirigidoP ancho2">Dirigida a</p> */}
                        <p className="titulo__texto titulo__texto-ofertaP ancho3">Ofertas</p>
                        <p className="titulo__texto titulo__texto-ofertaP ancho3">Activo</p>
                        <p className="titulo__texto titulo__texto-dirigidoP ancho4">Acción</p>
                    </div>

                    {prods.map((item) => {
                        return (
                            <div className="crud__linea crud__linea-producto" key={item._id}>
                                <div className="linea__texto linea__texto-imgP ancho3">
                                    <img src={`/images/${item.codigo}.jpg`} className="linea__imgP"></img>
                                </div>
                                <div className="linea__texto linea__texto-codigoP ancho3">
                                    <p className="linea__texto">{item.codigo}</p>
                                </div>
                                <div className="linea__texto linea__texto-textoP ancho2">
                                    <p className="linea__texto">{item.name}</p>
                                </div>
                                {/* <div className="linea__texto linea__texto-descripcionP ancho1">
                                    <p className="linea__texto">{item.descripcion}</p>
                                </div> */}
                                <div className="linea__texto linea__texto-proveedorP ancho2">
                                    <p className="linea__texto">{item.proveedor}</p>
                                </div>
                                <div className="linea__texto linea__texto-tipoP ancho2">
                                    <p className="linea__texto">{item.generico}</p>
                                </div>
                                <div className="linea__texto linea__texto-tipoP ancho2">
                                    <p className="linea__texto">{item.concreto}</p>
                                </div>
                                {/* <div className="linea__texto linea__texto-restringidoP ancho2">
                                    <p className="linea__texto">{item.restringido}</p>
                                </div>
                                <div className="linea__texto linea__texto-dirigidoP ancho2">
                                    <p className="linea__texto">{item.dirigido}</p>
                                </div> */}
                                <div className="linea__texto linea__texto-ofertasP ancho3">
                                    <div className="linea__checkbox-box">
                                        <input
                                            type="checkbox"
                                            className="linea__checkbox"
                                            disabled
                                            defaultChecked={item.oferta}
                                        ></input>
                                    </div>
                                </div>
                                <div className="linea__texto linea__texto-activoP ancho3">
                                    <div className="linea__checkbox-box">
                                        <input
                                            type="checkbox"
                                            className="linea__checkbox"
                                            disabled
                                            defaultChecked={item.activo}
                                        ></input>
                                    </div>
                                </div>

                                <div className="linea__texto linea__texto-accionesP ancho4">
                                    <i
                                        className="fa-solid fa-trash-can linea__texto-acciones-trash"
                                        onClick={(event) => borrarProducto(event, item._id)}
                                    ></i>
                                    <i
                                        className="fa-solid fa-pen-to-square linea__texto-acciones-edit"
                                        onClick={(event) => editarProducto(event, item)}
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
