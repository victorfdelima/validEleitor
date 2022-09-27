import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import Pagination from "../Pagination";

const APIGovernador = () => {

    const BASEURL = "https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/sc/sc-c0003-e000546-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)


     useEffect( () => {
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
    
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div>
            <div className="grupo-card">
                {cand.map((item, index) => (
                    <div className="container">
                        <div className="row">
                            <div className="card col-lg-4">
                                <div className="flex-1 flex flex-col p-4 shadow-md rounded bg-white">
                                    <div className="font-bold mb-1 text-2xl text-ion-tertiary tracking-tight">
                                                    <img
                    className="imagem-candi"
                    src={`https://resultados.tse.jus.br/oficial/ele2022/546/fotos/sc/${item.sqcand}.jpeg`}
                    alt="te"
                  />
                                    {item.pvap + "%"}

                                    </div>
                                    <div className="textEleitor">
                                        {item.st}
                                    </div>
                                    <div className="text-gray-600 text-xs">
                                        <div>
                                            Votos: {item.vap.split( /(?=(?:\d{3})+(?:\.|$))/g ).join('.')}
                                        </div>
                                    </div>
                                    <div className="ccN">
                                        {item.cc.split('-')[0]} - {item.n}
                                    </div>
                                    <div className="font-bold candidato tracking-tight">
                                        {item.nm.replace("&apos;", "'")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div>
                </div>

            </div>
            <Pagination candPerPage={candPerPage} totalCands={cand.length} paginate={paginate} />
        </div>
    );
}
export default APIGovernador