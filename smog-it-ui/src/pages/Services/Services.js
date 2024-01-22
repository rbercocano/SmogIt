import './Services.css';
import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import Badge from "../../components/Badge/Badge";
import Table from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Drawer, Tooltip } from '@mui/material';
import toast from 'react-hot-toast';
import serviceService from '../../services/ServiceService';
import { FormInputCheckbox } from "../../components/FormInputs/FormInputCheckbox";
import { FormInputText } from "../../components/FormInputs/FormInputText";
import { CurrencyInput } from '../../components/FormInputs/FormattedInputs';
import * as Yup from "yup";

const validationSchema = Yup.object({
    serviceName: Yup.string().required("Required field"),    
    price: Yup.string().required("Required field")
});

function Services() {
    const ACTIONS = {
        SERVICES_LOADED: 'SERVICES_LOADED',
        SERVICES_SAVED: 'SERVICES_SAVED',
        SERVICES_SELECTED: 'SERVICES_SELECTED',
        TABLE_CHANGED: 'TABLE_CHANGED',
        TOGGLE_DRAWER: 'TOGGLE_DRAWER'
    };
    const initialState = {
        serviceSort: { sortBy: 'serviceName', direction: 'asc' },
        services: [],
        selectedService: null,
        openDrawer: false
    };
    const form = useForm({ defaultValues: { serviceName: "", description: "", active: "", price: "" } });
    const { handleSubmit, setValue, control, setError, clearErrors, getValues, reset } = form;
    useEffect(() => {

        serviceService.getAll().then(data =>
            dispatch({ type: ACTIONS.SERVICES_LOADED, payload: { services: data } }));

    }, []);
    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.SERVICES_SELECTED:
                return { ...state, selectedService: action.payload, openDrawer: true };
            case ACTIONS.SERVICES_LOADED:
            case ACTIONS.TABLE_CHANGED:
                return { ...state, ...action.payload };
            case ACTIONS.SERVICES_SAVED:
                return { ...state, openDrawer: false, apptCurrentPage: 1 };
            case ACTIONS.TOGGLE_DRAWER:
                return { ...state, openDrawer: !state.openDrawer };
            default: return state;
        }
    };
    const selectService = (rowData) => {
        setValue('serviceName', rowData.serviceName);
        setValue('description', rowData.description ?? '');
        setValue('active', rowData.active);
        setValue('price', rowData.price.toFixed(2));
        dispatch({ type: ACTIONS.SERVICES_SELECTED, payload: rowData });
    };
    const handleSort = async (sortBy, direction) => {
        dispatch({ type: ACTIONS.TABLE_CHANGED, payload: { serviceSort: { sortBy, direction } } });
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const headerTemplate = () => (
        <tr>
            <Table.ColumnHeader sortKey={'serviceName'} title={'Service'} sortable={true} currentSortKey={state.serviceSort.sortBy} onSort={handleSort} />
            <Table.ColumnHeader sortKey={'description'} title={'Description'} sortable={true} currentSortKey={state.serviceSort.sortBy} onSort={handleSort} />
            <Table.ColumnHeader sortKey={'active'} title={'Status'} sortable={true} currentSortKey={state.serviceSort.sortBy} align='center' onSort={handleSort} />
            <Table.ColumnHeader sortKey={'price'} title={'Price'} sortable={true} currentSortKey={state.serviceSort.sortBy} align='right' onSort={handleSort} />
            <Table.ColumnHeader sortable={false} />
        </tr>
    );
    const rowTemplate = (rowData, index) => {
        const { serviceId, active, description, serviceName, price } = rowData;
        let variant = active ? 'success' : 'error';
        let status = active ? 'Active' : 'Inactive';
        return (
            <React.Fragment key={serviceId}>
                <tr className={index % 2 === 0 ? 'odd' : ''}>
                    <td>{serviceName}</td>
                    <td>{description}</td>
                    <td className='text-center'><Badge text={status} variant={variant} /></td>
                    <td className='text-right'>$ {price.toFixed(2)}</td>
                    <td width={30}>
                        <Tooltip title='Edit' placement="right-start">
                            <Button variant="contained" className='table-btn' onClick={() => selectService(rowData)} >
                                <FontAwesomeIcon icon={faPencil} />
                            </Button>
                        </Tooltip>
                    </td>
                </tr>
            </React.Fragment >
        );
    };
    const handleSave = async (formData) => {
        try {
            validationSchema.validateSync(formData, { abortEarly: false });
            clearErrors();
            toast.success('Service saved');
            if (state.selectedService.serviceId)
                await serviceService.update(state.selectedService.serviceId, formData);
            else
                await serviceService.add(formData);
            dispatch({ type: ACTIONS.SERVICES_SAVED });
            const data = await serviceService.getAll();
            dispatch({ type: ACTIONS.SERVICES_LOADED, payload: { services: data } });
            return data;
        } catch (e) {
            e.inner.forEach((err) => {
                setError(err.path, {
                    type: "manual",
                    message: err.errors[0],
                });
            });
        }
    };
    const addNew = () => {
        reset();
        setValue('active', false);
        dispatch({ type: ACTIONS.SERVICES_SELECTED, payload: {} });
    };
    const toggleDrawer = () => {
        dispatch({ type: ACTIONS.TOGGLE_DRAWER });
    };
    return (
        <>
            <div className={state.openDrawer ? 'app-container-wrapper col-8' : 'app-container-wrapper col-12'}>
                <div className="app-container " >
                    <Title title="Services" >
                        <div className='mt-2 mb-2' style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            <Button variant="contained" onClick={addNew}>Add New</Button>
                        </div>
                    </Title>
                    <Table data={state.services} rowTemplate={rowTemplate} headerTemplate={headerTemplate}
                        serverSide={false} sortBy={state.serviceSort.sortBy} direction={state.serviceSort.direction} />
                </div>
            </div>
            <Drawer
                anchor='right'
                open={state.openDrawer}
                PaperProps={{ sx: { width: "28%" } }}
                onClose={toggleDrawer}>
                <div className='drawer-content'>
                    <form autoComplete="off" onSubmit={handleSubmit(handleSave)}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <FormInputText name={"serviceName"} control={control} label={"Service Name"} />
                            </div>
                            <div className="col-12 mb-3">
                                <FormInputText name={"description"} control={control} label={"Description"} rows={4} multiline={true} />
                            </div>
                            <div className="col-6 mb-3">
                                <CurrencyInput name={"price"} control={control} label={"Price"} />
                            </div>
                            <div className="col-6 mb-3 text-center">
                                <FormInputCheckbox label="Active" name={"active"} control={control} />
                            </div>
                            <div className="col-12 mb-3">
                                <Button variant="contained" className="w-100 mb-1" type="submit">Save</Button>
                                <Button variant="contained" className="w-100" type="button" color="gray" onClick={toggleDrawer}>Close</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Drawer>
        </>);
}
export default Services;