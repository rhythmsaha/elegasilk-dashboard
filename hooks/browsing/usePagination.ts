import { useState } from 'react';

const usePagination = () => {
    const [rowsPerPage, setRowsPerPage] = useState(new Set(['5'])); // State for rows per page
    const [maxPage, setmMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    return { rowsPerPage, maxPage, currentPage, setRowsPerPage, setmMaxPage, setCurrentPage };
};

export default usePagination;
