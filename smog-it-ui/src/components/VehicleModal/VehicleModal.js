import React, { useState, useEffect } from 'react';
import clientService from "../../services/ClientService";
import { useForm } from "react-hook-form";
import { FormInputText } from "../FormInputs/FormInputText";
import { FormInputSelect } from "../FormInputs/FormInputSelect";
import * as Yup from "yup";
import vehicleService from '../../services/VehicleService';
import { Button, Drawer } from '@mui/material';
import Title from '../Title/Title';
VehicleModal.defaultProps = {
    opened: false,
    onCancel: () => { },
    onSave: () => { }
};
function VehicleModal({ clientId, opened, onCancel, onSave, vehicleDetails }) {
    const validationSchema = Yup.object({
        make: Yup.number().min(1, 'Select a Make'),
        model: Yup.number().min(1, 'Select a Model'),
        year: Yup.string().test('year', 'Must be between 1923 and the current year', (year) => {
            if (year && (year < 1923 || year > new Date().getFullYear()))
                return false;
            return true;
        })
    });
    const [show, setShow] = useState(false);
    const [makes, setMakes] = useState([{ value: 0, text: 'Select one' }]);
    const [models, setModels] = useState([{ value: 0, text: 'Select one' }]);
    const form = useForm({
        defaultValues: {
            id: vehicleDetails?.vehicleId,
            clientId: clientId,
            make: 0,
            model: 0,
            licensePlate: '',
            year: '',
            vin: ''
        },
    });
    const { handleSubmit, setValue, control, setError, clearErrors, getValues, reset } = form;

    useEffect(() => {
        setShow(opened);
        if (opened) {
            reset();
            setMakes([{ value: 0, text: 'Select one' }]);
            setModels([{ value: 0, text: 'Select one' }]);
            vehicleService.getAllMakes().then((r) => {
                let m = r.map(v => {
                    return { value: v.makeId, text: v.make }
                });
                setMakes([...makes, ...m]);
                if (vehicleDetails) {
                    setValue('make', vehicleDetails.makeId);
                    setValue('vin', vehicleDetails.vin);
                    setValue('year', vehicleDetails.year);
                    setValue('licensePlate', vehicleDetails.licensePlate);
                    vehicleService.getAllModels(vehicleDetails.makeId).then((r) => {
                        let m = (r ?? []).map(v => {
                            return { value: v.modelId, text: v.model }
                        });
                        setModels([...models, ...m]);
                        setValue('model', vehicleDetails.modelId);
                    });
                }
            });
        }
    }, [opened]);
    const handleCancel = () => {
        setShow(false);
        onCancel();
    };
    const save = (data) => {
        try {
            validationSchema.validateSync(data, { abortEarly: false });
            clearErrors();
            let req = { clientId: data.clientId, modelId: data.model, licensePlate: data.licensePlate, vIN: data.vin, year: data.year };
            if (vehicleDetails?.vehicleId) {
                req.vehicleId = vehicleDetails.vehicleId;
                clientService.updateVehicle(req).then((r) => {
                    setValue("vehicleId", r);
                    if (onSave)
                        onSave({ ...req, vehicleId: vehicleDetails.vehicleId });
                });
            } else {

                clientService.addVehicle(req).then((r) => {
                    setValue("vehicleId", r);
                    if (onSave)
                        onSave({ ...req, vehicleId: r });
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
    const handleMakeChange = (e) => {
        let id = e.target.value;
        if (!id) return;
        vehicleService.getAllModels(e.target.value).then((r) => {
            let m = (r ?? []).map(v => {
                return { value: v.modelId, text: v.model }
            });
            setValue('model', 0);
            setModels([...models, ...m]);
        });
    };

    return (
        <Drawer
            anchor='right'
            open={show}
            PaperProps={{ sx: { width: "28%" } }}
            onClose={onCancel}>
            <div className='drawer-content'>
                <form autoComplete="off" onSubmit={handleSubmit(save)}>
                    <Title title={vehicleDetails ? `${vehicleDetails?.year} ${vehicleDetails?.make} ${vehicleDetails?.model}` : 'New Vehicle'}>
                    </Title>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <FormInputSelect name={"make"}
                                control={control}
                                label={"Make"}
                                items={makes}
                                onSelectItem={handleMakeChange}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <FormInputSelect name={"model"}
                                control={control}
                                label={"Model"}
                                items={models}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <FormInputText
                                name={"vin"}
                                control={control}
                                label={"VIN"}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <FormInputText
                                name={"year"}
                                control={control}
                                label={"Year"}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <FormInputText
                                name={"licensePlate"}
                                control={control}
                                label={"License Plate"}
                            />
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
export default VehicleModal;