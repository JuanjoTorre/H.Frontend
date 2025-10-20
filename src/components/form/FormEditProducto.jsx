/* eslint-disable no-unused-vars */
/**************************************FORMULARIO DE NUEVO PRODUCTO
 * ********************************************************************* */
import { Authentication } from "../../helpers/Authentication";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { useLocation } from "react-router-dom";

export const FormEditProducto = () => {
    //Creo el hook useLocation
    const location = useLocation();

    //Creo estados para construir el objeto a pasar al metodo de saveProducto
    const [name, setNombre] = useState(location.state.producto.name);
    const [codigo, setCodigo] = useState(location.state.producto.codigo);
    const [proveedor, setProveedor] = useState(location.state.producto.proveedor);
    const [generico, setGenerico] = useState(location.state.producto.generico);
    const [concreto, setConcreto] = useState(location.state.producto.concreto);
    const [integral, setIntegral] = useState(location.state.producto.integral);
    const [sin_azucar, setAzucar] = useState(location.state.producto.azucar);
    const [sin_gluten, setGluten] = useState(location.state.producto.gluten);
    const [activo, setActivo] = useState(location.state.producto.activo);
    const [oferta, setOferta] = useState(location.state.producto.oferta);
    const [hosteleria, setHosteleria] = useState(location.state.producto.hosteleria);
    const [alimentacion, setAlimentacion] = useState(location.state.producto.alimentacion);
    const [vending, setVending] = useState(location.state.producto.vending);
    const [descripcion, setDescripcion] = useState(location.state.producto.descripcion);
    const [imagen, setImagen] = useState(location.state.producto.imagen);
    const [pdf, setPdf] = useState(location.state.producto.pdf);

    //Creo un estado para gestionar el guardado de los datos
    const [saved, setSaved] = useState("Not_Saved");

    //Creo un estado para gestionar el listado de proveedores
    const [prov, setProv] = useState([]);
    //Creo un estado para gestionar el listado de genericos
    const [gen, setGen] = useState([]);
    //Creo un estado para gestionar el listado de concretos
    const [conc, setConc] = useState([]);

    //Creo un estado para gestionar el listado de restringidos
    //const [rest, setRest] = useState([]);
    //Creo un estado para gestionar el listado de dirigidos
    //const [dir, setDir] = useState([]);



    //CUANDO SE CARGUE EL COMPONENTE SE EJECUTARA LO SIGUIENTE

    useEffect(() => {
        iniciar();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const iniciar = () => {
        Authentication();
        proveedores();
        genericos();
        concretos();
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
                setGen(data.listGN);
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

    //METODO QUE RECOGE LOS DATOS DEL FORMULARIO AL PULSAR EL BOTON "ENVIAR"
    const editProducto = async (e) => {
        //Prevenimos la actualizacion de la pantalla
        e.preventDefault();
        setImagen(codigo+`.jpg`);
        setPdf(codigo+`.jpg`);

        //Recogo los datos del formulario
        let newProducto = {
            name,
            codigo,
            proveedor,
            generico,
            concreto,
            integral,
            sin_azucar,
            sin_gluten,
            alimentacion,
            hosteleria,
            vending,
            oferta,
            activo,
            descripcion,
            imagen,
            pdf,
        };

console.log(newProducto)
        //Controlo que no venga vacia
        if (newProducto.name === "") {
            setSaved("Sin datos");


        } else {
            try {
                //Guardo el concreto en la bbdd
                const request = await fetch(Global.url + `producto/editarProducto/${location.state.producto._id}`, {
                    method: "PUT",
                    body: JSON.stringify(newProducto),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                //Recojo la informacion que devuelve la consulta y la convierto a formato JSON
                const data = await request.json();

                //Si todo este correcto
                if (data.status === "success") {
                    setSaved("saved");
                } else {
                    setSaved("error");
                }
            } catch (error) {
                setSaved("error general");
            }
            setTimeout(() => {
                //Redirecciono hacia el crudConcreto
                window.location = "/crudProducto";
            }, 1000);
        }

    };
    return (
        <main className="layout__main">
            <div className="main__titulo">
                <p className="titulo__text">Editar Producto</p>
            </div>

            <div className="main__formulario main__formulario-producto">
                <form action="" className="formulario__form formulario__form-producto" onSubmit={editProducto}>
                    <div className="formulario__box formulario__box-producto">
                        <div className="formulario__boxCajaUno">
                            <div className="formulario__boxIzda">
                                <div className="form__linea form__linea-producto">
                                    <label className="form__label form__label-producto">Nombre</label>
                                    <input
                                        type="text"
                                        className="form__input form__input-producto"
                                        name="nombre"
                                        defaultValue={location.state.producto.name}
                                        onChange={(e) => setNombre(e.target.value)}
                                    ></input>
                                </div>
                                <div className="form__linea form__linea-producto">
                                    <label className="form__label form__label-producto">Código</label>
                                    <input
                                        type="text"
                                        className="form__input form__input-producto"
                                        name="codigo"
                                        defaultValue={location.state.producto.codigo}
                                        onChange={(e) => setCodigo(e.target.value)}
                                    ></input>
                                </div>
                                <div className="form__linea form__linea-producto">
                                    <label className="form__label form__label-producto">Proveedor</label>
                                    <select
                                        name="proveedor"
                                        id="proveedor"
                                        className="formulario__select-producto"
                                        onChange={(e) => setProveedor(e.target.value)}
                                    >
                                        <option value="">{location.state.producto.proveedor}</option>
                                        {prov.map((item) => {
                                            return (
                                                <option className="select__option" key={item._id}>
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form__linea form__linea-producto">
                                    <label className="form__label form__label-producto">Genérico</label>
                                    <select
                                        name="generico"
                                        id="generico"
                                        className="formulario__select-producto"
                                        onChange={(e) => setGenerico(e.target.value)}
                                    >
                                        <option value="">{location.state.producto.generico}</option>
                                        {gen.map((item) => {
                                            return (
                                                <option className="select__option" key={item._id}>
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form__linea form__linea-producto">
                                    <label className="form__label form__label-producto">Concreto</label>
                                    <select
                                        name="concreto"
                                        id="concreto"
                                        className="formulario__select-producto"
                                        onChange={(e) => setConcreto(e.target.value)}
                                    >
                                        <option value="">{location.state.producto.concreto}</option>
                                        {conc.map((item) => {
                                            return (
                                                <option className="select__option" key={item._id}>
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form__linea form__linea-producto">
                                    <label className="form__label form__label-producto">Descripción</label>
                                    <textarea
                                        type="text"
                                        className="form__input form__input-textarea"
                                        name="descripcion"
                                        cols="50"
										rows="10"
										wrap="soft"
                                        defaultValue={location.state.producto.descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    ></textarea>
                                </div>
                                {/* <div className="form__linea form__linea-productot">
                                    <label className="form__label form__label-producto">Imagen</label>
                                    <div className="file-select" id="src-file1">
                                        <input
                                            type="file"
                                            // name="src-file1"
                                            name="imagen"
                                            // aria-label="Archivo"
                                            accept="image/png, .jpeg, .jpg, image/gif"
                                            onChange={(e) => setImagen(e.target.value)}
                                        ></input>
                                    </div>
                                </div> */}
                            </div>
                            <div className="formulario__boxDcha">
                                <div className="boxDcha__uno">
                                    <label className="form__label form__label-producto">Activo</label>
                                    <input
                                        type="checkbox"
                                        className="form__input form__input-checbox"
                                        name="activo"
                                        defaultChecked={location.state.producto.activo}
                                        onChange={(e) => setActivo(e.target.checked)}
                                    ></input>
                                    <label className="form__label form__label-producto">Oferta</label>
                                    <input
                                        type="checkbox"
                                        className="form__input form__input-checbox"
                                        name="oferta"
                                        defaultChecked={location.state.producto.oferta}
                                        onChange={(e) => setOferta(e.target.checked)}
                                    ></input>
                                </div>

                                <div className="boxDcha__dos">
                                    <label className="varios__titulo">Restringidos</label>
                                    <div className="varios__restringidos">
                                        <div className="restringidos__elemento">
                                            <label className="restringidos__elemento-titulo">Integral</label>
                                            <input
                                                type="checkbox"
                                                className="varios__input"
                                                name="integral"
                                                defaultChecked={location.state.producto.integral}
                                                onChange={(e) => setIntegral(e.target.checked)}
                                            ></input>
                                        </div>
                                        <div className="varios__azucar">
                                            <label className="varios__azucar-titulo">Sin Azucar</label>
                                            <input
                                                type="checkbox"
                                                className="varios__input varios__input-checkbox"
                                                name="azucar"
                                                defaultChecked={location.state.producto.azucar}
                                                onChange={(e) => setAzucar(e.target.checked)}
                                            ></input>
                                        </div>
                                        <div className="varios__gluten">
                                            <label className="varios__gluten-titulo">Sin Gluten</label>
                                            <input
                                                type="checkbox"
                                                className="varios__input varios__input-gluten"
                                                name="gluten"
                                                defaultChecked={location.state.producto.gluten}
                                                onChange={(e) => setGluten(e.target.checked)}
                                            ></input>
                                        </div>
                                    </div>
                                </div>

                                <div className="boxDcha__tres">
                                    <label className="varios__titulo">Dirigidos A</label>
                                    <div className="varios__dirigidos">
                                        <div className="varios__alimentacion">
                                            <label className="varios__alimentacion-titulo">Alimentacion</label>
                                            <input
                                                type="checkbox"
                                                className="varios__input varios__input-alimentacion"
                                                name="alimentacion"
                                                defaultChecked={location.state.producto.alimentacion}
                                                onChange={(e) => setAlimentacion(e.target.checked)}
                                            ></input>
                                        </div>
                                        <div className="varios__hosteleria">
                                            <label className="varios__hosteleria-titulo">Hosteleria</label>
                                            <input
                                                type="checkbox"
                                                className="varios__input varios__input-hosteleria"
                                                name="hosteleria"
                                                defaultChecked={location.state.producto.hosteleria}
                                                onChange={(e) => setHosteleria(e.target.checked)}
                                            ></input>
                                        </div>
                                        <div className="varios__vending">
                                            <label className="varios__vending-titulo">Vending</label>
                                            <input
                                                type="checkbox"
                                                className="varios__input varios__input-vending"
                                                name="vending"
                                                defaultChecked={location.state.producto.vending}
                                                onChange={(e) => setVending(e.target.checked)}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="formulario__boxCajaDos">
                            <div className="form__linea form__linea-producto">
                                <input
                                    type="submit"
                                    className="form__input form__input-submitProducto"
                                    value="Enviar"
                                ></input>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="content__repuesta">
                {saved == "Not_Saved" ? "" : ""}
                {saved == "saved" ? <strong className="alert alert-success">Producto guardado con exito </strong> : ""}

                {saved == "error" ? <strong className="alert alert-danger">Oops Ha habido un error....</strong> : ""}
            </div>
        </main>
    );
};
