import React, { useEffect, useState } from 'react';
import { faChevronLeft, faAnglesLeft, faChevronRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
Paginator.defaultProps = {
    onPageChange: () => { },
    pageSize: 10,
    rowCount: 0,
    page: 1
};
function Paginator({ pageSize, rowCount, onPageChange, page }) {
    const [buttons, setButtons] = useState([]);
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        const pageCount = Math.ceil(rowCount / pageSize);
        let start, end;

        if (pageCount <= 5 || currentPage <= 3) {
            start = 1;
            end = Math.min(5, pageCount);
        } else if (currentPage >= pageCount - 2) {
            start = pageCount - 4;
            end = pageCount;
        } else {
            start = currentPage - 2;
            end = currentPage + 2;
        }
        let btns = [];
        for (let i = start; i <= end; i++) {
            btns.push(i);
        }
        setTotalPages(pageCount);
        setButtons(btns);
    }, [pageSize, rowCount, currentPage]);

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    function handlePageChange(page) {
        page = page < 1 ? 1 : page;
        page = page > totalPages ? totalPages : page;
        if (currentPage !== page) {
            setCurrentPage(page);
            if (onPageChange)
                onPageChange(page);
        }
    }
    return rowCount > 0 && (
        <nav className='pagination'>
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {buttons.map(b => (
                <button key={b} className={currentPage === b ? 'active' : ''} onClick={() => handlePageChange(b)}>
                    {b}
                </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                <FontAwesomeIcon icon={faAnglesRight} />
            </button>
        </nav>
    );
}

export default Paginator;
