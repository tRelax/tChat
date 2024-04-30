import { Password } from "primereact/password"
import { classNames } from "primereact/utils"
import { Field } from "react-final-form"
import { FormFieldProps } from "../../common/types"
import { ReactNode } from "react";

interface PasswordComponent extends FormFieldProps{
    header ?: ReactNode;
    footer ?: ReactNode;
}

export function PasswordComponent( props : PasswordComponent  ){
    const { isFormFieldValid, getFormErrorMessage, header, footer } = props

    return (
        <Field name="password" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <Password 
                        id="password" {...input} 
                        toggleMask 
                        feedback={false} 
                        className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                        header={header} 
                        footer={footer}/>
                    <label 
                        htmlFor="password" 
                        className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                </span>
                {getFormErrorMessage(meta)}
            </div>
        )} />
    )
}