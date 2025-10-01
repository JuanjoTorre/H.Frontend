/********************************************ROUTING DE LA APLICACION
 * ********************************************************************* */
//import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MenuLayout } from "../components/layout/menu/MenuLayout";
import { Index } from "./../components/producto/Index";
import { IndexProveedor } from "../components/producto/IndexProveedor";
import { IndexRestringido } from "../components/producto/IndexRestringido";
import { IndexGenerico } from "../components/producto/IndexGenerico";
import { IndexConcreto } from "../components/producto/IndexConcreto";
import { IndexDirigido } from "../components/producto/IndexDirigido";

import { Entrada } from "./../components/user/Entrada";
import { Portada } from "./../components/user/Portada";
import { FlechaLayout } from "../components/layout/flecha/FlechaLayout";
import { Error } from "../components/error/Error";

import { Producto } from "./../components/producto/Producto";
import { CrudProductos } from "./../components/crud/CrudProductos";
import { FormProducto } from "../components/form/FormProducto";
import { FormEditProducto } from "../components/form/FormEditProducto";

import { CrudProveedores } from "../components/crud/CrudProveedores";
import { FormProveedor } from "../components/form/FormProveedor";
import { FormEditProveedor } from "../components/form/FormEditProveedor";

import { CrudGRestringidos } from "../components/crud/CrudGRestringidos";
import { FormGRestringido } from "../components/form/FormGRestringido";
import { FormEditGRestringido } from "../components/form/FormEditGRestringido";

import { CrudGenericos } from "../components/crud/CrudGenericos";
import { FormGenerico } from "../components/form/FormGenerico";
import { FormEditGenerico } from "../components/form/FormEditGenerico";

import { CrudConcretos } from "../components/crud/CrudConcretos";
import { FormConcreto } from "../components/form/FormConcreto";
import { FormEditConcreto } from "../components/form/FormEditConcreto";

import { CrudDirigidosA } from "../components/crud/CrudDirigidosA";
import { FormDirigidoA } from "../components/form/FormDirigidoA";
import { FormEditDirigidoA } from "../components/form/FormEditDirigidoA";

import { FormUser} from "../components/form/FormUser"




export const Routing = () => {


    return (
        <BrowserRouter>
            <Routes>
                {/**Grupo de rutas que incluye el menu hamburguesa */}
                <Route path="/" element={<MenuLayout />}>
                    <Route index element={<Index />} />
                    <Route path="index" element={<Index />} />
                    <Route path="index/proveedor/:tipo" element={<IndexProveedor />} />
                    <Route path="index/restringido/:tipo" element={<IndexRestringido />} />
                    <Route path="index/generico/:tipo" element={<IndexGenerico />} />
                    <Route path="index/concreto/:tipo" element={<IndexConcreto />} />
                    <Route path="index/dirigido/:tipo" element={<IndexDirigido />} />
                    <Route path="producto" element={<Producto />} />
                    
                </Route>

                {/**Grupo de rutas que incluye la flecha */}
                <Route path="/" element={<FlechaLayout />}>
                    <Route index element={<Entrada />} />
                    <Route path="entrada" element={<Entrada />} />
                    <Route path="portada" element={<Portada />} />                    
                    
                    <Route path="crudProducto" element={<CrudProductos />} />
                    <Route path="formProducto" element={<FormProducto />} />
                   <Route path="formEditProducto/:id/:producto" element={<FormEditProducto/>} />
                   
                    <Route path="crudProveedor" element={<CrudProveedores />} />
                    <Route path="formProveedor" element={<FormProveedor />} />
                    <Route path="formEditProveedor/:id/:nombre" element={<FormEditProveedor/>} />

                    <Route path="crudGRestringido" element={<CrudGRestringidos />} />
                    <Route path="formGRestringido" element={<FormGRestringido />} />
                    <Route path="formEditGRestringido/:id/:nombre" element={<FormEditGRestringido/>} />

                    <Route path="crudGenerico" element={<CrudGenericos />} />
                    <Route path="formGenerico" element={<FormGenerico />} />
                    <Route path="formEditGenerico/:id/:nombre" element={<FormEditGenerico/>} />

                    <Route path="crudConcreto" element={<CrudConcretos />} />
                    <Route path="formConcreto" element={<FormConcreto />} />
                    <Route path="formEditConcreto/:id/:nombre" element={<FormEditConcreto/>} />

                    <Route path="crudDirigidoA" element={<CrudDirigidosA />} />
                    <Route path="formDirigidoA" element={<FormDirigidoA />} />
                    <Route path="formEditDirigidoA/:id/:nombre" element={<FormEditDirigidoA/>} />

                    <Route path="formUser" element={<FormUser />} />
                    
                    
                    
                    
                    
                    
                </Route>

                {/**Ruta de error */}
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};
