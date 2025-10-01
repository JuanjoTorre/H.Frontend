/********************************************ENTRADA A LA APLICACION
 * ********************************************************************* */

//Importaciones obligatorias de react
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

//Importar assets(hojas de estilo, imagenes, fuentes)

import "./assets/fonts/fontawesome-free-6.1.2-web/css/all.css";
import "./assets/fonts/poppins/poppins.css";

import "./assets/js/menu.js";

import "./assets/img/Icono.png";

import "./assets/css/reset.css";
import "./assets/css/variables.css";
import "./assets/css/generales.css";
import "./assets/css/header.css";
import "./assets/css/principal.css";
import "./assets/css/buscador.css";
import "./assets/css/crudGral.css";
import "./assets/css/crudProductos.css";
import "./assets/css/crudResto.css";
import "./assets/css/entrada.css";
import "./assets/css/portada.css";
import "./assets/css/producto.css";
import "./assets/css/formularioGral.css";
import "./assets/css/formularioProducto.css";
import "./assets/css/formularioResto.css";
import "./assets/css/footer.css";
import "./assets/css/error.css";
import "./assets/css/mensajes.css"

//Arrancando la app de React
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
