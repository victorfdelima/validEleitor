import React, { useEffect, useState } from "react";
import "../../App.css";

const APIDeputadoF = () => {

    const BASEURLDeputadoF = "https://resultados-sim.tse.jus.br/teste/ele2022/9238/dados-simplificados/ro/ro-c0006-e009238-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)


    useEffect(() => {
        getUserDeputadoF();
    }, []);
    const getUserDeputadoF = async () => {
        const api_response = await fetch(
            `${BASEURLDeputadoF}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "s-maxage=10, stale-while-revalidate"
                }
            }
        );


        const cand = await api_response.json();

        setCand(cand.cand);
        console.log('testedeSenador', cand.cand)
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
        <div className="overflow-y-auto scrolling-touch cargo-h-scroll">
            <div className="grupo-card">
                {cand.map((item, index) => (
                    <div className="container">
                        <div className="row">
                            <div className="card col-lg-4">
                                <div className="flex-1 flex flex-col p-4 shadow-md rounded bg-white">
                                    <div className="font-bold mb-1 text-2xl text-ion-tertiary tracking-tight">
                                        <img className="image-data" src="data:image/jpeg;base64,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" alt="te" />
                                        {item.pvap + "%"}
                                        <br />

                                    </div>
                                    <div className="textEleitor">
                                        {item.st}
                                    </div>
                                    <div className="text-gray-600 text-xs">
                                        <div>
                                            Votos: {item.vap}
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

            </div>        </div>
    );
}
export default APIDeputadoF