import {InputText} from 'primereact/inputtext';
import React, {useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {addUserToChatApi} from "../../views/chat/ChatService";
import {toast} from "react-toastify";
import useChat from "../../context/Chat/ChatConext";

export type ChatDialogProps = {
    userId: string,
    visible: boolean,
    setVisible: (option: boolean) => void
}

const AddChatDialog = (props: ChatDialogProps) => {
    const { setUserChats } = useChat();
    const [serverId, setServerId] = useState('');

    const addServer = async (serverId: string) => {
        try {
            const response = await addUserToChatApi(props.userId, serverId);
            setUserChats((prev) => [...prev, response?.data]);
            toast.success('Added new server!', {
                autoClose: 2000,
                // onClose: () => props.setVisible(false),
            });
            props.setVisible(false);
            setServerId("");
        } catch (e) {
            const message = typeof e.response?.data === "string" ? e.response?.data : "Invalid code";
            toast.error(message, {autoClose: 2000});
        }
    }

    const closeDialog = () => {
        props.setVisible(false);
        setServerId("");
    }

    return (
        <Dialog
            visible={props.visible}
            modal
            onHide={() => closeDialog()}
            content={({ hide }) => (
                <div className="flex flex-column px-6 py-4 gap-2 p-sidebar" style={{ borderRadius: '4px'}}>

                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="code" className="font-semibold">
                            Enter invite code
                        </label>
                        <InputText id="code" label="Code" className="bg-white-alpha-10 p-3" value={serverId} onChange={(e) => setServerId(e.target.value)}/>
                    </div>
                    <div className="flex align-items-center gap-2">
                        <Button label="Join" outlined onClick={() => addServer(serverId)} className="p-2 w-full hover:bg-white-alpha-10"/>
                        <Button label="Cancel" outlined onClick={(e) => hide(e)} className="p-2 w-full hover:bg-white-alpha-10"/>
                    </div>
                </div>
            )}
        />
    );
};

export default AddChatDialog;