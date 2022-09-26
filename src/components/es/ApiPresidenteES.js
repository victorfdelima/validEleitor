import React, { useEffect, useState } from "react";
import "../../App.css";
import APISenadorES from "./ApiSenadorES";
import CandiPresidenteESanto from "./CandiPresidenteESanto";
import Pagination from "../Pagination";
import APIGovernadorES from "./APIGovernadorES";
import APIDeputadoFES from "./APIDeputadoFES";
import APIDeputadoEES from "./APIDeputadoEES";

const APIPresidenteESanto = () => {

    const BASEURLPRESIDENTE = "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/es/es-c0001-e000544-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)


    useEffect(() => {
        getUserPresidenteESanto();
    }, []);
    const getUserPresidenteESanto = async () => {
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


        const cand = await api_response.json();
        setCand(cand.cand);

        setLoading(false)
    };

    // Current dados

    const indexOfLastCand = currentPage * candPerPage;
    const indexOfFirstCand = indexOfLastCand - candPerPage;
    const currentCands = cand.slice(indexOfFirstCand, indexOfLastCand)

    //Current Page

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <span className="titleAC">Presidentes</span>
            <CandiPresidenteESanto cand={currentCands} loading={loading} />
            <Pagination candPerPage={candPerPage} totalCands={cand.length} paginate={paginate} />
            <div>
                <div>
                    <span className="titleAC">Governadores</span>
                    <APIGovernadorES cand={currentCands} loading={loading} />
                </div>
                <div>
                    <span className="titleAC">Senadores</span>
                    <APISenadorES cand={currentCands} loading={loading} />
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1">
                        <span className="titleAC">Deputados Federais</span>
                        <APIDeputadoFES />
                    </div>
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1 ml-2">
                        <span className="titleAC">Deputados Estaduais</span>
                        <APIDeputadoEES />
                    </div>
                </div>
            </div>
            <div className="footer-dados">

            </div>
        </div>
    );
}
export default APIPresidenteESanto