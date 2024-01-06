import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
ConfirmationModal.defaultProps = {
    text: '',
    header: 'Confirm delete',
    params: {},
    opened: false,
    onClose: (params) => { },
    onOk: (params) => { }
};
function ConfirmationModal({ text, header, params, opened, onClose, onOk }) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(opened);
    }, [opened, params]);
    const handleClose = () => {
        setShow(false);
        onClose(params);
    }
    const handleOk = () => {
        if (onOk)
            onOk(params);
    }
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {text}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={handleOk}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
export default ConfirmationModal;