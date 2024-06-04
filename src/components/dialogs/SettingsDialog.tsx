import React, {useState} from "react";
import {Dialog} from "primereact/dialog";
import {useNavigate} from "react-router-dom";
import {Avatar} from "primereact/avatar";
import {toast} from "react-toastify";
import useChat from "../../context/Chat/ChatConext";
import useAuth from "../../context/Auth/AuthContext";
import {MenuItemCommandEvent} from "primereact/menuitem";
import ImageSelector from "../ImageSelector";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {ImageInfo} from "../../common/types/ImageInfo";
import {uploadImage, deleteImage} from "../../services/ImageService";
import {changeUserDetailsApi} from "../../services/UserService";

export type ChatDialogProps = {
    userId: string,
    visible: boolean,
    setVisible: (option: boolean) => void
}

const SettingsDialog = (props: ChatDialogProps) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [newUsername, setNewUsername] = useState('');

    const {updateCurrentChat} = useChat();
    const auth = useAuth();
    const navigate = useNavigate();


    const prepareImageData = (newUsername: string) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const encodedImage = reader.result;
            const image: ImageInfo = {
                type: selectedFile.type,
                data: encodedImage
            }
            changeUserDetails(newUsername, image, true);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        } else {
            changeUserDetails(newUsername, undefined, false)
        }
    };

    const changeUserDetails = async (newUsername: string | null, image: ImageInfo | undefined, changeImage: boolean) => {
        try {
            let imageResponse = null;
            if (changeImage) {
                await deleteImage(auth.authInfo.info?.imageId)
                imageResponse = await uploadImage(image);
            }
            const response = await changeUserDetailsApi(props.userId, newUsername ? newUsername : null, changeImage, changeImage ? imageResponse.data._id : null);
            toast.success("Successfully changed info!", {autoClose: 2000});
            auth.setToken(response.data);
            props.setVisible(false);
            setSelectedFile(null);
            setNewUsername("");
        } catch (e) {
            const message = typeof e.response?.data === "string" ? e.response?.data : "Invalid code";
            toast.error(message, {autoClose: 2000});
        }
    }

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
            <div className="flex flex-column px-2 py-1 gap-2">
                <div className="inline-flex flex-column gap-1">
                    <label htmlFor="code" className="font-semibold">
                        Change username
                    </label>
                    <InputText id="code" label="Code" className="bg-white-alpha-10 p-2" value={newUsername}
                               placeholder={auth.authInfo.info?.username}
                               onChange={(e) => setNewUsername(e.target.value)}/>
                </div>
                <div>
                    <ImageSelector file={selectedFile} setFile={setSelectedFile} title={"Change image"}/>
                </div>

                <div
                    className="inline-flex flex-column gap-2 surface-ground border-round surface-border border-3">
                    <div
                        className="inline-flex align-items-center justify-content-between hover:surface-100 cursor-pointer"
                        onClick={() => logOut()}
                    >
                        <div className="font-semibold m-1">
                            Log out
                        </div>
                        <Avatar
                            icon='pi pi-sign-out'
                            shape="circle"
                            style={{backgroundColor: 'transparent'}}/>
                    </div>
                </div>
                <div className="flex w-full justify-content-end">
                    <Button className="px-3 py-2" label="Save" outlined onClick={() => prepareImageData(newUsername)}/>
                </div>
            </div>
        </Dialog>
    );
};

export default SettingsDialog;