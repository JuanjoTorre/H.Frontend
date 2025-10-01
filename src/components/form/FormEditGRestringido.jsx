/* eslint-disable no-unused-vars */
/*******************************FORMULARIO DE  EDICION DE GRUPOS RESTRINGIDOS
 * ********************************************************************* */
import { Authentication } from "../../helpers/Authentication";
import { useEffect, useState } from "react";
import { useForm } from "../../helpers/useForm";
import { Global } from "../../helpers/Global";
import { useNavigate, useLocation } from "react-router-dom";

export const FormEditGRestringido = () => {
    //Recibo el hook useForm
    const { form, changed } = useForm({});

    //Creo un estado para gestionar el guardado de los datos
    const [saved, setSaved] = useState("Not_Saved");

    //Creo el hook useLocation
    const location = useLocation();

    //Esta variable servira para volver hacia el crudConcreto
    const navigate = useNavigate();

    //CUANDO SE CARGUE EL COMPONENTE SE EJECUTARA LO SIGUIENTE
    useEffect(() => {
        iniciar();
    }, []);

    const iniciar = () => {
        //Compruebo que este identificado
        Authentication();
    };

    //METODO QUE RECOGE LOS DATOS DEL FORMULARIO AL PULSAR EL BOTON "ENVIAR"
    const editGRestringido = async (e) => {
        //Prevenimos la actualizacion de la pantalla
        e.preventDefault();

        //Recogo los datos del formulario
        let newGRestringido = {
            name: form.nombre,
        };

        //Controlo que no venga vacio
        if (newGRestringido === "") {
            setSaved("Sin datos");
        } else {
            try {
                //Guardo el restringido en la bbdd
                const request = await fetch(Global.url + `restringido/editarRestringido/${location.state.id}`, {
                    method: "PUT",
                    body: JSON.stringify(newGRestringido),
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
        }
        setTimeout(() => {
            navigate("/crudGRestringido");
        }, 1000);
    };
    return (
        <main className="layout__main">
            <div className="main__titulo">
                <p className="titulo__text">Editar Grupo Restringido</p>
            </div>

            <div className="main__formulario main__formulario-resto">
                <div className="formulario__box formulario__box-resto">
                    <form action="" className="formulario__form" onSubmit={editGRestringido}>
                        <div className="form__linea">
                            <label className="form__label form__label-resto">Nombre</label>
                            <input
                                type="text"
                                className="form__input form__input-resto"
                                name="nombre"
                                defaultValue={location.state.nombre}
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
                {saved == "saved" ? (
                    <strong className="alert alert-success">Restringido editado con exito </strong>
                ) : (
                    ""
                )}

                {saved == "error" ? <strong className="alert alert-danger">Oops Ha habido un error....</strong> : ""}
            </div>
        </main>
    );
};
