import React, { useEffect, useState, useMemo } from "react";
import "../../App.css";
import axios from "axios";

const APIDeputadoFAC = () => {

    const BASEURL = "https://resultados.tse.jus.br/oficial/ele2022/546/dados-simplificados/ac/ac-c0006-e000546-r.json"
    const [cand, setCand] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
       const [candPerPage] = useState(8)
    const [search, setSearch] = useState('');
    useEffect( () => {
       axios.get(BASEURL)
        .then(response => {
          setCand(response.data.cand)
          setLoading(false)
          console.log(response.data.cand)
         }     )
      },[])
    

    const indexOfLastCand = useMemo(
        () => currentPage * candPerPage,
        [currentPage, candPerPage],
      );
      const indexOfFirstCand = useMemo(
        () => indexOfLastCand - candPerPage,
        [indexOfLastCand, candPerPage],
      );
      const currentCand = useMemo(
        () => cand.slice(indexOfFirstCand, indexOfLastCand),
        [cand, indexOfFirstCand, indexOfLastCand],
      );
    



      const filteredCands = useMemo(() => {
        if (!search) return cand;
    
        return cand.filter(
            (cand) =>
            cand.st.toLowerCase().startsWith(search.toLowerCase()) ||
            cand.nm.toLowerCase().includes(search.toLowerCase()),
        );
      }, [cand, search]);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
                <div className="overflow-y-auto scrolling-touch cargo-h-scroll">
                                                   <input
                className="inputbuscaDepE"
                    type="text"
                    placeholder="Procure por um deputado"
                    onChange={(event) => setSearch(event.target.value)}
                    />
            <div className="grupo-card">
                {filteredCands.map((item, index) => (
                    <div className="container">
                        <div className="row">
                            <div className="card col-lg-4">
                                <div className="flex-1 flex flex-col p-4 shadow-md rounded bg-white">
                                    <div className="font-bold mb-1 text-2xl text-ion-tertiary tracking-tight">
                                                        <img
                    className="imagem-candi"
                    src={`https://resultados.tse.jus.br/oficial/ele2022/546/fotos/ac/${item.sqcand}.jpeg`}
                    
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

            </div>        </div>
    );
}
export default APIDeputadoFAC