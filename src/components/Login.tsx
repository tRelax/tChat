import { Button } from "primereact/button";
import { useState } from "react";
import { FieldMetaState, Form } from 'react-final-form';
import { FormErrorDialog } from "./dialogs/FormErrorDialog";
import { FormSuccessDialog } from "./dialogs/FormSuccessDialog";
import { PasswordComponent } from "./form-components/PasswordComponent";
import { Username } from "./form-components/Username";
import { FormApi } from 'final-form';
import { formDataProps } from "../common/types";

export function Login() {
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const tempUser = {
        username : "trex",
        password : "pass"
    }

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

    const onSubmit = (data: formDataProps, form: FormApi<formDataProps,formDataProps>) => {
        
        if(data.username != tempUser.username || data.password != tempUser.password){
            setShowErrorMessage(true)
            return
        }
        //sendFormData(data);
        setShowSuccessMessage(true);

        form.restart();
    };

    const isFormFieldValid = (meta : FieldMetaState<any>) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta : FieldMetaState<any>) => {
        return isFormFieldValid(meta) ? <small className="p-error">{meta.error}</small> : undefined;
    };

    const dialogFooter = 
        <div className="flex justify-content-center">
            <Button label="OK" 
                    className="p-button-text" 
                    autoFocus 
                    onClick={() => {setShowSuccessMessage(false); setShowErrorMessage(false)} } />
        </div>;

    return (
        <div className="form-demo">
            <FormSuccessDialog 
                showMessage={showSuccessMessage}
                setShowMessage={setShowSuccessMessage}
                info={"Login Successful!"}
                dialogFooter={dialogFooter}

            />
            <FormErrorDialog 
                showMessage={showErrorMessage} 
                setShowMessage={setShowErrorMessage} 
                info={"Login failed!"}
                description={"Check your credentials!"}
                dialogFooter={dialogFooter}
            />

            <div className="flex justify-content-center">
                <div className="card">
                    <h2 className="text-center">Login</h2>
                    <Form 
                        onSubmit={onSubmit} 
                        initialValues={{ username: '', password: ''}} 
                        validate={validate} 
                        render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Username 
                                isFormFieldValid={isFormFieldValid} 
                                getFormErrorMessage={getFormErrorMessage}/>
                            <PasswordComponent
                                isFormFieldValid={isFormFieldValid} 
                                getFormErrorMessage={getFormErrorMessage} 
                            />
                            
                            <Button type="submit" label="Login" className="mr-1"/>
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}