/* eslint-disable no-unused-vars */
/******************************************FORMULARIO DE  NUEVO PROVEEDOR
 * ********************************************************************* */
import { Authentication } from "../../helpers/Authentication";
import { useEffect, useState } from "react";
import { useForm } from "../../helpers/useForm";
import { Global } from "../../helpers/Global";

export const FormProveedor = () => {
    //Recibo el hook useForm
    const { form, changed } = useForm({});

    //Creo un estado para gestionar el guardado de los datos
    const [saved, setSaved] = useState("Not_Saved");

    //CUANDO SE CARGUE EL COMPONENTE SE EJECUTARA LO SIGUIENTE
    useEffect(() => {
        iniciar();
    }, []);

    const iniciar = () => {
        //Compruebo que este identificado
        Authentication();
    };

    //METODO QUE RECOGE LOS DATOS DEL FORMULARIO AL PULSAR EL BOTON "ENVIAR"
    const saveProveedor = async (e) => {
        //Prevenimos la actualizacion de la pantalla
        e.preventDefault();

        //Recogo los datos del formulario
        let newProveedor = {
            name: form.name,
        };
        console.log(newProveedor)

        //Controlo que no venga vacia
        if (newProveedor === "") {
            setSaved("Sin datos");
        } else {
            try {
                //Guardo el proveedor en la bbdd
                const request = await fetch(Global.url + "proveedor/nuevoProveedor", {
                    method: "POST",
                    body: JSON.stringify(newProveedor),
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
                setSaved("error");
            }
            setTimeout(() => {
                //Redirecciono hacia el crudConcreto
                location.href = "/crudProveedor";
            }, 1000);
        }
    };
    return (
        <main className="layout__main">
            <div className="main__titulo">
                <p className="titulo__text">Proveedor</p>
            </div>

            <div className="main__formulario main__formulario-resto">
                <div className="formulario__box formulario__box-resto">
                    <form action="" className="formulario__form" onSubmit={saveProveedor}>
                        <div className="form__linea">
                            <label className="form__label form__label-resto">Nombre</label>
                            <input
                                type="text"
                                className="form__input form__input-resto"
                                name="name"
                                onChange={changed}
                            ></input>
                        </div>

                        <div className="form__linea">
                            <input type="submit" className="form__input form__input-submitResto" value="Enviar"></input>
                        </div>
                    </form>
                </div>
            </div>
            <div className="content__repuesta">
                {saved == "Not_Saved" ? "" : ""}
                {saved == "saved" ? <strong className="alert alert-success">Proveedor guardado con exito </strong> : ""}

                {saved == "error" ? <strong className="alert alert-danger">Oops Ha habido un error....</strong> : ""}
            </div>
        </main>
    );
};
