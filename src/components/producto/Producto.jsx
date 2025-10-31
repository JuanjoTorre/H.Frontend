/**************************************************LAYOUT DE  PRODUCTO
 * ********************************************************************* */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";

import { Global } from "../../helpers/Global";
import { useLocation } from "react-router-dom";

export const Producto = () => {
	//Obtengo el id que llega por url
	const datos = useLocation();
	const id = datos.search.slice(4);

	//Creo un estado para controlar los productos que mostraremos en la portada
	const [prod, setProd] = useState([]);

	//Creamos un useeffect para gestionar la carga de la pagina
	useEffect(() => {
		iniciar();
	}, []);

	const iniciar = async () => {
		try {
			//Obtengo un listado de productos
			const request = await fetch(
				Global.url + `producto/producto/${id}`,
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
				setProd(data.producto);
			}
		} catch (error) {
			console.log("error general");
		}
	};

	const openPDF = () => {
		window.open(`../pdf/${prod.codigo}.pdf`, "_blank");
	};

	

	return (
		<main className="layout__main">
			<div className="main__box">
				<div className="main__principal">
					<div className="principal__box">
						<div className="principal__titulo">
							<p className="titulo__text">
								{prod.name}
							</p>
						</div>

						<div className="principal__producto">
							<div className="producto__box">
								<div className="producto__imagenBox">
									<img
										src={`../images/${prod.codigo}.jpg`}
										alt={prod.image}
										className="producto__imagen"
									></img>
								</div>

								<div className="producto__infoBox">
									<div className="producto__infoCodigo">
										<p className="producto__codigoTitulo">
											Código &nbsp;
											&nbsp; &nbsp;
											&nbsp; &nbsp;
											&nbsp; &nbsp;
											<span className="producto__codigo">
												{
													prod.codigo
												}
											</span>
										</p>
									</div>
									<div className="producto__infoCodigo">
										<p className="producto__codigoTitulo">
											Ficha Técnica
											&nbsp;
											<button
												className="btn btn-outline"
												onClick={
													openPDF
												}
											>
												<i class="fa-regular fa-file-pdf icono"></i>
											</button>
										</p>
										{/* <p className="producto__codigo">{prod.pdf}</p> */}
									</div>
									<div className="producto__infoCaracteristicas">
										<p className="producto__caracteristicasTitulo">
											Características
										</p>
										<p className="producto__caracteristicas">

												{prod.descripcion}

											
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};
