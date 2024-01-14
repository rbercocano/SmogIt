import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../components/Table/Table";
import Title from "../components/Title/Title";
import Moment from 'moment';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip, Button } from "@mui/material";
import * as Yup from "yup";
import { faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons";
import Badge from "../components/Badge/Badge";
import Toolbar from "../components/Toolbar/Toolbar";
import clientService from "../services/ClientService";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormInputText } from "../components/FormInputs/FormInputText";
import NewVehicleModal from "../components/NewVehicleModal/NewVehicleModal";
import AppointmentModal from "../components/AppointmentModal/AppointmentModal";
const validationSchema = Yup.object({
	firstName: Yup.string().required("Required field"),
	lastName: Yup.string().required("Required field"),
	phone: Yup.string().required("Required field"),
	email: Yup.string().email("Invalid e-mail"),
});
function Customer() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [vehicleSort, setVehicleSort] = useState({ sortBy: "make", direction: "asc" });
	const [vehicles, setVehicles] = useState([]);
	const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
	const [vehicleCurrentPage, setVehicleCurrentPage] = useState(1);
	const [vehiclePageSize, setVehiclePageSize] = useState(10);
	const [vehicleSearchQuery, setVehicleSearchQuery] = useState("");
	const [selectedVehicle, setSelectedVehicle] = useState();
	const [apptSort, setApptSort] = useState({ sortBy: "make", direction: "asc" });
	const [apptCurrentPage, setApptCurrentPage] = useState(1);
	const [apptPageSize, setApptPageSize] = useState(10);
	const [apptSearchQuery, setApptSearchQuery] = useState("");
	const [appointments, setAppointments] = useState([]);
	const [apptModalOpen, setApptModalOpen] = useState(true);
	const form = useForm({
		defaultValues: {
			clientId: id,
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
		},
	});
	const { handleSubmit, setValue, control, setError, clearErrors, getValues } = form;
	useEffect(() => {
		if (id) {
			clientService.get(id).then((result) => {
				const { firstName, lastName, phone, email } = result;
				setValue("firstName", firstName);
				setValue("lastName", lastName);
				setValue("phone", phone);
				setValue("email", email);
			});
		}
	}, []);
	const saveCustomer = async (data) => {
		try {
			validationSchema.validateSync(data, { abortEarly: false });
			clearErrors();
			let id = getValues("clientId");
			if (id) {
				clientService.update(id, data).then((r) => { });
			} else {
				clientService.add(data).then((r) => {
					setValue("clientId", r);
					navigate(`/customer/${r}`, { replace: true });
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
			<Table.ColumnHeader
				sortKey={"year"}
				title={"Vehicle"}
				sortable={true}
				onSort={handleVehicleSort}
				currentSortKey={vehicleSort.sortBy}
			/>
			<Table.ColumnHeader
				sortKey={"licensePlate"}
				title={"Plate"}
				sortable={true}
				onSort={handleVehicleSort}
				currentSortKey={vehicleSort.sortBy}
			/>
			<Table.ColumnHeader
				sortKey={"vin"}
				title={"VIN"}
				sortable={true}
				onSort={handleVehicleSort}
				currentSortKey={vehicleSort.sortBy}
			/>
		</tr>
	);
	const selectVehicleForAppt = (v) => {
		setSelectedVehicle({ vehicleId: v.vehicleId, make: v.make, model: v.model, licensePlate: v.licensePlate, year: v.year, vin: v.vin });
		setApptModalOpen(true);
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
	const handleVehicleSave = async (v) => {
		setVehicleModalOpen(false);
		setVehicleCurrentPage(1);
		let id = getValues('clientId');
		if (id) {
			const data = await clientService.searchVehicles(id, vehiclePageSize, vehicleCurrentPage, vehicleSort.sortBy, vehicleSort.direction, vehicleSearchQuery);
			setVehicles(data.items);
			return data;
		}
		setVehicleModalOpen(false);
	};
	const handleOpenVehicleModal = () => {
		setVehicleModalOpen(true);
	};
	const handleCloseVehicleModal = () => {
		setVehicleModalOpen(false);
	};
	const handleCloseApptModal = () => {
		setApptModalOpen(false);
	};
	const handleApptSave = async (v) => {
		setApptModalOpen(false);
		setApptCurrentPage(1);
		let id = getValues('clientId');
		if (id) {
			const data = await clientService.searchAppointment(id, vehiclePageSize, vehicleCurrentPage, vehicleSort.sortBy, vehicleSort.direction, vehicleSearchQuery);
			setAppointments(data.items);
			return data;
		}
		setVehicleModalOpen(false);
	};

	const apptHeaderTemplate = () => (
		<tr>
			<Table.ColumnHeader sortKey={'year'} title={'Vehicle'} sortable={true} onSort={handleApptSort} currentSortKey={apptSort.sortBy} />
			<Table.ColumnHeader sortKey={'status'} title={'Status'} sortable={true} onSort={handleApptSort} currentSortKey={apptSort.sortBy} align='center' />
			<Table.ColumnHeader sortKey={'appointmentDateTime'} title={'Date'} sortable={true} onSort={handleApptSort} currentSortKey={apptSort.sortBy} />
		</tr>
	);
	const apptRowTemplate = (rowData, index) => {
		const { id, year, status, make, model, licensePlate, appointmentDateTime } = rowData;
		let variant = 'default';
		switch (status) {
			case 'Pending': variant = 'warning'; break;
			case 'Completed': variant = 'success'; break;
			case 'In Progress': variant = 'default'; break;
			case 'Cancelled': variant = 'error'; break;
		}
		return (
			<tr key={id} className={index % 2 === 0 ? 'odd' : null}>
				<td>{`${year} ${make} ${model} ${licensePlate}`}</td>
				<td className='text-center'><Badge text={status} variant={variant} /></td>
				<td>{Moment(appointmentDateTime).format('MM/DD/YYYY hh:mm')}</td>
			</tr >
		);
	};
	const handleApptSort = async (sortBy, direction) => {
		setApptSort({ sortBy: sortBy, direction: direction });
		const data = await clientService.searchAppointment(id, apptPageSize, apptCurrentPage, sortBy, direction, apptSearchQuery);
		setAppointments(data.items);
	};
	const handleApptTableChange = async (
		sortBy,
		direction,
		currentPage,
		pageSize,
		searchQuery
	) => {
		setApptCurrentPage(currentPage);
		setApptPageSize(pageSize);
		setApptSearchQuery(searchQuery);
		let id = getValues('clientId');
		if (id) {
			const data = await clientService.searchAppointment(id, pageSize, currentPage, sortBy, direction, searchQuery);
			setAppointments(data.items);
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
								<Button variant="contained" className="w-100" type="submit">
									Save
								</Button>
							</div>
						</div>
						<div className="mt-3">
							<Title title="Vehicles">
								<Toolbar>
									<Toolbar.Button faIcon={faPlus} toolTipText="Add Vehicle" onClick={handleOpenVehicleModal}></Toolbar.Button>
								</Toolbar>
							</Title>
							<Table
								data={vehicles}
								rowTemplate={vehicleRowTemplate}
								headerTemplate={vehicleHeaderTemplate}
								onChange={handleVehicleTableChange}
								sortBy={vehicleSort.sortBy}
								direction={vehicleSort.direction}
							/>
						</div>
					</form>
				</div>
			</div>
			<div className="app-container-wrapper col-6 ">
				<div className="app-container">
					<Title title="Appointments">
					</Title>
					<Table
						data={appointments}
						rowTemplate={apptRowTemplate}
						headerTemplate={apptHeaderTemplate}
						onChange={handleApptTableChange}
						sortBy={apptSort.sortBy}
						direction={apptSort.direction}
					/>
				</div>
			</div>
			{id && <NewVehicleModal opened={vehicleModalOpen} onCancel={handleCloseVehicleModal} clientId={id} onSave={handleVehicleSave} />}
			{id && selectedVehicle && <AppointmentModal opened={apptModalOpen} onCancel={handleCloseApptModal} clientId={id} onSave={handleApptSave} vehicleDetails={selectedVehicle} />}
		</>
	);
}
export default Customer;
