import React, { useState, useEffect } from 'react';
import ColumnHeader from './ColumnHeader';
import './Table.css';
import Form from 'react-bootstrap/Form';
import Paginator from './Paginator';
import { useWhatChanged } from '@simbathesailor/use-what-changed';
import { useDebouncedCallback } from 'use-debounce';
import { filterByKeys, sortByKey } from '../../utils/arrayUtils'

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
    }, [data, sortBy, direction, currentPage, pageSize, searchQuery]);
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
                return { expanded: false, ...v };
            });
            const sortedData = sortByKey(d, sortBy, direction);
            const filteredData = filterByKeys(sortedData, columns, searchValue);
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedData = filteredData.slice(startIndex, endIndex);
            setRowCount(filteredData.length);
            setDisplayedData(paginatedData);
        }
    };
    const onPageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        if (onChange) {
            onChange(sortBy, direction, currentPage, parseInt(e.target.value), searchQuery);
        }
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
            <table className='paginated'>
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
Table.defaultProps = {
};
export default Object.assign(Table, { ColumnHeader });