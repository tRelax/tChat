import {Button} from "primereact/button";
import {Divider} from 'primereact/divider';
import React, {useContext, useState} from "react";
import {FieldMetaState, Form} from 'react-final-form';

import '../../assets/Register.css';
import {FormSuccessDialog} from "../../components/dialogs/FormSuccessDialog";
import {PasswordComponent} from "../../components/form-components/PasswordComponent";
import {Username} from "../../components/form-components/Username";
import {useNavigate} from "react-router-dom";
import {FormApi} from 'final-form';
import {formDataProps} from "../../common/types";
import {AuthContext} from "../../context/AuthContext";

export function Register() {

    const { registerInfo, updateRegisterInfo } = useContext(AuthContext);

    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);

    const validate = (data : formDataProps) => {
        let errors : {username?: string; password?: string;} = {};

        if (!data.username) {
            errors.username = 'Username is required.';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        return errors;
    };

    const onSubmit = (data: formDataProps, form: FormApi<formDataProps, formDataProps>) => {
        //sendFormData(data);
        setShowMessage(true);

        form.restart();
        navigate('/login');
    };

    const isFormFieldValid = (meta : FieldMetaState<any>) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta : FieldMetaState<any>) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );  

    return (
        <div className="form-demo">
            <FormSuccessDialog 
                showMessage={showMessage} 
                setShowMessage={setShowMessage} 
                info={"Registration Successful!"}
                dialogFooter={dialogFooter}
            />

            <div className="flex justify-content-center">
                <div className="card">
                    <h2 className="text-center">Register</h2>
                    <p className="text-center">Already have an account?{" "}
                        <a style={{textDecoration: "underline", color:"blueviolet"}} onClick={() => {navigate('/login')}}>Log in</a>
                    </p>
                    <Form
                        onSubmit={onSubmit}
                        initialValues={{ username: '', password: ''}}
                        validate={validate}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="p-fluid">
                                <Username
                                    isFormFieldValid={isFormFieldValid}
                                    getFormErrorMessage={getFormErrorMessage}
                                    onChange={(e) => updateRegisterInfo({...registerInfo, username: e.target.value})}
                                />
                                <PasswordComponent
                                    isFormFieldValid={isFormFieldValid}
                                    getFormErrorMessage={getFormErrorMessage}
                                    header={passwordHeader}
                                    footer={passwordFooter}
                                />
                                <div className="button-container mt-2">
                                    <Button type="submit" label="Register!" className="ml-1" />
                                </div>
                            </form>
                    )} />
                </div>
            </div>
        </div>
    );
}