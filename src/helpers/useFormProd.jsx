//HOOK QUE GESTIONA LOS FORMULARIOS DE LA APLICACION

import { useState } from "react";



export const useFormProd = (initialObj =  {}) => {

      //Declaro un estado que va a controlar el formulario y lo inicicializo al initialObj
      const [ form, setForm ] = useState(initialObj);

      const changed = ({target}) => {
            //Extraigo la clave valor del target
            const { nombre, codigo} = target[];

            //Uso esa clave-valor para alimentar el form sin borrar lo que hubiera
            setForm({
                  ...form,
                  [nombre]: value,
                  [codigo]: value

            });

      }

      return {
            form,
            changed
      };
}
