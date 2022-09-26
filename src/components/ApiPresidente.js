import React, { useEffect, useState } from "react";
import "../App.css";
import CandiPresidente from "./CandiPresidente";
import Pagination from "./Pagination";

const APIPresidenteAll = () => {

    const BASEURLPRESIDENTE = "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)


    useEffect(() => {
        getUserPresidenteAll();
    }, []);
    const getUserPresidenteAll = async () => {
        const api_response = await fetch(
            `${BASEURLPRESIDENTE}`,
            {                mode: "cors",
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
            <CandiPresidente cand={currentCands} loading={loading} />
            <Pagination candPerPage={candPerPage} totalCands={cand.length} paginate={paginate} />
        </div>
    );
}
export default APIPresidenteAll