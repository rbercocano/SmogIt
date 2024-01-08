import Title from '../components/Title/Title';
import Table from '../components/Table/Table';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clientService from '../services/ClientService';
function Customers() {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState({ sortBy: 'firstName', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const data = await clientService.search(10, 1, 'firstName', 'desc', '');
            setData(data);
        };

        fetchData();
    }, []);
    const addNew = () => {
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
                    <Button size='sm' className='table-btn' onClick={() => { }} >
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
        const fetchData = async () => {
            const data = await clientService.search(pageSize, currentPage, sortBy, direction, searchQuery);
            setData(data);
        };
        return fetchData();
    }, []);

    return (
        <>
            <div className='app-container-wrapper col-12'>
                <div className="app-container " >
                    <Title title="Customers" />
                    <div className='mt-2 mb-2' style={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <Button onClick={addNew}>Add New</Button>
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