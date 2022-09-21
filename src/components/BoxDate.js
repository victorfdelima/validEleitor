import React, { useState, useEffect } from "react";
import "../App.css"
const BoxDate = () => {

    const BASEURLPRESIDENTE = "https://resultados-sim.tse.jus.br/teste/ele2022/9240/dados-simplificados/br/br-c0001-e009240-r.json"
    const [boxHora, setBoxHora] = useState([]);


    useEffect(() => {
        getUserPresidenteAll();
    }, []);
    const getUserPresidenteAll = async () => {
        const api_response = await fetch(
            `${BASEURLPRESIDENTE}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        api_response.setHeader('cache-control', 's-maxage=10, stale-while-revalidate');

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