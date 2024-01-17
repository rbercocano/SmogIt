import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import Moment from 'moment';
import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, Button } from "@mui/material";
import * as Yup from "yup";
import './Customer.css';
import { faCalendar, faChevronDown, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import Badge from "../../components/Badge/Badge";
import Toolbar from "../../components/Toolbar/Toolbar";
import clientService from "../../services/ClientService";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../components/FormInputs/FormInputText";
import NewVehicleModal from "../../components/NewVehicleModal/NewVehicleModal";
import AppointmentModal from "../../components/AppointmentModal/AppointmentModal";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
	firstName: Yup.string().required("Required field"),
	lastName: Yup.string().required("Required field"),
	phone: Yup.string().required("Required field"),
	email: Yup.string().email("Invalid e-mail")
});
function Customer() {
	const ACTIONS = {
		TOGGLE_VEHICLE_MODAL: 'TOGGLE_VEHICLE_MODAL',
		SELECT_VEHICLE: 'SELECT_VEHICLE',
		VEHICLES_LOADED: 'VEHICLES_LOADED',
		VEHICLE_SAVED: 'VEHICLE_SAVED',
		TOGGLE_APPT_MODAL: 'TOGGLE_APPT_MODAL',
		TOGGLE_APPT_DETAILS: 'TOGGLE_APPT_DETAILS',
		APPT_LOADED: 'APPT_LOADED',
		APPT_SAVED: 'APPT_SAVED',
		CLIENT_LOADED: 'CLIENT_LOADED'
	};
	const initialState = {
		vehicleSort: { sortBy: 'make', direction: 'asc' },
		vehicleSearchQuery: null,
		vehicleCurrentPage: 1,
		vehiclePageSize: 10,
		vehicles: [],
		vehicleModalOpen: false,
		selectedVehicle: null,
		apptSort: { sortBy: 'appointmentDateTime', direction: 'desc' },
		apptSearchQuery: null,
		apptCurrentPage: 1,
		apptPageSize: 10,
		appointments: [],
		apptModalOpen: false,
		client: null
	};
	const reducer = (state, action) => {
		switch (action.type) {
			case ACTIONS.CLIENT_LOADED:
				return { ...state, client: action.payload };
			case ACTIONS.TOGGLE_VEHICLE_MODAL:
				return { ...state, vehicleModalOpen: !state.vehicleModalOpen };
			case ACTIONS.SELECT_VEHICLE:
				return { ...state, selectedVehicle: action.payload, apptModalOpen: true };
			case ACTIONS.VEHICLE_SAVED:
				return { ...state, vehicleModalOpen: false, vehicleCurrentPage: 1 };
			case ACTIONS.VEHICLES_LOADED:
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
	const { id } = useParams();
	const navigate = useNavigate();
	const [state, dispatch] = useReducer(reducer, initialState);
	const form = useForm({ defaultValues: { clientId: id, firstName: "", lastName: "", phone: "", email: "" } });
	const { handleSubmit, setValue, control, setError, clearErrors, getValues } = form;
	useEffect(() => {
		if (id) {
			clientService.get(id).then((result) => {
				const { firstName, lastName, phone, email } = result;
				setValue("firstName", firstName);
				setValue("lastName", lastName);
				setValue("phone", phone);
				setValue("email", email);
				dispatch({ type: ACTIONS.CLIENT_LOADED, payload: result });
			});
		}
	}, []);
	const saveCustomer = async (data) => {
		try {
			validationSchema.validateSync(data, { abortEarly: false });
			clearErrors();
			let id = getValues("clientId");
			if (id) {
				toast.promise(clientService.update(id, data).then((r) => { }),
					{
						loading: 'Saving...',
						success: <b>Customer data saved</b>,
						error: <b>Error while saving customer</b>,
					}
				);
			} else {
				toast.promise(clientService.add(data).then((r) => {
					setValue("clientId", r);
					navigate(`/customer/${r}`, { replace: true });
				}),
					{
						loading: 'Saving...',
						success: <b>Customer data saved</b>,
						error: <b>Error while saving customer</b>,
					});
			}
		} catch (e) {
			e.inner.forEach((err) => {
				setError(err.path, {
					type: "manual",
					message: err.errors[0],
				});
			});
		}
	};
	const vehicleHeaderTemplate = () => (
		<tr>
			<Table.ColumnHeader sortKey={"year"} title={"Vehicle"} sortable={true} onSort={handleVehicleSort} currentSortKey={state.vehicleSort.sortBy} />
			<Table.ColumnHeader sortKey={"licensePlate"} title={"Plate"} sortable={true} onSort={handleVehicleSort} currentSortKey={state.vehicleSort.sortBy} />
			<Table.ColumnHeader sortKey={"vin"} title={"VIN"} sortable={true} onSort={handleVehicleSort} currentSortKey={state.vehicleSort.sortBy} />
		</tr>
	);
	const selectVehicleForAppt = (v) => {
		dispatch({ type: ACTIONS.SELECT_VEHICLE, payload: v });
	};
	const vehicleRowTemplate = (rowData, index) => {
		const { vehicleId, make, model, licensePlate, year, vin } = rowData;
		return (
			<tr key={vehicleId} className={index % 2 === 0 ? "odd" : null}>
				<td>{year} {make} {model}</td>
				<td>{licensePlate}</td>
				<td>{vin}</td>
				<td width={30}>
					<Tooltip title='Add Appointment'>
						<Button variant="contained" className='table-btn' onClick={() => selectVehicleForAppt(rowData)} >
							<FontAwesomeIcon icon={faCalendar} />
						</Button>
					</Tooltip>
				</td>
			</tr>
		);
	};
	const handleVehicleSort = async (sortBy, direction) => {
		const data = await clientService.searchVehicles(id, state.vehiclePageSize, state.vehicleCurrentPage, sortBy, direction, state.vehicleSearchQuery);
		dispatch({ type: ACTIONS.VEHICLES_LOADED, payload: { vehicleSort: { sortBy, direction }, vehicles: data } });
	};
	const handleVehicleTableChange = async (sortBy, direction, currentPage, pageSize, searchQuery) => {
		let id = getValues('clientId');
		if (id) {
			const data = await clientService.searchVehicles(id, pageSize, currentPage, sortBy, direction, searchQuery);
			dispatch({ type: ACTIONS.VEHICLES_LOADED, payload: { vehicleCurrentPage: currentPage, vehiclePageSize: pageSize, vehicleSearchQuery: searchQuery, vehicles: data } });
			return data;
		}
	};
	const handleVehicleSave = async (v) => {
		toast.success('Vehicle saved');
		let id = getValues('clientId');
		dispatch({ type: ACTIONS.VEHICLE_SAVED });
		if (id) {
			const data = await clientService.searchVehicles(id, state.vehiclePageSize, 1, state.vehicleSort.sortBy, state.vehicleSort.direction, state.vehicleSearchQuery);
			dispatch({ type: ACTIONS.VEHICLES_LOADED, payload: { vehicles: data } });
			return data;
		}
	};
	const handleOpenVehicleModal = () => {
		dispatch({ type: ACTIONS.TOGGLE_VEHICLE_MODAL });
	};
	const handleCloseVehicleModal = () => {
		dispatch({ type: ACTIONS.TOGGLE_VEHICLE_MODAL });
	};
	const handleCloseApptModal = () => {
		dispatch({ type: ACTIONS.TOGGLE_APPT_MODAL });
	};
	const handleApptSave = async (v) => {
		toast.success('Appointment saved');
		let id = getValues('clientId');
		dispatch({ type: ACTIONS.APPT_SAVED });
		if (id) {
			const data = await clientService.searchAppointment(id, state.apptPageSize, 1, state.apptSort.sortBy, state.apptSort.direction, state.apptSearchQuery);
			dispatch({ type: ACTIONS.APPT_LOADED, payload: { appointments: data } });
			return data;
		}
	};
	const apptHeaderTemplate = () => (
		<tr>
			<Table.ColumnHeader sortable={false} />
			<Table.ColumnHeader sortKey={'year'} title={'Vehicle'} sortable={true} onSort={handleApptSort} currentSortKey={state.apptSort.sortBy} />
			<Table.ColumnHeader sortKey={'status'} title={'Status'} sortable={true} onSort={handleApptSort} currentSortKey={state.apptSort.sortBy} align='center' />
			<Table.ColumnHeader sortKey={'appointmentDateTime'} title={'Date'} sortable={true} onSort={handleApptSort} currentSortKey={state.apptSort.sortBy} />
			<Table.ColumnHeader sortKey={'totalPrice'} title={'Total'} sortable={true} onSort={handleApptSort} currentSortKey={state.apptSort.sortBy} align='right' />
		</tr>
	);
	const apptRowTemplate = (rowData, index) => {
		const { appointmentId, year, status, make, model, licensePlate, appointmentDateTime, totalPrice } = rowData;
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
						<FontAwesomeIcon icon={!rowData.expanded ? faChevronRight : faChevronDown} onClick={() => toggleDetails(appointmentId)} />
					</td>
					<td>{`${year} ${make} ${model} ${licensePlate}`}</td>
					<td className='text-center'><Badge text={status} variant={variant} /></td>
					<td>{Moment(appointmentDateTime).format('MM/DD/YYYY HH:mm')}</td>
					<td>${totalPrice.toFixed(2)}</td>
				</tr>
				{
					rowData.expanded && rowData.services.map(s => {
						return (
							<tr className="details-row" key={`details_${s.appointmentServiceId}`}>
								<td></td>
								<td colSpan={3}>{s.serviceName}</td>
								<td>${s.price.toFixed(2)}</td>
							</tr>)
					})
				}
			</React.Fragment >
		);
	};
	const toggleDetails = (appointmentId) => {
		dispatch({ type: ACTIONS.TOGGLE_APPT_DETAILS, payload: appointmentId });
	};
	const handleApptSort = async (sortBy, direction) => {
		const data = await clientService.searchAppointment(id, state.apptPageSize, state.apptCurrentPage, sortBy, direction, state.apptSearchQuery);
		dispatch({ type: ACTIONS.APPT_LOADED, payload: { apptSort: { sortBy, direction }, appointments: data } });
	};
	const handleApptTableChange = async (sortBy, direction, currentPage, pageSize, searchQuery) => {
		let id = getValues('clientId');
		if (id) {
			const data = await clientService.searchAppointment(id, pageSize, currentPage, sortBy, direction, searchQuery);
			dispatch({ type: ACTIONS.APPT_LOADED, payload: { apptCurrentPage: currentPage, apptPageSize: pageSize, apptSearchQuery: searchQuery, appointments: data } });
			return data;
		}
	};
	return (
		<>
			<div className="app-container-wrapper col-6 ">
				<div className="app-container">
					<form autoComplete="off" onSubmit={handleSubmit(saveCustomer)}>
						<Title title="Customer" />
						<div className="row">
							<div className="col-6 mb-3">
								<FormInputText name={"firstName"} control={control} label={"First Name"} />
							</div>
							<div className="col-6 mb-3">
								<FormInputText name={"lastName"} control={control} label={"Last Name"} />
							</div>
							<div className="col-6 mb-3">
								<FormInputText name={"phone"} control={control} label={"Phone"} />
							</div>
							<div className="col-6 mb-3">
								<FormInputText name={"email"} control={control} label={"email"} />
							</div>
							<div className="col-12 mb-3">
								<Button variant="contained" className="w-100" type="submit">Save</Button>
							</div>
						</div>
						<div className="mt-3">
							<Title title="Vehicles">
								<Toolbar>
									<Toolbar.Button faIcon={faPlus} toolTipText="Add Vehicle" onClick={handleOpenVehicleModal}></Toolbar.Button>
								</Toolbar>
							</Title>
							<Table data={state.vehicles} rowTemplate={vehicleRowTemplate} headerTemplate={vehicleHeaderTemplate} onChange={handleVehicleTableChange}
								sortBy={state.vehicleSort.sortBy} direction={state.vehicleSort.direction} serverSide={true} />
						</div>
					</form>
				</div>
			</div>
			<div className="app-container-wrapper col-6 ">
				<div className="app-container">
					<Title title="Appointments" />
					<Table data={state.appointments} rowTemplate={apptRowTemplate} headerTemplate={apptHeaderTemplate} onChange={handleApptTableChange}
						sortBy={state.apptSort.sortBy} direction={state.apptSort.direction} serverSide={true} />
				</div>
			</div>
			{id && <NewVehicleModal opened={state.vehicleModalOpen} onCancel={handleCloseVehicleModal} clientId={id} onSave={handleVehicleSave} />}
			{id && state.selectedVehicle && <AppointmentModal clientDetails={state.client} opened={state.apptModalOpen} onCancel={handleCloseApptModal} clientId={id} onSave={handleApptSave} vehicleDetails={state.selectedVehicle} />}
		</>
	);
}
export default Customer;
