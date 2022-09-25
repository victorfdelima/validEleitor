import React from 'react'

const CandiPresidenteMS = ({ cand, loading }) => {
    
    if (loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div className="grupo-card">
            {/* <span className="title"> Presidente</span> */}
            {cand.map((item, index) => (
                <div className="container">

                    <div className="row">
                        <div className="card col-lg-4">
                            <div className="flex-1 flex flex-col p-4 shadow-md rounded bg-white">
                                <div className="font-bold mb-1 text-2xl text-ion-tertiary tracking-tight">
                                                                                                                                                                              <img
                    className="imagem-candi"
                    src={`544/fotos/br/${item.sqcand}.jpeg`}
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
                                    Vice: {item.nv}
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
    )
}
export default CandiPresidenteMS