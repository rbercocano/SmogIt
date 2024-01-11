import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "@mui/material/Button";
import clientService from "../../services/ClientService";
import { useForm } from "react-hook-form";
import { FormInputText } from "../FormInputs/FormInputText";
import * as Yup from "yup";
NewVehicleModal.defaultProps = {
    opened: false,
    onCancel: () => { },
    onSave: () => { }
};
function NewVehicleModal({ clientId, opened, onCancel, onSave }) {
    const validationSchema = Yup.object({
        make: Yup.string().required("Required field"),
        model: Yup.string().required("Required field")
    });
    const [show, setShow] = useState(false);
    const form = useForm({
        defaultValues: {
            id: '',
            clientId: clientId,
            make: "",
            model: "",
            licensePlate: ""
        },
    });
    const { handleSubmit, setValue, control, setError, clearErrors, getValues } = form;

    useEffect(() => {
        setShow(opened);
    }, [opened]);
    const handleCancel = () => {
        setShow(false);
        onCancel();
    }
    const save = (data) => {
        try {
            validationSchema.validateSync(data, { abortEarly: false });
            clearErrors();
            clientService.addVehicle(data).then((r) => {
                setValue("vehicleId", r);
                if (onSave)
                    onSave({ ...data, vehicleId: r });
            });

        } catch (e) {
            e.inner.forEach((err) => {
                setError(err.path, {
                    type: "manual",
                    message: err.errors[0],
                });
            });
        }
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
                            <FormInputText
                                name={"make"}
                                control={control}
                                label={"Make"}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <FormInputText
                                name={"model"}
                                control={control}
                                label={"Model"}
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