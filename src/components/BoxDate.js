import React, { useState, useEffect } from "react";
import "../App.css"
const BoxDate = () => {

    const BASEURLPRESIDENTE = "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json"
    const [boxHora, setBoxHora] = useState([]);


    useEffect(() => {
        getUserPresidenteAll();
    }, []);
    const getUserPresidenteAll = async () => {
        const api_response = await fetch(
            `${BASEURLPRESIDENTE}`,
            {                mode: "cors",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "cache-control": "s-maxage=10, stale-while-revalidate",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "*",



                }
            }
        );


        const boxHora = await api_response.json();
        setBoxHora(boxHora);


    };
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