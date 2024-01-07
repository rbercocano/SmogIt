import Title from '../components/Title/Title';
import Table from '../components/Table/Table';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Form from 'react-bootstrap/Form';
import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';
import clientService from '../services/ClientService';
function Customers() {
    const [data, setData] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const [sort, setSort] = useState({ sortBy: '', direction: '' });
    const [deleteHeader, setDeleteHeader] = useState('');
    const [validationErrors, setValidationErrors] = useState({ firstName: '', lastName: '', email: '', phone: '' });
    const [showComponent, setShowComponent] = useState(false);
    useEffect(() => {
        if (selectedCustomer) {
            const timeoutId = setTimeout(() => {
                setShowComponent(true);
            }, 200);
            return () => clearTimeout(timeoutId);
        } else {
            setShowComponent(false);
        }
    }, [selectedCustomer]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await clientService.search(10, 1, 'firstName', 'desc', '');
            setSort({sortBy:'firstName',direction:'asc'});
            setData(data.items);
        };

        fetchData();
    }, []);
    const handleCustomerSave = useCallback(() => {
        let errors = {};
        if (!selectedCustomer.firstName)
            errors = { ...errors, firstName: 'Required Field' };
        if (!selectedCustomer.lastName)
            errors = { ...errors, lastName: 'Required Field' };
        if (!selectedCustomer.phone)
            errors = { ...errors, phone: 'Required Field' };

        if (Object.keys(errors).length === 0) {

        } else
            setValidationErrors(errors);
    }, [selectedCustomer]);
    const addNew = () => {
        selectCustomer({ firstName: '', lastName: '', vehicles: [] });
    }
    const selectCustomer = useCallback((customer) => {
        setValidationErrors({});
        setSelectedCustomer(customer);
    }, []);

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
                    <Button size='sm' className='table-btn' onClick={() => { selectCustomer(rowData); }} >
                        <FontAwesomeIcon icon={faPencil} />
                    </Button>
                </td>
            </tr >
        );
    }, [selectCustomer]);
    const handleSort = useCallback((sortBy, direction) => {
        setSort({ sortBy: sortBy, direction: direction });
    }, []);
    const handleTableChange = useCallback((sortBy, direction, currentPage, pageSize, searchQuery) => {
        console.log(sortBy);
    }, []);

    const handleCostumerChange = (e) => {
        const { name, value } = e.target;
        setSelectedCustomer({
            ...selectedCustomer,
            [name]: value,
        });
    };
    const vehicleDelete = (v) => {
        setDeleteHeader(`${v?.make} ${v?.model}`);
        setSelectedVehicle(v);
        setModalOpened(true);
    };
    const confirmVehicleDelete = useCallback((v) => {
        setModalOpened(false);
    }, []);

    const cancelVehicleDelete = (v) => {
        setModalOpened(false);
        setSelectedVehicle(null);
    };
    return (
        <>
            <div className={selectedCustomer !== null ? 'app-container-wrapper col-8' : 'app-container-wrapper col-12'}>
                <div className="app-container " >
                    <Title title="Customers" />
                    <div className='mt-2 mb-2' style={{ justifyContent: 'flex-end', display: 'flex' }}>
                        <Button onClick={addNew}>Add New</Button>
                    </div>
                    <Table data={data} rowTemplate={rowTemplate} headerTemplate={headerTemplate} onChange={handleTableChange} sortBy={sort.sortBy} direction={sort.direction} />
                </div></div>
            {showComponent && selectedCustomer &&
                <div className='app-container-wrapper col-4 '>
                    <div className="app-container" >
                        <Title title={`${selectedCustomer.firstName} ${selectedCustomer.lastName}`} />
                        <div className="row">
                            <div className="col-6">
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={selectedCustomer.firstName}
                                        placeholder="Enter your first name"
                                        maxLength={50}
                                        onChange={handleCostumerChange}
                                        isInvalid={!!validationErrors.firstName} />
                                    <Form.Control.Feedback type="invalid">
                                        {validationErrors.firstName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={selectedCustomer.lastName}
                                        placeholder="Enter your last name"
                                        maxLength={50}
                                        onChange={handleCostumerChange}
                                        isInvalid={!!validationErrors.lastName} />
                                    <Form.Control.Feedback type="invalid">
                                        {validationErrors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={selectedCustomer.email}
                                        placeholder="Enter your email"
                                        maxLength={200}
                                        onChange={handleCostumerChange}
                                        isInvalid={!!validationErrors.email} />
                                    <Form.Control.Feedback type="invalid">
                                        {validationErrors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        value={selectedCustomer.phone}
                                        placeholder="(000) 000-0000"
                                        maxLength={14}
                                        onChange={handleCostumerChange}
                                        isInvalid={!!validationErrors.phone} />
                                    <Form.Control.Feedback type="invalid">
                                        {validationErrors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-12">
                                <Button className='w-100' onClick={handleCustomerSave}>Save</Button>
                                <Button className='w-100 mt-1' variant='secondary' onClick={() => setSelectedCustomer(null)}>Close</Button>
                            </div>
                        </div>
                        <div className='mt-4'><Title title='Vehicles' /></div>
                        <div className='row' >
                            <div className="col-12">
                                <table className='app-table'>
                                    <thead>
                                        <tr>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Plate</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!selectedCustomer.vehicles.length ?
                                            <tr>
                                                <td colSpan={4} style={{ textAlign: 'center' }}>No data to display</td>
                                            </tr>

                                            : selectedCustomer.vehicles.map(v =>
                                                <tr key={v.id}>
                                                    <td>{v.make}</td>
                                                    <td>{v.model}</td>
                                                    <td>{v.plate}</td>
                                                    <td style={{ width: '30px' }}>
                                                        <Button variant='danger' size='sm' className='table-btn' onClick={() => { vehicleDelete(v); }}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            }
            <ConfirmationModal opened={modalOpened}
                onOk={confirmVehicleDelete} text={'Do you want to delete this vehicle?'}
                params={selectedVehicle} onClose={cancelVehicleDelete} header={deleteHeader}>
            </ConfirmationModal>
        </>
    );

}
export default Customers;