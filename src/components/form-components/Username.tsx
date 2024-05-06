import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Field } from "react-final-form";
import { FormFieldProps } from "../../common/types";

export function Username( props: FormFieldProps ){
    const { isFormFieldValid, getFormErrorMessage } = props
    return (
        <Field name="username" render={({ input, meta }) => (
            <div className="field">
                <span className="p-float-label">
                    <InputText 
                        id="username" {...input} 
                        //autoFocus
                        autoComplete="off"
                        className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                    <label 
                        htmlFor="username" 
                        className={classNames({ 'p-error': isFormFieldValid(meta) })}>Username*</label>
                </span>
                {getFormErrorMessage(meta)}
            </div>
        )}
    />);
}