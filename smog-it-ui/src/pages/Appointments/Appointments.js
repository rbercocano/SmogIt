import Moment from 'moment';
import './Appointments.css';
import React, { useReducer } from "react";
import Badge from "../../components/Badge/Badge";
import Table from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import appointmentService from "../../services/AppointmentService";
import AppointmentModal from '../../components/AppointmentModal/AppointmentModal';
import { Button, Tooltip } from '@mui/material';
import toast from 'react-hot-toast';
function Appointments() {
    const ACTIONS = {
        TOGGLE_APPT_MODAL: 'TOGGLE_APPT_MODAL',
        TOGGLE_APPT_DETAILS: 'TOGGLE_APPT_DETAILS',
        APPT_LOADED: 'APPT_LOADED',
        APPT_SAVED: 'APPT_SAVED',
        APPT_SELECTED: 'APPT_SELECTED'
    };
    const initialState = {
        apptSort: { sortBy: 'appointmentDateTime', direction: 'desc' },
        apptSearchQuery: null,
        apptCurrentPage: 1,
        apptPageSize: 10,
        appointments: [],
        apptModalOpen: false,
        selectedAppointment: null
    };
    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.APPT_SELECTED:
                return { ...state, selectedAppointment: action.payload, apptModalOpen: true };
            case ACTIONS.APPT_LOADED:
                return { ...state, ...action.payload };
            case ACTIONS.TOGGLE_APPT_MODAL:
                return { ...state, apptModalOpen: !state.apptModalOpen };
            case ACTIONS.APPT_SAVED:
                return { ...state, apptModalOpen: false, apptCurrentPage: 1 };
            case ACTIONS.TOGGLE_APPT_DETAILS:
                {
                    let appts = state.appointments.items.map((appointment) => {
                        if (appointment.appointmentId === action.payload) {
                            return { ...appointment, expanded: !appointment.expanded };
                        }
                        return appointment;
                    });
                    return { ...state, appointments: { ...state.appointments, items: appts } };
                }
            default: return state;
        }
    };
    const addNew = () => {
        dispatch({ type: ACTIONS.APPT_SELECTED, payload: {} });
    };
    const selectAppointment = (rowData) => {
        dispatch({ type: ACTIONS.APPT_SELECTED, payload: rowData });
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const apptHeaderTemplate = () => (
        <tr>
            <Table.ColumnHeader sortable={false} />
            <Table.ColumnHeader sortKey={'firstName'} title={'Customer'} sortable={true} onSort={handleApptSort} currentSortKey={state.apptSort.sortBy} />
            <Table.ColumnHeader sortKey={'year'} title={'Vehicle'} sortable={true} onSort={handleApptSort} currentSortKey={state.apptSort.sortBy} />
            <Table.ColumnHeader sortKey={'status'} title={'Status'} sortable={true} onSort={handleApptSort} currentSortKey={state.apptSort.sortBy} align='center' />
            <Table.ColumnHeader sortKey={'appointmentDateTime'} title={'Date'} sortable={true} onSort={handleApptSort} currentSortKey={state.apptSort.sortBy} />
            <Table.ColumnHeader sortKey={'totalPrice'} title={'Total'} sortable={false} align='right' />
            <Table.ColumnHeader sortable={false} />
        </tr>
    );
    const apptRowTemplate = (rowData, index) => {
        const { appointmentId, year, status, make, model, licensePlate, appointmentDateTime, totalPrice, firstName, lastName } = rowData;
        let variant = 'default';
        switch (status) {
            case 'Pending': variant = 'warning'; break;
            case 'Completed': variant = 'success'; break;
            case 'In Progress': variant = 'default'; break;
            case 'Cancelled': variant = 'error'; break;
            default: break;
        }
        return (
            <React.Fragment key={appointmentId}>
                <tr className='master-row odd'>
                    <td>
                        <FontAwesomeIcon className='clickable' icon={!rowData.expanded ? faChevronRight : faChevronDown} onClick={() => toggleDetails(appointmentId)} />
                    </td>
                    <td>{`${firstName} ${lastName}`}</td>
                    <td>{`${year} ${make} ${model} ${licensePlate}`}</td>
                    <td className='text-center'><Badge text={status} variant={variant} /></td>
                    <td>{Moment(appointmentDateTime).format('MM/DD/YYYY HH:mm')}</td>
                    <td>${totalPrice.toFixed(2)}</td>
                    <td width={30}>
                        <Tooltip title='View Details'>
                            <Button variant="contained" className='table-btn' onClick={() => selectAppointment(rowData)} >
                                <FontAwesomeIcon icon={faPencil} />
                            </Button>
                        </Tooltip>
                    </td>
                </tr>
                {
                    rowData.expanded && rowData.services.map(s => {
                        return (
                            <tr className="details-row" key={`details_${s.appointmentServiceId}`}>
                                <td></td>
                                <td colSpan={4}>{s.serviceName}</td>
                                <td>{s.originalPrice !== s.price && <s>${s.originalPrice.toFixed(2)}</s>} ${s.price.toFixed(2)}</td>
                                <td></td>
                            </tr>)
                    })
                }
            </React.Fragment >
        );
    };
    const handleCloseApptModal = () => {
        dispatch({ type: ACTIONS.TOGGLE_APPT_MODAL });
    };
    const handleApptSave = async (v) => {
        toast.success('Appointment saved');
        dispatch({ type: ACTIONS.APPT_SAVED });
        const data = await appointmentService.search(state.apptPageSize, 1, state.apptSort.sortBy, state.apptSort.direction, state.apptSearchQuery);
        dispatch({ type: ACTIONS.APPT_LOADED, payload: { appointments: data } });
        return data;

    };
    const toggleDetails = (appointmentId) => {
        dispatch({ type: ACTIONS.TOGGLE_APPT_DETAILS, payload: appointmentId });
    };
    const handleApptSort = async (sortBy, direction) => {
        const data = await appointmentService.search(state.apptPageSize, state.apptCurrentPage, sortBy, direction, state.apptSearchQuery);
        dispatch({ type: ACTIONS.APPT_LOADED, payload: { apptSort: { sortBy, direction }, appointments: data } });
    };
    const handleApptTableChange = async (sortBy, direction, currentPage, pageSize, searchQuery) => {
        const data = await appointmentService.search(pageSize, currentPage, sortBy, direction, searchQuery);
        dispatch({ type: ACTIONS.APPT_LOADED, payload: { apptCurrentPage: currentPage, apptPageSize: pageSize, apptSearchQuery: searchQuery, appointments: data } });
        return data;
    };
    return (<>
        <div className='app-container-wrapper col-12'>
            <div className="app-container " >
                <Title title="Appointments" />
                <div className='mt-2 mb-2' style={{ justifyContent: 'flex-end', display: 'flex' }}>
                    <Button variant="contained" onClick={addNew}>Add New</Button>
                </div>
                <Table data={state.appointments} rowTemplate={apptRowTemplate} headerTemplate={apptHeaderTemplate} onChange={handleApptTableChange}
                    sortBy={state.apptSort.sortBy} direction={state.apptSort.direction} serverSide={true} />
            </div>
            {state.selectedAppointment && <AppointmentModal opened={state.apptModalOpen} onCancel={handleCloseApptModal} onSave={handleApptSave} appointmentDetails={state.selectedAppointment} />}
        </div>
    </>);
}
export default Appointments;