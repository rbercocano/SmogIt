import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, FormHelperText } from '@mui/material';
import './Login.css';
import smog_img from '../../assets/smog_img.png';
import { FormInputText } from '../../components/FormInputs/FormInputText';
import * as Yup from "yup";
import userService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';


function Login() {
    const navigate = useNavigate();
    const { createToken } = useContext(UserContext);
    const [errors, setErrors] = useState([]);
    const validationSchema = Yup.object({
        login: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    });
    const form = useForm({
        defaultValues: {
            login: '',
            password: ''
        }
    });
    const { handleSubmit, control, setError } = form;
    const login = (data) => {
        try {
            setErrors([]);
            validationSchema.validateSync(data, { abortEarly: false });
            userService.authenticate(data.login, data.password).then(r => {
                if (Array.isArray(r)) {
                    setErrors(r);
                }
                else {
                    createToken(r);
                    navigate(`/appointments`);
                }
            });
        } catch (e) {
            e.inner.forEach((err) => {
                setError(err.path, {
                    type: "manual",
                    message: err.errors[0],
                });
            });
        }
        console.log(control);
        console.log(`Login clicked with username: ${data.login} and password: ${data.password}`);
    };

    return (
        <div className='login-page'>
            <div className="login-container">
                <div className="login-box">
                    <img src={smog_img} style={{ width: '80px' }}></img>
                    <h2>Gold River Smog</h2>
                    <form autoComplete="off" onSubmit={handleSubmit(login)}>
                        <div className="row">
                            <div className="col-12 mb-2">
                                <FormInputText name={"login"} control={control} label={"Login"} />
                            </div>
                            <div className="col-12 mb-2">
                                <FormInputText name={"password"} control={control} label={"Password"} type='password' />
                            </div>
                            {errors.length > 0 &&
                                <div className="col-12 mb-2">
                                    {errors.map(e => <FormHelperText error className='text-center'>
                                        {e.message}
                                    </FormHelperText>)}
                                </div>
                            }
                        </div>

                        <Button variant="contained" className="w-100 mb-1" type="submit">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
