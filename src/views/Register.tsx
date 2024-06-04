import {Button} from 'primereact/button';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import FormInputText from "../components/FormInputText";
import {Messages} from "primereact/messages";
import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {formDataProps} from "../common/types";
import {registerApi, RegisterResponse} from "../services/RegisterService";
import {AxiosError} from "axios";
import {CustomToastContainer} from "../components/ToastComponent";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/Register.css';
import useAuth from "../context/Auth/AuthContext";


interface RegisterSubmitForm extends formDataProps {
    confirmPassword?: string
}

const schema = Yup.object().shape({
    username: Yup.string().required("Required!"),
    password: Yup.string().min(8, "Password too short").max(32)
        .required("Required!")
        .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
        .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
        .matches(/^(?=.*\d)/, 'Must contain at least one number'),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match")
});

const Register = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}}
        = useForm<RegisterSubmitForm>({resolver: yupResolver(schema)});

    const messages = useRef<Messages>();

    if (auth.authInfo.authenticated) {
        console.log("already logged in!");
        navigate("/");
    }

    const onSubmit = async (data: RegisterSubmitForm) => {
        try {
            await registerApi(data.username, data.password);

            toast.success('Registration successful! Redirecting to login...', {
                autoClose: 2000, // Close toast after 2 seconds
                onClose: () => window.location.href = '/login', // Redirect on close
            });

        } catch (e) {
            handleRequestFailure(e);
        }
    }

    function handleRequestFailure(e: AxiosError) {
        const msg = e.response?.data;

        messages.current?.show({
            detail: msg || "error getting data",
            severity: 'error',
            sticky: true,
        });
    }

    return (
        <div className="form-demo">
            <Messages ref={messages}/>
            <div className="flex justify-content-center">
                <div className="card">
                    <h2 className="text-center">Register</h2>
                    <p className="text-center">Already have an account?{" "}
                        <a style={{textDecoration: "underline", color: "blueviolet"}} onClick={() => {
                            navigate('/login')
                        }}>Log in</a>
                    </p>
                    <Messages ref={messages}/>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className="mt-2 flex flex-column gap-4">
                            <FormInputText
                                name='username'
                                type={'text'}
                                placeholder={'username'}
                                label={'username'}
                                required
                                register={register}
                                errors={errors.username}
                            />
                            <FormInputText name='password' type={'password'} placeholder={'password'} label={'password'}
                                           required register={register} errors={errors.password}/>
                            <FormInputText name='confirmPassword' type={'password'} placeholder={'confirm password'}
                                           label={'confirm password'}
                                           required register={register} errors={errors.confirmPassword}/>
                            <Button type="submit" label="Register!"/>
                            <CustomToastContainer/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default Register;
