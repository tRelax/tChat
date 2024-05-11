import {Button} from 'primereact/button';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import FormInputText from "../../components/FormInputText";
import {Messages} from "primereact/messages";
import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {formDataProps} from "../../common/types";

const schema = Yup.object().shape({
    username: Yup.string().required("Required!"),
    password: Yup.string().required("Required!"),
});

const Login2 = () => {
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}}
        = useForm<formDataProps>({resolver: yupResolver(schema)});

    const messages = useRef<Messages>();

    const onSubmit = (data: formDataProps) => {
        //messages.current.clear();
        console.log(data)
    }

    return (
        <div className="form-demo">
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

export default Login2;
