/************************************LAYOUT DE IMAGENES DE PRODUCTOS
 * ********************************************************************* */
/* eslint-disable no-unused-vars */

//import React from 'react'
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

export const Index = () => {
	//Creo un estado para controlar los productos que mostraremos en la portada
	const [prods, setProds] = useState([]);

	//Cuando se cargue el componente se ejecutara lo siguiente
	useEffect(() => {
		iniciar();
	}, []);
	const iniciar = async () => {
		//Limpio el local Storage
		localStorage.setItem('Auth', false);

		try {
			//Obtengo un listado de productos
			const request = await fetch(
				Global.url + "producto/listarProductos",
				{
					method: "GET",
					headers: {
						ContentType: "application/json",
					},
				}
			);
			//Convierto los datos que recibo a formato json
			const data = await request.json();

			//Si todo es correcto
			if (data.status == "success") {
				setProds(data.productos);

			}
		} catch (error) {
			console.log("error general");
		}
	
	//Funcion que carga una imagen alternativa
	const imgAlt = () => {

	}	
	};
	return (
		<main className="layout__main">
			<div className="main__box">
				<div className="main__principal">
					<div className="principal__box">
						<div className="principal__titulo">
							<p className="titulo__text">
								Todos los Productos
							</p>
						</div>
						<div className="principal__imagenes">
							{prods.map((producto) => {
								if (producto.activo) {
									return (
										<div
											className="imagenes__box"
											key={
												producto._id
											}
										>
											<NavLink
												to={`/producto/?id=${producto._id}`}
												className="imagenes__enlace"
											>
												<img
													src={`images/${producto.codigo}.jpg`}

													alt={""}
	
													className="imagenes__imagen"
												></img>
											</NavLink>
											<div className="imagenes__boxTexto">
												<p className="imagenes__texto">
													{
														producto.name
													}
												</p>
											</div>
										</div>
									);
								}
							})}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};
