/*******************************************HELPER DE AUTENTIFICACION
 * ********************************************************************* */
export const Authentication = ()=> {  

    const auth = localStorage.getItem("Auth");

console.log(auth)

    if(auth !== "success")
    {
        window.location="/";
    }


};
