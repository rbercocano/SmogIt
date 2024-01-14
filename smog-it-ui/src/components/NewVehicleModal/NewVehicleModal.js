import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "@mui/material/Button";
import clientService from "../../services/ClientService";
import VehicleService from "../../services/VehicleService";
import { useForm } from "react-hook-form";
import { FormInputText } from "../FormInputs/FormInputText";
import { FormInputSelect } from "../FormInputs/FormInputSelect";
import * as Yup from "yup";
import vehicleService from '../../services/VehicleService';
NewVehicleModal.defaultProps = {
    opened: false,
    onCancel: () => { },
    onSave: () => { }
};
function NewVehicleModal({ clientId, opened, onCancel, onSave }) {
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
            id: '',
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
            form.reset();
            setMakes([{ value: 0, text: 'Select one' }]);
            setModels([{ value: 0, text: 'Select one' }]);
            vehicleService.getAllMakes().then((r) => {
                let m = r.map(v => {
                    return { value: v.makeId, text: v.make }
                });
                setMakes([...makes, ...m]);
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
            clientService.addVehicle(req).then((r) => {
                setValue("vehicleId", r);
                if (onSave)
                    onSave({ ...req, vehicleId: r });
            });

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
            form.setValue('model', 0);
            setModels([...models, ...m]);
        });
    }
    return (
        <Modal show={show} onHide={handleCancel} size="lg">
            <form autoComplete="off" onSubmit={handleSubmit(save)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add a New Vehicle
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <FormInputSelect name={"make"}
                                control={control}
                                label={"Make"}
                                items={makes}
                                onSelectItem={handleMakeChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <FormInputSelect name={"model"}
                                control={control}
                                label={"Model"}
                                items={models}
                            />
                        </div>
                        <div className="col-3 mb-3">
                            <FormInputText
                                name={"year"}
                                control={control}
                                label={"Year"}
                            />
                        </div>
                        <div className="col-3 mb-3">
                            <FormInputText
                                name={"licensePlate"}
                                control={control}
                                label={"License Plate"}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <FormInputText
                                name={"vin"}
                                control={control}
                                label={"VIN"}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={handleCancel} color="error">
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>

    );
}
export default NewVehicleModal;