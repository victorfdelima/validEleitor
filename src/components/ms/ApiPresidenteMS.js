import React, { useEffect, useState } from "react";
import "../../App.css";
import APISenadorMS from "./ApiSenadorMS";
import CandiPresidenteMS from "./CandiPresidenteMS";
import Pagination from "../Pagination";
import APIGovernadorMS from "./APIGovernadorMS";
import APIDeputadoFMS from "./APIDeputadoFMS";
import APIDeputadoEMS from "./APIDeputadoEMS";

const APIPresidenteMS = () => {

    const BASEURLPRESIDENTE = "https://resultados-sim.tse.jus.br/teste/ele2022/9240/dados-simplificados/ms/ms-c0001-e009240-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)


    useEffect(() => {
        getUserPresidenteMS();
    }, []);
    const getUserPresidenteMS = async () => {
        const api_response = await fetch(
            `${BASEURLPRESIDENTE}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "s-maxage=10, stale-while-revalidate",
                    "Access-Control-Allow-Origin": "https://app.resultadoeleicoes2022.com.br/",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "*"
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
            <CandiPresidenteMS cand={currentCands} loading={loading} />
            <Pagination candPerPage={candPerPage} totalCands={cand.length} paginate={paginate} />
            <div>
                <div>
                    <span className="titleAC">Governadores</span>
                    <APIGovernadorMS cand={currentCands} loading={loading} />
                </div>
                <div>
                    <span className="titleAC">Senadores</span>
                    <APISenadorMS cand={currentCands} loading={loading} />
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1">
                        <span className="titleAC">Deputados Federais</span>
                        <APIDeputadoFMS/>
                    </div>
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1 ml-2">
                        <span className="titleAC">Deputados Estaduais</span>
                        <APIDeputadoEMS />
                    </div>
                </div>
            </div>
            <div className="footer-dados">

            </div>
        </div>
    );
}
export default APIPresidenteMS