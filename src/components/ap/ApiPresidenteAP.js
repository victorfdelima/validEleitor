import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import APISenadorAP from "./ApiSenadorAP";
import CandiPresidenteAmapa from "./CandiPresidenteAmapa";
import Pagination from "../Pagination";
import APIGovernadorAP from "./APIGovernadorAP";
import APIDeputadoFAP from "./APIDeputadoFAP";
import APIDeputadoEAP from "./APIDeputadoEAP";

const APIPresidenteAmapa = () => {

    const BASEURL = "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/ap/ap-c0001-e000544-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)

    useEffect(() => {
        axios.get(BASEURL)
        .then(response => {
          setCand(response.data.cand)
          setLoading(false)
          console.log(response.data.cand)
         }     )
      },[])

    // Current dados

    const indexOfLastCand = currentPage * candPerPage;
    const indexOfFirstCand = indexOfLastCand - candPerPage;
    const currentCands = cand.slice(indexOfFirstCand, indexOfLastCand)

    //Current Page

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <span className="titleAC">Presidentes</span>
            <CandiPresidenteAmapa cand={currentCands} loading={loading} />
            <Pagination candPerPage={candPerPage} totalCands={cand.length} paginate={paginate} />
            <div>
                <div>
                    <span className="titleAC">Governadores</span>
                    <APIGovernadorAP cand={currentCands} loading={loading} />
                </div>
                <div>
                    <span className="titleAC">Senadores</span>
                    <APISenadorAP cand={currentCands} loading={loading} />
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1">
                        <span className="titleAC">Deputados Federais</span>
                        <APIDeputadoFAP />
                    </div>
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1 ml-2">
                        <span className="titleAC">Deputados Estaduais</span>
                        <APIDeputadoEAP />
                    </div>
                </div>
            </div>
            <div className="footer-dados">

            </div>
        </div>
    );
}
export default APIPresidenteAmapa