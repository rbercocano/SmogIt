import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '../components/Table/Table';
import Title from '../components/Title/Title';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Badge from '../components/Badge/Badge';
import Toolbar from '../components/Toolbar/Toolbar';
import clientService from '../services/ClientService';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FormInputText } from '../components/FormInputs/FormInputText';
const validationSchema = Yup.object({
    firstName: Yup.string().required('Required field'),
    lastName: Yup.string().required('Required field'),
    phone: Yup.string().required('Required field'),
    email: Yup.string().email('Invalid e-mail')
});
function Customer() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [vehicleSort, setVehicleSort] = useState({ sortBy: 'make', direction: 'asc' });
    const [vehicles, setVehicles] = useState([]);
    const [vehicleCurrentPage, setVehicleCurrentPage] = useState(1);
    const [vehiclePageSize, setVehiclePageSize] = useState(10);
    const [vehicleSearchQuery, setVehicleSearchQuery] = useState('');

    const [apptSort, setApptSort] = useState({ sortBy: '', direction: '' });
    const [appointments, setAppointments] = useState([]);
    const form = useForm({
        defaultValues: {
            clientId: id,
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        }
    });
    const { handleSubmit, setValue, control, setError, clearErrors, getValues } = form;
    useEffect(async () => {
        if (id) {
            clientService.get(id).then(result => {
                const { firstName, lastName, phone, email } = result;
                setValue('firstName', firstName);
                setValue('lastName', lastName);
                setValue('phone', phone);
                setValue('email', email);
            });
        }
    }, [])
    const saveCustomer = async (data) => {
        try {
            validationSchema.validateSync(data, { abortEarly: false });
            clearErrors();
            let id = getValues('clientId');
            if (id) {
                clientService.update(id, data).then(r => { });
            } else {
                clientService.add(data).then(r => {
                    setValue('clientId', r);
                    navigate(`/customer/${r}`, { replace: true });
                });
            }
        } catch (e) {
            e.inner.forEach(err => {
                setError(err.path, {
                    type: "manual",
                    message: err.errors[0]
                });
            });
        }
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

    const handleVehicleSort = async (sortBy, direction) => {
        setVehicleSort({ sortBy: sortBy, direction: direction });
        const data = await clientService.searchVehicles(id, vehiclePageSize, vehicleCurrentPage, sortBy, direction, vehicleSearchQuery);
        setVehicles(data.items);
    };
    const handleVehicleTableChange = async (sortBy, direction, currentPage, pageSize, searchQuery) => {
        setVehicleCurrentPage(currentPage);
        setVehiclePageSize(pageSize);
        setVehicleSearchQuery(searchQuery);
        let id = getValues('clientId');
        if (id) {
            const data = await clientService.searchVehicles(id, pageSize, currentPage, sortBy, direction, searchQuery);
            setVehicles(data.items);
            return data;
        }
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
                    <form autoComplete='off' onSubmit={handleSubmit(saveCustomer)}>
                        <Title title='Customer' />
                        <div className="row">
                            <div className="col-6 mb-3">
                                <FormInputText
                                    name={"firstName"}
                                    control={control}
                                    label={"First Name"}
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <FormInputText
                                    name={"lastName"}
                                    control={control}
                                    label={"Last Name"}
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <FormInputText
                                    name={"phone"}
                                    control={control}
                                    label={"Phone"}
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <FormInputText
                                    name={"email"}
                                    control={control}
                                    label={"email"}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <Button variant="contained" className='w-100' type='submit'>Save</Button>
                            </div>
                        </div>
                        <div className="mt-3">
                            <Title title='Vehicles'>
                                <Toolbar>
                                    <Toolbar.Button faIcon={faPlus} toolTipText='Add Vehicle'></Toolbar.Button>
                                </Toolbar>
                            </Title>
                            <Table data={vehicles} rowTemplate={vehicleRowTemplate}
                                headerTemplate={vehicleHeaderTemplate} onChange={handleVehicleTableChange}
                                sortBy={vehicleSort.sortBy} direction={vehicleSort.direction} />
                        </div>
                    </form>
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