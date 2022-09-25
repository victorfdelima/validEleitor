import React, { useEffect, useState } from "react";
import "../../App.css";
import Pagination from "../Pagination";

const APISenadorBA = () => {

    const BASEURLSENADORBA = "https://resultados-sim.tse.jus.br/teste/ele2022/9238/dados-simplificados/ba/ba-c0005-e009238-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)


    useEffect(() => {
        getUserSenadorBA();
    }, []);
    const getUserSenadorBA = async () => {
        const api_response = await fetch(
            `${BASEURLSENADORBA}`,
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
                    src={`https://resultados-sim.tse.jus.br/teste/ele2022/9238/fotos/ba/${item.sqcand}.jpeg`}
                    alt="te"
                  />
                                    {item.pvap + "%"}
                                        <br />

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
                                        {item.cc} - {item.n}
                                    </div>
                                    <div className="font-bold text-2xl tracking-tight">
                                        {item.nm}
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
export default APISenadorBA