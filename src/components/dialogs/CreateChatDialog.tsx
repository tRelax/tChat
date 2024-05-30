import {InputText} from 'primereact/inputtext';
import React, {useState} from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {createChatApi} from "../../views/chat/ChatService";
import {toast} from "react-toastify";
import useChat from "../../context/Chat/ChatConext";
import ImageSelector from "../ImageSelector";
import {ImageInfo} from "../../views/chat/ImageInfo";
import {uploadImage} from "../../views/chat/ImageService";

export type ChatDialogProps = {
    userId: string,
    visible: boolean,
    setVisible: (option: boolean) => void
}

const AddChatDialog = (props: ChatDialogProps) => {
    const {setUserChats} = useChat();
    const [chatName, setChatName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const requiredFields = [chatName, selectedFile];

    function validateRequiredFields(fields) {
        for (const field of fields) {
            if (!field) {
                toast.error("Server must have name and image selected!", {
                    autoClose: 2000,
                });
                return false;
            }
        }
        return true;
    }

    const prepareImageData = (chatName: string) => {
        if (!validateRequiredFields(requiredFields)) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const encodedImage = reader.result;
            const image: ImageInfo = {
                type: selectedFile.type,
                data: encodedImage
            }
            addServer(chatName, image);
        };
        reader.readAsDataURL(selectedFile);
    };

    const addServer = async (chatName: string, image: ImageInfo) => {
        try {
            const imageResponse = await uploadImage(image);
            const response = await createChatApi(props.userId, chatName, imageResponse.data._id);
            setUserChats((prev) => [...prev, response?.data]);
            toast.success('Created new server!', {
                autoClose: 2000,
            });
            props.setVisible(false);
            setSelectedFile(null);
            setChatName("");
        } catch (e) {
            const message = typeof e.response?.data === "string" ? e.response?.data : "Invalid code";
            toast.error(message, {autoClose: 2000});
        }
    }

    const closeDialog = () => {
        props.setVisible(false);
        setChatName("");
    }

    return (
        <Dialog
            draggable={false}
            resizable={false}
            header="Create new server"
            className="w-4"
            visible={props.visible}
            modal
            onHide={() => closeDialog()}>
            <div className="flex flex-column px-2 gap-2" style={{borderRadius: '4px'}}>
                <div className="inline-flex flex-column gap-2">
                    <label htmlFor="code" className="font-semibold">
                        Enter server name
                    </label>
                    <InputText id="code" label="Code" className="bg-white-alpha-10 p-3" value={chatName}
                               onChange={(e) => setChatName(e.target.value)}/>
                </div>
                <ImageSelector file={selectedFile} setFile={setSelectedFile}/>
                <div className="flex w-full justify-content-end">
                    <Button label="Create" outlined onClick={() => prepareImageData(chatName)}
                            className="w-3" style={{textAlign: "center"}}/>
                </div>
            </div>
        </Dialog>
    );
};

export default AddChatDialog;