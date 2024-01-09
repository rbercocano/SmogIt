import Title from '../components/Title/Title';
import Table from '../components/Table/Table';
import clientService from '../services/ClientService';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OverlayLoadingContext } from '../contexts/OverlayLoadingContext';
function Customers() {
    const navigate = useNavigate();
    const { loading, setOverlayLoading } = useContext(OverlayLoadingContext);
    const [data, setData] = useState([]);
    const [sort, setSort] = useState({ sortBy: 'firstName', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const addNew = () => {
        navigate('/customer');
    }

    const headerTemplate = () => (
        <tr>
            <Table.ColumnHeader sortKey={'firstName'} title={'Name'} sortable={true} onSort={handleSort} currentSortKey={sort.sortBy} />
            <Table.ColumnHeader sortKey={'email'} title={'Email'} sortable={true} onSort={handleSort} currentSortKey={sort.sortBy} />
            <Table.ColumnHeader sortKey={'phone'} title={'Phone'} sortable={true} onSort={handleSort} currentSortKey={sort.sortBy} />
            <Table.ColumnHeader sortable={false} />
        </tr>
    );
    const rowTemplate = useCallback((rowData, index) => {
        const { clientId, firstName, lastName, email, phone } = rowData;
        return (
            <tr key={clientId} className={index % 2 === 0 ? 'odd' : null}>
                <td>{firstName} {lastName}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td width={30}>
                    <Button variant="contained" className='table-btn' onClick={() => { navigate(`/customer/${clientId}`); }} >
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>

                </td>
            </tr >
        );
    }, []);
    const handleSort = useCallback((sortBy, direction) => {
        setSort({ sortBy: sortBy, direction: direction });
        const fetchData = async () => {
            const data = await clientService.search(pageSize, currentPage, sortBy, direction, searchQuery);
            setData(data);
        };
        return fetchData();
    }, []);
    const handleTableChange = useCallback((sortBy, direction, currentPage, pageSize, searchQuery) => {
        setCurrentPage(currentPage);
        setPageSize(pageSize);
        setSearchQuery(searchQuery);
        setOverlayLoading(true);
        const fetchData = async () => {
            const data = await clientService.search(pageSize, currentPage, sortBy, direction, searchQuery);
            setData(data);
            setOverlayLoading(false);
        };
        return fetchData();
    }, []);

    return (
        <>
            <div className='app-container-wrapper col-12'>
                <div className="app-container " >
                    <Title title="Customers" />
                    <div className='mt-2 mb-2' style={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <Button variant="contained" onClick={addNew}>Add New</Button>
                    </div>
                    <Table data={data} rowTemplate={rowTemplate} serverSide={true}
                        headerTemplate={headerTemplate} onChange={handleTableChange}
                        sortBy={sort.sortBy} direction={sort.direction} />
                </div>
            </div>
        </>
    );

}
export default Customers;