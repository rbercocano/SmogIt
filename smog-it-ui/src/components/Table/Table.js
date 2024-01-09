import React, { useState, useEffect } from 'react';
import ColumnHeader from './ColumnHeader';
import './Table.css';
import Form from 'react-bootstrap/Form';
import Paginator from './Paginator';
import { useWhatChanged } from '@simbathesailor/use-what-changed';
import { useDebouncedCallback } from 'use-debounce';

function Table({ data, rowTemplate, sortBy, direction, onChange, rowsPerPage, headerTemplate, serverSide }) {
    const colCount = React.Children.toArray(headerTemplate().props.children).length;
    const [displayedData, setDisplayedData] = useState([]);
    const [pageSize, setPageSize] = useState(rowsPerPage ?? 10);
    const [rowCount, setRowCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const columns = React.Children.toArray(headerTemplate().props.children)
        .filter(child => child.props.sortKey)
        .map(child => child.props.sortKey);

    useWhatChanged([sortBy, direction, currentPage, pageSize, searchQuery], 'sortBy, direction, currentPage, pageSize, searchQuery');
    useEffect(() => {
        render();
    }, [data]);
    useEffect(() => {
        if (onChange)
            onChange(sortBy, direction, currentPage, pageSize, searchQuery);
    }, [currentPage]);
    const render = () => {
        if (serverSide) {
            setDisplayedData(data.items ?? []);
            setRowCount(data.totalItems ?? 0);
        } else {
            const searchValue = searchQuery.toLowerCase();
            const d = data.map(v => {
                return { ...v, expanded: false }
            });
            const sortedData = d.sort((a, b) => {
                const order = direction === 'asc' ? 1 : -1;
                if (a[sortBy] !== b[sortBy]) {
                    return a[sortBy] > b[sortBy] ? order : -order;
                }
                return 0;
            });

            const filteredData = searchQuery === '' ? sortedData :
                sortedData.filter(item => {
                    return columns.some((column) => String(item[column]).toLowerCase().includes(searchValue));
                });
            setRowCount(filteredData.length);

            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedData = filteredData.slice(startIndex, endIndex);

            setDisplayedData(paginatedData);
        }
    };
    const onPageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value))
    }
    const onSearchChange = useDebouncedCallback((e) => {
        setSearchQuery(e.target.value);
        if (onChange) {
            onChange(sortBy, direction, currentPage, pageSize, e.target.value);
        }
    }, 500);
    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage);
    }
    return (
        <div>
            <div className='page-size'>
                <Form.Select value={pageSize} onChange={onPageSizeChange}>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </Form.Select>
            </div>
            <div className='search'>
                <Form.Control type='text' placeholder='Search'
                    onChange={onSearchChange}
                />
            </div>
            <table>
                <thead>
                    {headerTemplate()}
                </thead>
                <tbody>
                    {displayedData.length ? (
                        displayedData.map((rowData, index) => rowTemplate(rowData, index))
                    ) : (
                        <tr>
                            <td colSpan={colCount} style={{ textAlign: 'center' }}>
                                No data to display
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Paginator pageSize={pageSize} rowCount={rowCount} onPageChange={handlePageChange} page={currentPage} />
        </div>
    );
}

export default Object.assign(Table, { ColumnHeader });