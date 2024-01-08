import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '../components/Table/Table';
import Title from '../components/Title/Title';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Badge from '../components/Badge/Badge';
import Toolbar from '../components/Toolbar/Toolbar';
const validationSchema = Yup.object({
    firstName: Yup.string().required('Required field'),
    lastName: Yup.string().required('Required field'),
    phone: Yup.string().required('Required field'),
    email: Yup.string().email('Invalid e-mail')
});
function Customer() {
    const [vehicleSort, setVehicleSort] = useState({ sortBy: '', direction: '' });
    const [vehicles, setVehicles] = useState([{ id: 1, make: 'Honda', model: 'Civic', plate: '999ASYF' }, { id: 2, make: 'Mercedez', model: 'c300', plate: '182X0O9P' }]);
    const [apptSort, setApptSort] = useState({ sortBy: '', direction: '' });
    const [appointments, setAppointments] = useState([{ id: 1, vehicle: 'Honda Civic', plate: '999ASYF', status: 'Pending', date: '01/04/2024 10:59' },
    { id: 2, vehicle: 'Mercedez c300', plate: '182X0O9P', status: 'Completed', date: '01/04/2024 8:33' }, { id: 3, vehicle: 'Mercedez c300', plate: '182X0O9P', status: 'Cancelled', date: '01/03/2024 10:00' }]);
    const [customer, setCustomer] = useState({ firstName: '', lastName: '', email: '', phone: '' });
    const [validationErrors, setValidationErrors] = useState({ firstName: '', lastName: '', email: '', phone: '' });

    const handleCustomerSave = () => {
        try {
            validationSchema.validateSync(customer, { abortEarly: false });
            setValidationErrors({});
        } catch (e) {
            let error = {}
            e.inner.forEach(err => {
                error = { ...error, [err.path]: err.errors[0] };
            });
            setValidationErrors(error);
        }
    };

    const handleCostumerChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    };
    const deleteVehicle = (vehicle) => {

    }
    const vehicleHeaderTemplate = () => (
        <tr>
            <Table.ColumnHeader sortKey={'make'} title={'Make'} sortable={true} onSort={handleVehicleSort} currentSortKey={vehicleSort.sortBy} />
            <Table.ColumnHeader sortKey={'model'} title={'Model'} sortable={true} onSort={handleVehicleSort} currentSortKey={vehicleSort.sortBy} />
            <Table.ColumnHeader sortKey={'plate'} title={'Plate'} sortable={true} onSort={handleVehicleSort} currentSortKey={vehicleSort.sortBy} />
            <Table.ColumnHeader sortable={false} />
        </tr>
    );
    const vehicleRowTemplate = (rowData, index) => {
        const { id, make, model, plate } = rowData;
        return (
            <tr key={id} className={index % 2 === 0 ? 'odd' : null}>
                <td>{make}</td>
                <td>{model}</td>
                <td>{plate}</td>
                <td width={20}>
                    <Button variant="contained" className='table-btn' color='error' onClick={() => { deleteVehicle(rowData); }}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>
            </tr >
        );
    };

    const handleVehicleSort = (sortBy, direction) => {
        setVehicleSort({ sortBy: sortBy, direction: direction });
    };
    const handleVehicleTableChange = (sortBy, direction, currentPage, pageSize, searchQuery) => {
    };


    const apptHeaderTemplate = () => (
        <tr>
            <Table.ColumnHeader sortKey={'vehicle'} title={'Vehicle'} sortable={true} onSort={handleApptSort} currentSortKey={apptSort.sortBy} />
            <Table.ColumnHeader sortKey={'plate'} title={'Plate'} sortable={true} onSort={handleApptSort} currentSortKey={apptSort.sortBy} />
            <Table.ColumnHeader sortKey={'status'} title={'Status'} sortable={true} onSort={handleApptSort} currentSortKey={apptSort.sortBy} align='center' />
            <Table.ColumnHeader sortKey={'date'} title={'Date'} sortable={true} onSort={handleApptSort} currentSortKey={apptSort.sortBy} />
        </tr>
    );
    const apptRowTemplate = (rowData, index) => {
        const { id, vehicle, status, date, plate } = rowData;
        let variant = 'default';
        switch (status) {
            case 'Pending': variant = 'warning'; break;
            case 'Completed': variant = 'success'; break;
            case 'In Progress': variant = 'default'; break;
            case 'Cancelled': variant = 'error'; break;
        }
        return (
            <tr key={id} className={index % 2 === 0 ? 'odd' : null}>
                <td>{vehicle}</td>
                <td>{plate}</td>
                <td className='text-center'><Badge text={status} variant={variant} /></td>
                <td>{date}</td>
            </tr >
        );
    };

    const handleApptSort = (sortBy, direction) => {
        setApptSort({ sortBy: sortBy, direction: direction });
    };
    const handleApptTableChange = (sortBy, direction, currentPage, pageSize, searchQuery) => {
    };


    return (
        <>
            <div className='app-container-wrapper col-6 '>
                <div className="app-container" >
                    <Title title='Customer' />
                    <div className="row">
                        <div className="col-6 mb-3">
                            <TextField id="outlined-basic" label="First Name" variant="outlined" name="firstName"
                                helperText={!!validationErrors.firstName && validationErrors.firstName}
                                error={!!validationErrors.firstName}
                                onChange={handleCostumerChange}
                                size='small' className='w-100' />
                        </div>
                        <div className="col-6 mb-3">
                            <TextField id="outlined-basic" label="Last Name" variant="outlined" name="lastName"
                                helperText={!!validationErrors.lastName && validationErrors.lastName}
                                error={!!validationErrors.lastName} onChange={handleCostumerChange}
                                size='small' className='w-100' />
                        </div>
                        <div className="col-6 mb-3">
                            <TextField id="outlined-basic" label="Phone" variant="outlined" name="phone"
                                helperText={!!validationErrors.phone && validationErrors.phone}
                                error={!!validationErrors.phone} onChange={handleCostumerChange}
                                size='small' className='w-100' />
                        </div>
                        <div className="col-6 mb-3">
                            <TextField id="outlined-basic" label="Email" variant="outlined"
                                error={!!validationErrors.email} helperText={!!validationErrors.email && validationErrors.email}
                                onChange={handleCostumerChange} size='small' className='w-100' name="email" />
                        </div>
                        <div className="col-12 mb-3">
                            <Button variant="contained" className='w-100' onClick={handleCustomerSave}>Save</Button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Title title='Vehicles'>
                            <Toolbar>
                                <Toolbar.Button faIcon={faPlus} n toolTipText='Add Vehicle'></Toolbar.Button>
                            </Toolbar>
                        </Title>
                        <Table data={vehicles} rowTemplate={vehicleRowTemplate}
                            headerTemplate={vehicleHeaderTemplate} onChange={handleVehicleTableChange}
                            sortBy={vehicleSort.sortBy} direction={vehicleSort.direction} />
                    </div>
                </div>
            </div>
            <div className='app-container-wrapper col-6 '>
                <div className="app-container" >
                    <Title title='Appointments'>
                        <Toolbar>
                            <Toolbar.Button faIcon={faPlus} n toolTipText='Add Appointment'></Toolbar.Button>
                        </Toolbar>
                    </Title>
                    <Table data={appointments} rowTemplate={apptRowTemplate}
                        headerTemplate={apptHeaderTemplate} onChange={handleApptTableChange}
                        sortBy={apptSort.sortBy} direction={apptSort.direction} />
                </div>
            </div>
        </>
    );
}
export default Customer;