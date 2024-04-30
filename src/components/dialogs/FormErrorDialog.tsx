import { Dialog } from "primereact/dialog";
import { FormStateDialog } from "../../common/types";

interface FormErrorDialog extends FormStateDialog{
    description: string;
}

export function FormErrorDialog ( props: FormErrorDialog ) {
    const {showMessage, setShowMessage, info, dialogFooter, description} = props
    return (
    <Dialog 
        visible={showMessage} 
        onHide={() => setShowMessage(false)} 
        position="top" footer={dialogFooter} 
        showHeader={false} 
        breakpoints={{ '960px': '80vw' }} 
        style={{ width: '30vw' }}>
        <div className="flex align-items-center flex-column pt-6 px-3">
            <i className="pi pi-times-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
            <h5>{info}</h5>
            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                {description}
            </p>
        </div>
    </Dialog>
    )
}