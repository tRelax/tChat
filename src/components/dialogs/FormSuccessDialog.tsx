import { Dialog } from "primereact/dialog";
import { FormStateDialog } from "../../common/types";

export function FormSuccessDialog ( props : FormStateDialog) {
    const {showMessage, setShowMessage, info, dialogFooter} = props
    return (
        <Dialog 
                visible={showMessage} 
                onHide={() => setShowMessage(false)} 
                position="top" footer={dialogFooter} 
                showHeader={true}
                breakpoints={{ '960px': '80vw' }} 
                style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>{info}</h5>
                </div>
            </Dialog>
    )
}