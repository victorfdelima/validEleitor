import React, { useEffect, useState } from "react";
import "../../App.css";
import APISenadorMG from "./ApiSenadorMG";
import CandiPresidenteMG from "./CandiPresidenteMG";
import Pagination from "../Pagination";
import APIGovernadorMG from "./APIGovernadorMG";
import APIDeputadoFMG from "./APIDeputadoFMG";
import APIDeputadoEMG from "./APIDeputadoEMG";

const APIPresidenteMG = () => {

    const BASEURLPRESIDENTE = "https://resultados-sim.tse.jus.br/teste/ele2022/9240/dados-simplificados/mg/mg-c0001-e009240-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)


    useEffect(() => {
        getUserPresidenteMG();
    }, []);
    const getUserPresidenteMG = async () => {
        const api_response = await fetch(
            `${BASEURLPRESIDENTE}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "s-maxage=10, stale-while-revalidate",
                    "Access-Control-Allow-Origin": "https://app.resultadoeleicoes2022.com.br/",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
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
            <CandiPresidenteMG cand={currentCands} loading={loading} />
            <Pagination candPerPage={candPerPage} totalCands={cand.length} paginate={paginate} />
            <div>
                <div>
                    <span className="titleAC">Governadores</span>
                    <APIGovernadorMG cand={currentCands} loading={loading} />
                </div>
                <div>
                    <span className="titleAC">Senadores</span>
                    <APISenadorMG cand={currentCands} loading={loading} />
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1">
                        <span className="titleAC">Deputados Federais</span>
                        <APIDeputadoFMG/>
                    </div>
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1 ml-2">
                        <span className="titleAC">Deputados Estaduais</span>
                        <APIDeputadoEMG />
                    </div>
                </div>
            </div>
            <div className="footer-dados">

            </div>
        </div>
    );
}
export default APIPresidenteMG