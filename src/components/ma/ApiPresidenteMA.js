import React, { useEffect, useState } from "react";
import "../../App.css";
import APISenadorMA from "./ApiSenadorMA";
import CandiPresidenteMA from "./CandiPresidenteMA";
import Pagination from "../Pagination";
import APIGovernadorMA from "./APIGovernadorMA";
import APIDeputadoFMA from "./APIDeputadoFMA";
import APIDeputadoEMA from "./APIDeputadoEMA";

const APIPresidenteMA = () => {

    const BASEURLPRESIDENTE = "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/ma/ma-c0001-e000544-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)


    useEffect(() => {
        getUserPresidenteMA();
    }, []);
    const getUserPresidenteMA = async () => {
        const api_response = await fetch(
            `${BASEURLPRESIDENTE}`,
            {                
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
            <CandiPresidenteMA cand={currentCands} loading={loading} />
            <Pagination candPerPage={candPerPage} totalCands={cand.length} paginate={paginate} />
            <div>
                <div>
                    <span className="titleAC">Governadores</span>
                    <APIGovernadorMA cand={currentCands} loading={loading} />
                </div>
                <div>
                    <span className="titleAC">Senadores</span>
                    <APISenadorMA cand={currentCands} loading={loading} />
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1">
                        <span className="titleAC">Deputados Federais</span>
                        <APIDeputadoFMA/>
                    </div>
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1 ml-2">
                        <span className="titleAC">Deputados Estaduais</span>
                        <APIDeputadoEMA />
                    </div>
                </div>
            </div>
            <div className="footer-dados">

            </div>
        </div>
    );
}
export default APIPresidenteMA