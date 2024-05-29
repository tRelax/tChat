import React from "react";
import {Dialog} from "primereact/dialog";
import {useNavigate} from "react-router-dom";
import {Avatar} from "primereact/avatar";
import {toast} from "react-toastify";
import useChat from "../../context/Chat/ChatConext";
import useAuth from "../../context/Auth/AuthContext";
import {MenuItemCommandEvent} from "primereact/menuitem";

export type ChatDialogProps = {
    userId: string,
    visible: boolean,
    setVisible: (option: boolean) => void
}

const SettingsDialog = (props: ChatDialogProps) => {

    const {updateCurrentChat} = useChat();
    const auth = useAuth();
    const navigate = useNavigate();

    const navigateToUrl = (e: MenuItemCommandEvent, url: string) => {
        e?.originalEvent?.preventDefault();
        navigate(url);
    };
    const logOut = () => {
        toast.success('Logged out successfully!', {
            autoClose: 2000,
            onClose: (e) => navigateToUrl(e, '/login'),
        });
        updateCurrentChat(undefined);
        auth.setToken(undefined);
    };

    const closeDialog = () => {
        props.setVisible(false);
    }

    return (
        <Dialog
            draggable={false}
            resizable={false}
            header="My account"
            className="w-4"
            visible={props.visible}
            onHide={() => closeDialog()}
        >
            <div className="flex flex-column px-3 py-2 gap-2">

                <div className="inline-flex flex-column gap-2">
                    <div
                        className="inline-flex gap-2 h-2rem mb-1 align-items-center justify-content-between"
                        onClick={() => logOut()}
                    >
                        <label className="font-semibold m-0">
                            Log out
                        </label>
                        <Avatar
                            icon='pi pi-sign-out'
                            shape="circle"/>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default SettingsDialog;