/*************************************************FORMULARIO DE  LOGIN
 * ********************************************************************* */

import  { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm";



export const Entrada = () => {


    //Recibo el hook useForm
    const { form, changed } = useForm({});

    //Creo un estado nuevo
    const [userLoged, setUserLoged] = useState("not_login");

    const login = async (e) => {
        //Prevenir actualizacion de pantalla
        e.preventDefault();
        //Recogemos los datos del formulario
        let user = form;

        //Comprobamos si el usuario existe y su contraseña es correcta
        const request = await fetch(Global.url + "user/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        });
        //Recojo la informacion que devuelve la consulta y la convierto a formato JSON
        const data = await request.json();


        //Si el resultado es correcto redirecciono a '/portada' o en caso contrario a la raiz
        if (data.status == "success") {
            //Persistimos los datos en el navegador
            // localStorage.setItem('id', data.message._id);
            // localStorage.setItem('name', data.message.nombre);
            // localStorage.setItem('password', data.message.password);

            //Cambio el estado de UserLoged
            setUserLoged("login");
            //Seteo los datos en el auth
            //setAuth(data.status);
            //Redirecciono hacia la portada
            setTimeout(() => {
                 window.location = "/portada";
             }, 1000);
        } else {
            //Cambio el estado de UserLoged
            setUserLoged("error_login");
            //Redirecciono hacia la portada
            setTimeout(() => {
                window.location = "/";
            }, 1000);
        }
    };

    return (
        <main className="layout__main">
            <div className="main__box">
                <div className="main__entrada">
                    <div className="entrada__box">
                        <form className="entrada__formulario" onSubmit={login}>
                            <label htmlFor="nombre" className="entrada__label-usuario">
                                Usuario
                            </label>
                            <input
                                type="text"
                                name="nombre"
                                className="entrada__input-usuario"
                                onChange={changed}
                            ></input>

                            <label htmlFor="password" className="entrada__label-password">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="entrada__input-password"
                                onChange={changed}
                            ></input>

                            <input type="submit" value="Entrar" className="entrada__button"></input>
                        </form>
                    </div>
                    <div className="mensaje__box">
                        <div className="mensaje__texto">
                            {userLoged == "login" ? (
                                <strong className="alert alert__succes">Usuario autorizado</strong>
                            ) : (
                                ""
                            )}
                            {userLoged == "error_login" ? (
                                <strong className="alert alert__error">Usuario NO autorizado</strong>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
