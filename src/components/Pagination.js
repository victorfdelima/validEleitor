import React from "react";

const Pagination = ({ candPerPage, totalCands, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCands / candPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <div key={number} className="page-item">
                        <button onClick={() => paginate(number)} className="page-button">
                            {number}
                        </button>

                    </div>
                ))}
            </div>
            <div className="footer-page">

            </div>
        </nav>
    )
}

export default Pagination