/* eslint-disable no-unused-vars */
/**************************************FORMULARIO DE  NUEVO USUARIO
 * ********************************************************************* */
//import { Authentication } from "../../helpers/Authentication";
import {  useState } from "react";
import { useForm } from "../../helpers/useForm";
import { Global } from "../../helpers/Global";

export const FormUser = () => {
    //Recibo el hook useForm
    const { form, changed } = useForm({});

    //Creo un estado para gestionar el guardado de los datos
    const [saved, setSaved] = useState("Not_Saved");



    //METODO QUE RECOGE LOS DATOS DEL FORMULARIO AL PULSAR EL BOTON "ENVIAR"
    const saveUser = async (e) => {
        //Prevenimos la actualizacion de la pantalla
        e.preventDefault();

        //Recogo los datos del formulario
        let newUser = {
            name: form.nombre,
            password: form.password,

        };
        

        //Controlo que no venga vacia
        if (newUser.name === "" || newUser.password == "") {
            setSaved("Sin datos");
        } else {
            try {
                //Guardo el concreto en la bbdd
                const request = await fetch(Global.url + "user/nuevoUsuario", {
                    method: "POST",
                    body: JSON.stringify(newUser),
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

        }
        //Redirecciono hacia la portada
        setTimeout(() => {
            window.location = "/";
        }, 1000);
    };
    return (
        <main className="layout__main">
            <div className="main__titulo">
                <p className="titulo__text">Usuario</p>
            </div>

            <div className="main__formulario main__formulario-resto">
                <div className="formulario__box formulario__box-resto">
                    <form action="" className="formulario__form" onSubmit={saveUser}>
                        <div className="form__linea form__linea-user">
                            <label className="form__label form__label-resto form__label-userNombre">Nombre</label>
                            <input
                                type="text"
                                className="form__input form__input-resto"
                                name="nombre"
                                onChange={changed}
                            ></input>
                        </div>
                        <div className="form__linea form__linea-user">
                             <label className="form__label form__label-resto form__label-userPassword">Password</label>
                            <input
                                type="password"
                                className="form__input form__input-resto form__input-user"
                                name="password"
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
                {saved == "saved" ? <strong className="alert alert-success">Usuario guardado con exito </strong> : ""}

                {saved == "error" ? <strong className="alert alert-danger">Oops Ha habido un error....</strong> : ""}
            </div>
        </main>
    );
};

