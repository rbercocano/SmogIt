import React, { useState, useEffect } from 'react';
import { Button, Drawer, FormHelperText, Tooltip } from "@mui/material";
import serviceService from "../../services/ServiceService";
import clientService from "../../services/ClientService";
import statusService from "../../services/StatusService";
import appointmentService from "../../services/AppointmentService";
import { useForm } from "react-hook-form";
import { FormInputSelect } from "../FormInputs/FormInputSelect";
import * as Yup from "yup";
import { FormInputText } from '../FormInputs/FormInputText';
import './AppointmentModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Title from '../Title/Title';
import toast from 'react-hot-toast';
import { except } from '../../utils/arrayUtils';
import { CurrencyInput } from '../FormInputs/FormattedInputs';

function AppointmentModal({ onClose, onCancel, onSave, opened, appointmentDetails }) {
    const validationSchema = Yup.object({
        service: Yup.number().min(1, 'Select a Service')
    });
    const [show, setShow] = useState(false);
    const [services, setServices] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [removedServices, setRemovedServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [showServiceError, setShowServiceError] = useState(false);
    const form = useForm({
        defaultValues: {
            id: 0,
            vehicleId: appointmentDetails.vehicleId,
            vehicle: '',
            client: '',
            notes: '',
            service: 0,
            price: 0,
            statusId: 1,
        }
    });
    const { handleSubmit, setValue, control, setError, getValues, reset, clearErrors } = form;

    useEffect(() => {
        setShow(opened);
        if (opened) {
            reset();
            setShowServiceError(false);
            if (appointmentDetails.appointmentId) {
                setSelectedServices(appointmentDetails.services);
                setValue('notes', appointmentDetails.notes);
                setValue('statusId', appointmentDetails.statusId);
            }
            else {
                setSelectedServices([]);
                setValue('service', 0);
                setValue('statusId', 1);
            }
            setValue('vehicle', `${appointmentDetails.year} ${appointmentDetails.make} ${appointmentDetails.model}`);
            setValue('client', `${appointmentDetails.firstName} ${appointmentDetails.lastName}`);
            let p1 = serviceService.getAll();
            let p2 = statusService.getAll();
            Promise.all([p1, p2]).then(r => {
                let arr = (appointmentDetails.appointmentId ? except(r[0], appointmentDetails.services, 'serviceId') : r[0]).filter(s => s.active);
                setServices(arr);
                setStatuses(r[1]);
                setAllServices(r[0]);
            });
        }
    }, [opened]);
    const handleCancel = () => {
        setShow(false);
        onCancel();
    };
    const save = (data) => {
        if (selectedServices.length === 0) {
            setShowServiceError(true);
            return;
        }
        let req = { appointmentId: appointmentDetails.appointmentId, vehicleId: appointmentDetails.vehicleId, statusId: data.statusId, notes: data.notes };
        if (appointmentDetails.appointmentId) {
            req.servicesToAdd = selectedServices.filter(s => s.appointmentServiceId === null).map(s => { return { serviceId: s.serviceId, price: s.price } });
            req.servicesToRemove = [...removedServices];
            clientService.updateAppointment(req).then((id) => {
                setValue("id", id);
                clearErrors();
                setShowServiceError(false);
                if (onSave)
                    onSave({ ...req });
            });
            return;
        }
        req.services = selectedServices.map(s => { return { serviceId: s.serviceId, price: s.price } });
        clientService.addAppointment(req).then((id) => {
            setValue("id", id);
            clearErrors();
            setShowServiceError(false);
            if (onSave)
                onSave({ ...req, appointmentId: id });
        });
    };
    const handleSelect = (e) => {
        let service = services.filter(f => f.serviceId === e.target.value);
        if (service.length > 0)
            setValue('price', service[0].price.toFixed(2));
        else
            setValue('price', 0.00);
    };
    const addService = () => {
        try {
            let service = services.filter(f => f.serviceId === getValues('service'));
            let id = service.length > 0 ? service[0].serviceId : 0;
            validationSchema.validateSync({
                service: id
            }, { abortEarly: false });
            if (appointmentDetails.appointmentId)
                setSelectedServices([...selectedServices, { appointmentServiceId: null, serviceId: service[0].serviceId, serviceName: service[0].serviceName, notes: getValues('notes'), price: parseFloat(getValues('price') ?? 0), originalPrice: parseFloat(service[0].price) ?? 0 }])

            setServices(services.filter(f => f.serviceId !== service[0].serviceId && f.active));
            clearErrors();
            setShowServiceError(false);
            setValue('price', 0);
            setValue('service', 0);

        } catch (e) {
            e.inner.forEach((err) => {
                setError(err.path, {
                    type: "manual",
                    message: err.errors[0],
                });
            });
        }
    };
    const removeService = (service) => {
        if (appointmentDetails.appointmentId && service.appointmentServiceId)
            setRemovedServices([...removedServices, service.appointmentServiceId]);
        let serviceList = [...services, ...allServices.filter(a => a.serviceId === service.serviceId && a.active)].sort((a, b) => (a.serviceName > b.serviceName) ? 1 : ((b.serviceName > a.serviceName) ? -1 : 0));
        setServices(serviceList);
        setSelectedServices(selectedServices.filter(a => a.serviceId !== service.serviceId));

    };
    const reduce = (sp, s) => {
        return sp + s.price;
    }
    return (
        <Drawer
            anchor='right'
            open={opened}
            PaperProps={{ sx: { width: "28%" } }}
            onClose={onClose}>
            <div className='drawer-content'>
                <form autoComplete="off" onSubmit={handleSubmit(save)}>
                    <Title title={appointmentDetails.appointmentId ? 'Change Appointment' : 'New Appointment'}>
                    </Title>

                    <div className="row">
                        <div className="col-12 mb-2">
                            <FormInputText name={"client"} control={control} label={"Client"} disabled={true} />
                        </div>
                        <div className="col-12 mb-2">
                            <FormInputText name={"vehicle"} control={control} label={"Vehicle"} disabled={true} />
                        </div>
                        <div className="col-12 mb-2">
                            <FormInputSelect name={"statusId"} control={control} label={"Status"} onSelectItem={handleSelect} items={[...statuses.map((s) => { return { text: s.statusName, value: s.statusId } })]}
                            />
                        </div>
                        <div className="col-12 mb-3"><FormInputText name={"notes"} control={control} label={"Notes"} multiline={true} rows={3} />
                        </div>
                        <div className="col-12 mb-3">
                            <Title title='Services' />
                        </div>
                        <div className="col-12 mb-3">
                            <FormInputSelect name={"service"} control={control} label={"Service"} onSelectItem={handleSelect} items={[{ text: 'Select one', value: 0 }, ...services.map((s) => { return { text: s.serviceName, value: s.serviceId } })]} />
                        </div>
                        <div className="col-10 mb-2">
                            <CurrencyInput name={"price"} control={control} label={"Price"} />
                        </div>
                        <div className="col-2 mb-2">
                            <Button variant="contained" type="button" fullWidth onClick={addService} style={{ height: '40px', width: '40px', float: 'right' }}>
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </Button>
                        </div>
                        {showServiceError && <FormHelperText error>Select at least one service...</FormHelperText>}
                        <div className="col-12 mb-2">
                            {selectedServices.length > 0 &&
                                <table className='items'>
                                    <tbody>
                                        {
                                            selectedServices.map((s, idx) => {
                                                return (
                                                    <tr key={s.serviceId}>
                                                        <td>{s.serviceName}</td>
                                                        <td>{s.price !== s.originalPrice && <s>${s.originalPrice.toFixed(2)}</s>} ${s.price.toFixed(2)}</td>
                                                        <td>
                                                            <Tooltip title='Remove service'>
                                                                <FontAwesomeIcon icon={faTimesCircle} onClick={() => removeService(s)} />
                                                            </Tooltip>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td><b>Total Price</b></td>
                                            <td >
                                                <b>${selectedServices.reduce(reduce, 0).toFixed(2)}</b>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>}
                        </div>
                    </div>
                    <Button variant="contained" className="w-100 mb-1" type="submit">
                        Save
                    </Button>
                    <Button variant="contained" className="w-100" onClick={handleCancel} color="gray" >
                        Close
                    </Button>
                </form>
            </div>
        </Drawer>

    );
}
export default AppointmentModal;