import './Users.css';
import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import Badge from "../../components/Badge/Badge";
import Table from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Button, Drawer, Tooltip } from '@mui/material';
import toast from 'react-hot-toast';
import userService from '../../services/UserService';
import { FormInputCheckbox } from "../../components/FormInputs/FormInputCheckbox";
import { FormInputText } from "../../components/FormInputs/FormInputText";
import * as Yup from "yup";

const validationSchema = Yup.object({
    firstName: Yup.string().required("Required field"),
    email: Yup.string().required("Required field"),
    login: Yup.string().required("Required field"),
    password: Yup.string().when('id', {
        is: (id) => id === null,
        then: (schema) => schema.required("Required field")
    }),
    passwordConfirmation: Yup.string().when('id', {
        is: (id) => id === null,
        then: (schema) => schema.oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
});

function Users() {
    const ACTIONS = {
        USERS_LOADED: 'USERS_LOADED',
        USERS_SAVED: 'USERS_SAVED',
        USERS_SELECTED: 'USERS_SELECTED',
        TABLE_CHANGED: 'TABLE_CHANGED',
        TOGGLE_DRAWER: 'TOGGLE_DRAWER'
    };
    const initialState = {
        sort: { sortBy: 'firstName', direction: 'asc' },
        users: [],
        selectedUser: null,
        openDrawer: false,
        searchQuery: null,
        currentPage: 1,
        pageSize: 10
    };
    const form = useForm({ defaultValues: { id: null, firstName: "", lastName: "", active: "", email: "", login: "", password: "", passwordConfirmation: "" } });
    const { handleSubmit, setValue, control, setError, clearErrors, getValues, reset } = form;
    useEffect(() => {
        userService.search(state.pageSize, 1, state.sort.sortBy, state.sort.direction, state.searchQuery).then(data =>
            dispatch({ type: ACTIONS.USERS_LOADED, payload: { users: data } }));

    }, []);
    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.USERS_SELECTED:
                return { ...state, selectedUser: action.payload, openDrawer: true };
            case ACTIONS.USERS_LOADED:
            case ACTIONS.TABLE_CHANGED:
                return { ...state, ...action.payload };
            case ACTIONS.USERS_SAVED:
                return { ...state, openDrawer: false, currentPage: 1 };
            case ACTIONS.TOGGLE_DRAWER:
                return { ...state, openDrawer: !state.openDrawer };
            default: return state;
        }
    };
    const selectUser = (rowData) => {
        reset();
        setValue('id', rowData.userId);
        setValue('firstName', rowData.firstName);
        setValue('lastName', rowData.lastName ?? '');
        setValue('active', rowData.active);
        setValue('email', rowData.email);
        setValue('login', rowData.login);
        dispatch({ type: ACTIONS.USERS_SELECTED, payload: rowData });
    };
    const handleSort = async (sortBy, direction) => {
        dispatch({ type: ACTIONS.TABLE_CHANGED, payload: { sort: { sortBy, direction } } });
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    const headerTemplate = () => (
        <tr>
            <Table.ColumnHeader sortKey={'firstName'} title={'Name'} sortable={true} currentSortKey={state.sort.sortBy} onSort={handleSort} />
            <Table.ColumnHeader sortKey={'login'} title={'Login'} sortable={true} currentSortKey={state.sort.sortBy} onSort={handleSort} />
            <Table.ColumnHeader sortKey={'email'} title={'Email'} sortable={true} currentSortKey={state.sort.sortBy} onSort={handleSort} />
            <Table.ColumnHeader sortKey={'active'} title={'Status'} sortable={true} currentSortKey={state.sort.sortBy} align='center' onSort={handleSort} />
            <Table.ColumnHeader sortable={false} />
        </tr>
    );
    const rowTemplate = (rowData, index) => {
        const { userId, active, firstName, lastName, email, login } = rowData;
        let variant = active ? 'success' : 'error';
        let status = active ? 'Active' : 'Inactive';
        return (
            <React.Fragment key={userId}>
                <tr className={index % 2 === 0 ? 'odd' : ''}>
                    <td>{firstName} {lastName}</td>
                    <td>{login}</td>
                    <td>{email}</td>
                    <td className='text-center'><Badge text={status} variant={variant} /></td>
                    <td width={30}>
                        <Tooltip title='Edit' placement="right-start">
                            <Button variant="contained" className='table-btn' onClick={() => selectUser(rowData)} >
                                <FontAwesomeIcon icon={faPencil} />
                            </Button>
                        </Tooltip>
                    </td>
                </tr>
            </React.Fragment >
        );
    };

    const handleTableChange = async (sortBy, direction, currentPage, pageSize, searchQuery) => {
        const data = await userService.search(pageSize, currentPage, sortBy, direction, searchQuery);
        dispatch({ type: ACTIONS.USERS_LOADED, payload: { currentPage: currentPage, pageSize: pageSize, searchQuery: searchQuery, users: data } });
        return data;
    };
    const handleSave = async (formData) => {
        try {
            validationSchema.validateSync(formData, { abortEarly: false });
            clearErrors();
            toast.success('User saved');
            if (state.selectedUser.userId)
                await userService.update(state.selectedUser.userId, formData);
            else
                await userService.add(formData);
            dispatch({ type: ACTIONS.USERS_SAVED });
            const data = await userService.search(state.pageSize, 1, state.sort.sortBy, state.sort.direction, state.searchQuery);
            dispatch({ type: ACTIONS.USERS_LOADED, payload: { users: data } });
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
        dispatch({ type: ACTIONS.USERS_SELECTED, payload: {} });
    };
    const toggleDrawer = () => {
        dispatch({ type: ACTIONS.TOGGLE_DRAWER });
    };
    return (
        <>
            <div className={state.openDrawer ? 'app-container-wrapper col-8' : 'app-container-wrapper col-12'}>
                <div className="app-container " >
                    <Title title="Users" >
                        <div className='mt-2 mb-2' style={{ justifyContent: 'flex-end', display: 'flex' }}>
                            <Button variant="contained" onClick={addNew}>Add New</Button>
                        </div>
                    </Title>
                    <Table data={state.users} rowTemplate={rowTemplate} headerTemplate={headerTemplate} onChange={handleTableChange}
                        serverSide={true} sortBy={state.sort.sortBy} direction={state.sort.direction} />
                </div>
            </div>
            <Drawer
                anchor='right'
                open={state.openDrawer}
                PaperProps={{ sx: { width: "28%" } }}
                onClose={toggleDrawer}>
                <div className='drawer-content'>
                    <form autoComplete="off" onSubmit={handleSubmit(handleSave)}>
                        <Title title={state.selectedUser?.userId ? `${state.selectedUser.firstName} ${state.selectedUser.lastName}` : 'New User'}>
                        </Title>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <FormInputText name={"login"} control={control} label={"Login"} />
                            </div>
                            {!state.selectedUser?.userId &&
                                <>
                                    <div className="col-6 mb-3">
                                        <FormInputText name={"password"} control={control} label={"Password"} type='password' />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <FormInputText name={"passwordConfirmation"} control={control} label={"Password Confirmation"} type='password'/>
                                    </div>
                                </>
                            }
                            <div className="col-12 mb-3">
                                <FormInputText name={"firstName"} control={control} label={"First Name"} />
                            </div>
                            <div className="col-12 mb-3">
                                <FormInputText name={"lastName"} control={control} label={"Last Name"} />
                            </div>
                            <div className="col-9 mb-3">
                                <FormInputText name={"email"} control={control} label={"Email"} />
                            </div>
                            <div className="col-3 mb-3 text-center">
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
export default Users;