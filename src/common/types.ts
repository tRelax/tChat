import { Dispatch, ReactNode, SetStateAction } from "react";
import { FieldMetaState } from "react-final-form";

export interface FormFieldProps{
    isFormFieldValid : (meta: FieldMetaState<any>) => boolean;
    getFormErrorMessage : (meta: FieldMetaState<any>) => ReactNode | undefined;
}

export interface FormStateDialog{
    showMessage: boolean;
    setShowMessage: Dispatch<SetStateAction<boolean>>;
    info: string;
    dialogFooter: ReactNode;
}

export interface formDataProps {
    username: string; 
    password: string;
}

