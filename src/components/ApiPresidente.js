import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import CandiPresidente from "./CandiPresidente";
import Pagination from "./Pagination";

const APIPresidenteAll = () => {

    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [candPerPage] = useState(8)

	 useEffect(() => {
	     axios.get('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
	    .then(response =>  {  
	      setCand(response.data.cand)
	      setLoading(false)
	      console.log(response.data.cand)
	     })
	  },[])
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