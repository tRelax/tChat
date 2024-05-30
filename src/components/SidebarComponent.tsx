import {ThemeSwitcher} from "./ThemeSwitcher";
import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Tooltip} from "primereact/tooltip";
import {MenuItem, MenuItemCommandEvent} from "primereact/menuitem";
import {Avatar} from "primereact/avatar";
import '../assets/Sidebar.css'
import useAuth from "../context/Auth/AuthContext";
import {CustomToastContainer} from "./ToastComponent";
import {toast} from "react-toastify";
import useChat from "../context/Chat/ChatConext";
import AddChatDialog from "./dialogs/AddChatDialog";
import CreateChatDialog from "./dialogs/CreateChatDialog";
import SettingsDialog from "./dialogs/SettingsDialog";
import {ContextMenu} from "primereact/contextmenu";
import {ChatInfo} from "../views/chat/ChatInfo";
import {getUserChatsApi, removeUserFromChatApi} from "../views/chat/ChatService";

export function SidebarComponent(props: ThemeSwitcher) {
    const [visibleAddChat, setVisibleAddChat] = useState(false);
    const [visibleCreateChat, setVisibleCreateChat] = useState(false);
    const [visibleSettings, setVisibleSettings] = useState(false);
    const [selectedChatForDeleting, setSelectedChatForDeleting] = useState<ChatInfo>(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const {lightState, setLightState} = props;
    const {userChats, updateCurrentChat, setUserChats, currentChat} = useChat();
    const contextMenuRef = useRef(null);
    const tooltipRef = useRef(null);

    const items: MenuItem[] = [
        {
            label: 'Leave server',
            icon: 'pi pi-power-off',
            command: () => {
                removeUserFromChat().then(null);
            }
        }
    ];

    const rightClick = (e: MouseEvent<HTMLDivElement>, chat: ChatInfo) => {
        // cm.current.show(e);
        if (contextMenuRef.current) {
            contextMenuRef.current.show(e);
            tooltipRef.current.hide(e);
            setSelectedChatForDeleting(chat);
        }
    }

    const removeUserFromChat = async () => {
        try {
            if (currentChat?._id === selectedChatForDeleting._id) {
                navigate("/");
                updateCurrentChat(undefined)
            }
            await removeUserFromChatApi(auth.authInfo.info!.id, selectedChatForDeleting._id);
            toast.success('Left server!', {
                autoClose: 2000,
            });
            const response = await getUserChatsApi(auth.authInfo.info!.id)
            setUserChats(response?.data);
        } catch (e) {
            const message = typeof e.response?.data === "string" ? e.response?.data : "ERR";
            toast.error(message, {autoClose: 2000});
        }
    }

    //pi-folder-plus
    return (
        <div className="p-sidebar flex flex-column h-full justify-content-between p-3">
            <CustomToastContainer/>
            <AddChatDialog userId={auth.authInfo.info!.id} visible={visibleAddChat} setVisible={setVisibleAddChat}/>
            <CreateChatDialog userId={auth.authInfo.info!.id} visible={visibleCreateChat}
                              setVisible={setVisibleCreateChat}/>
            <SettingsDialog userId={auth.authInfo.info!.id} visible={visibleSettings} setVisible={setVisibleSettings}/>
            <div>
                <div className="flex flex-column align-items-center">
                    <div className='mb-1' key={"homepage-div"}>
                        <Avatar
                            key={"homepage-avatar"}
                            className='homepage'
                            icon='pi pi-home'
                            size="large"
                            shape="circle"
                            onClick={() => {
                                updateCurrentChat(undefined);
                                navigate('/');
                            }}/>
                    </div>
                </div>
                <div className="flex flex-column align-items-center">
                    <div className='mb-1'>
                        <Tooltip target=".add-server-avatar"/>
                        <Avatar
                            className="add-server-avatar"
                            icon='pi pi-plus'
                            size="large"
                            shape="circle"
                            data-pr-tooltip="Add a Server"
                            data-pr-position="right"
                            onClick={() => setVisibleAddChat(true)}/>
                    </div>
                </div>
                <div className="flex flex-column align-items-center">
                    <div className='mb-1'>
                        <Tooltip target=".create-server-avatar"/>
                        <Avatar
                            className="create-server-avatar"
                            icon='pi pi-folder-plus'
                            size="large"
                            shape="circle"
                            data-pr-tooltip="Create new server"
                            data-pr-position="right"
                            onClick={() => setVisibleCreateChat(true)}/>
                    </div>
                </div>
                <hr className="border-top-1 border-none surface-border"/>
            </div>

            <div className="sticky flex flex-column align-items-center">
                {userChats?.map((chat, index) => {
                    return (
                        <React.Fragment key={`server-${index}-fragment`}>
                            <div className='mb-2' onClick={() => updateCurrentChat(chat)}
                                 onContextMenu={(e) => rightClick(e, chat)}>
                                <ContextMenu model={items} ref={contextMenuRef}/>
                                <Tooltip target={`.server-${index}`} ref={tooltipRef}/>
                                <Avatar
                                    image={chat.imageId ? `${import.meta.env.VITE_SERVICE_API_URL}/images/${chat.imageId}` : ""}
                                    className={`server-${index}`}
                                    icon={chat.imageId ? "" : "pi pi-server"}
                                    size="large"
                                    shape="circle"
                                    data-pr-tooltip={chat.name ? chat.name : "error_name"}
                                    data-pr-position="right"/>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
            <div>
                <div className="mt-auto">
                    <hr className="border-top-1 border-none surface-border"/>
                    <a className="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                        // onClick={(event) => menu.current?.toggle(event)}
                       aria-controls="popup_menu_right"
                       aria-haspopup
                       onClick={() => setVisibleSettings(true)}>
                        <Tooltip target=".profile"/>
                        <Avatar
                            className="profile select-none"
                            icon="pi pi-user"
                            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                            shape="circle"
                            data-pr-tooltip={auth.authInfo.info?.username}
                            data-pr-position="right"
                        />
                    </a>

                    <hr className="border-top-1 border-none surface-border"/>
                    <ThemeSwitcher lightState={lightState} setLightState={setLightState}/>
                </div>
            </div>
        </div>
    )

}