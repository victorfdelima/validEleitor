import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import APISenadorAM from "./ApiSenadorAM";
import CandiPresidenteAmazonas from "./CandiPresidenteAmazonas";
import Pagination from "../Pagination";
import APIGovernadorAM from "./APIGovernadorAM";
import APIDeputadoFAM from "./APIDeputadoFAM";
import APIDeputadoEAM from "./APIDeputadoEAM";

const APIPresidenteAmazonas = () => {

    const BASEURL = "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/am/am-c0001-e000544-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)

    useEffect( async () => {
       await axios.get(BASEURL)
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