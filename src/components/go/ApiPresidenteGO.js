import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import APISenadorGO from "./ApiSenadorGO";
import CandiPresidenteGoias from "./CandiPresidenteGoias";
import Pagination from "../Pagination";
import APIGovernadorGO from "./APIGovernadorGO";
import APIDeputadoFGO from "./APIDeputadoFGO";
import APIDeputadoEGO from "./APIDeputadoEGO";

const APIPresidenteGoias = () => {

    const BASEURL = "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/go/go-c0001-e000544-r.json"
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
            <CandiPresidenteGoias cand={currentCands} loading={loading} />
            <Pagination candPerPage={candPerPage} totalCands={cand.length} paginate={paginate} />
            <div>
                <div>
                    <span className="titleAC">Governadores</span>
                    <APIGovernadorGO cand={currentCands} loading={loading} />
                </div>
                <div>
                    <span className="titleAC">Senadores</span>
                    <APISenadorGO cand={currentCands} loading={loading} />
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1">
                        <span className="titleAC">Deputados Federais</span>
                        <APIDeputadoFGO />
                    </div>
                </div>
                <div className="flex flex-row mt-4">
                    <div className="flex-1 ml-2">
                        <span className="titleAC">Deputados Estaduais</span>
                        <APIDeputadoEGO />
                    </div>
                </div>
            </div>
            <div className="footer-dados">

            </div>
        </div>
    );
}
export default APIPresidenteGoias