import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css"
const BoxDate = () => {

    const [boxHora, setBoxHora] = useState([]);

    useEffect( () => {
       axios.get('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
        .then(response => {
          setBoxHora(response.data)
          console.log(response.data)
         }     )
      },[])
    return (
        <div className="container-date-grande">
            <div className="container-data">
                <div className="container-texto">
                    <div className="xs:text-lg font-bold tam-fonte">
                        {boxHora.pst}% das seções totalizadas
                        <br />
                        <span className="text-roxo text-xs font-bold">(Horario Local)</span>
                        <br />
                        <span className="text-roxo text-xs font-bold">Última atualização {boxHora.dg}  {boxHora.hg}</span>
                        <button onClick={() => window.location.reload(false)} className="button-refresh">Atualizar</button>
                    </div>
                    <div className="mt-2 md:mt-3 bg-gray-400 rounded-2xs overflow-hidden">
                        <div className="barra-preenchida rounded-2xs"></div>

                    </div>
                    <div className="hora-barra">

                    </div>

                </div>

            </div >

        </div>
    )

}
export default BoxDate