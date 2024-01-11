import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { FormInputText } from "../FormInputs/FormInputText";
import { Form } from 'react-bootstrap';
NewVehicleModal.defaultProps = {
    opened: false,
    onCancel: () => { },
    onSave: (vehicle) => { }
};
function NewVehicleModal({ opened, onCancel, onSave }) {

    const [show, setShow] = useState(false);
    const [vehicle, setVehicle] = useState({});
    const [vehicleValidationErrors, setVehicleValidationErrors] = useState({ make: '', model: '', email: '', phone: '' });

    useEffect(() => {
        setShow(opened);
    }, [opened]);
    const handleCancel = () => {
        setShow(false);
        onCancel();
    }
    const handleSave = () => {
        if (onSave)
            onSave(vehicle);
    }
    const handleVehicleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({
            ...vehicle,
            [name]: value,
        });
    };
    return (
        <Modal show={show} onHide={handleCancel} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Add a New Vehicle
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="make">
                            <Form.Label>Make</Form.Label>
                            <Form.Control
                                type="text"
                                name="make"
                                value={vehicle.make}
                                placeholder="Enter the vehicle Make"
                                maxLength={50}
                                onChange={handleVehicleChange}
                                isInvalid={!!vehicleValidationErrors.make} />
                            <Form.Control.Feedback type="invalid">
                                {vehicleValidationErrors.make}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="model">
                            <Form.Label>Make</Form.Label>
                            <Form.Control
                                type="text"
                                name="model"
                                value={vehicle.model}
                                placeholder="Enter the vehicle Model"
                                maxLength={50}
                                onChange={handleVehicleChange}
                                isInvalid={!!vehicleValidationErrors.model} />
                            <Form.Control.Feedback type="invalid">
                                {vehicleValidationErrors.model}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div className="col-12">
                        <Form.Group className="mb-3" controlId="plate">
                            <Form.Label>Make</Form.Label>
                            <Form.Control
                                type="text"
                                name="plate"
                                value={vehicle.plate}
                                placeholder="Enter the vehicle Plate"
                                maxLength={50}
                                onChange={handleVehicleChange}
                                isInvalid={!!vehicleValidationErrors.plate} />
                            <Form.Control.Feedback type="invalid">
                                {vehicleValidationErrors.plate}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
export default NewVehicleModal;