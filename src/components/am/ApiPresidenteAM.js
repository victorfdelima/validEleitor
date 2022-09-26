import React, { useEffect, useState } from "react";
import "../../App.css";
import APISenadorAM from "./ApiSenadorAM";
import CandiPresidenteAmazonas from "./CandiPresidenteAmazonas";
import Pagination from "../Pagination";
import APIGovernadorAM from "./APIGovernadorAM";
import APIDeputadoFAM from "./APIDeputadoFAM";
import APIDeputadoEAM from "./APIDeputadoEAM";

const APIPresidenteAmazonas = () => {

    const BASEURLPRESIDENTE = "544/dados-simplificados/am/am-c0001-e000544-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)


    useEffect(() => {
        getUserPresidenteAMAZONAS();
    }, []);
    const getUserPresidenteAMAZONAS = async () => {
        const api_response = await fetch(
            `${BASEURLPRESIDENTE}`,
            {
                method: "GET",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                    "Access-Control-Allow-Origin": "https://resultados.tse.jus.br/",
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
            <CandiPresidenteAmazonas cand={currentCands} loading={loading} />
            <Pagination candPerPage={candPerPage} totalCands={cand.length} paginate={paginate} />
            <div>
                <div>
                    <span className="titleAC">Governadores</span>
                    <APIGovernadorAM cand={currentCands} loading={loading} />
                </div>
                <div>
                    <span className="titleAC">Senadores</span>
                    <APISenadorAM cand={currentCands} loading={loading} />
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1">
                        <span className="titleAC">Deputados Federais</span>
                        <APIDeputadoFAM />
                    </div>
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1 ml-2">
                        <span className="titleAC">Deputados Estaduais</span>
                        <APIDeputadoEAM />
                    </div>
                </div>
            </div>
            <div className="footer-dados">

            </div>
        </div>
    );
}
export default APIPresidenteAmazonas