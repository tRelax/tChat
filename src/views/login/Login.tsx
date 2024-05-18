import {Button} from 'primereact/button';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import FormInputText from "../../components/FormInputText";
import {Messages} from "primereact/messages";
import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {formDataProps} from "../../common/types";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {loginApi} from "./LoginService";
import useAuth from "../../context/Auth/AuthContext";
import {CustomToastContainer} from "../../components/ToastComponent";

const schema = Yup.object().shape({
    username: Yup.string().required("Required!"),
    password: Yup.string().required("Required!"),
});

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}}
        = useForm<formDataProps>({resolver: yupResolver(schema)});

    const messages = useRef<Messages>();

    const onSubmit = async (data: formDataProps) => {
        try {
            const response = await loginApi(data.username, data.password);

            console.log(response?.data);

            auth.setToken(response.data);

            toast.success('Login successful!', {
                autoClose: 2000,
                onClose: () => window.location.href = '/',
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
            <CustomToastContainer />
            <Messages ref={messages} />
            <p>Welcome {auth.authInfo.info?.username}</p>
            <div className="flex justify-content-center">
                <div className="card">
                    <h2 className="text-center">Login</h2>
                    <Messages ref={messages} />
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                           required register={register} />
                            <Button type="submit" label="Login" />
                        </div>
                    </form>
                    <p>Need an account?{" "}
                        <a className="cursor-pointer" style={{color: "blueviolet"}} onClick={() => {navigate('/register')}}>Register</a>
                    </p>
                </div>
            </div>
        </div>
    );

};

export default Login;
