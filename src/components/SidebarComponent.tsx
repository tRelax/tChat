import {ThemeSwitcher} from "./ThemeSwitcher";
import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Menu} from "primereact/menu";
import {Tooltip} from "primereact/tooltip";
import {MenuItem, MenuItemCommandEvent} from "primereact/menuitem";
import {Avatar} from "primereact/avatar";
import '../assets/Sidebar.css'
import useAuth from "../context/Auth/AuthContext";
import {CustomToastContainer} from "./ToastComponent";
import {toast} from "react-toastify";
import useChat from "../context/Chat/ChatConext";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

export function SidebarComponent ( props: ThemeSwitcher ) {
    const [visible, setVisible] = useState(false);
    const [serverId, setServerId] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const { lightState, setLightState } = props;
    const { userChats, addUserToServer, updateCurrentChat} = useChat();

    const menu = useRef<Menu>();
    const items : MenuItem[] = [
        {
            //label: 'Settings',
            icon: 'pi pi-cog'
        },
        {
            // label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => { logOut() }
        }
    ];

    const logOut = () => {
        updateCurrentChat(undefined);
        auth.setToken(undefined);
        toast.success('Logged out successfully!', {
            autoClose: 2000,
            onClose: (e) => navigateToUrl(e, '/login'),
        });
    };

    const addServer = () => {
        console.log("adding new server..")

    }

    const navigateToUrl = (e: MenuItemCommandEvent, url: string) => {
        e?.originalEvent?.preventDefault();
        navigate(url);
    };

    const sidebarShadowStyle = {
        shadow: {
            "boxShadow": "0px 1px 3px rgba(0, 0, 0, 0.3)",
        },
    }

    return (
        <div style={sidebarShadowStyle.shadow} className="p-sidebar flex flex-column h-full justify-content-between p-3">
            <CustomToastContainer />
            <Dialog
                visible={visible}
                modal
                onHide={() => setVisible(false)}
                content={({ hide }) => (
                    <div className="flex flex-column px-6 py-4 gap-2 p-sidebar" style={{ borderRadius: '4px'}}>
                        <div className="inline-flex flex-column gap-2">
                            <label htmlFor="code" className="font-semibold">
                                Enter invite code
                            </label>
                            <InputText id="code" label="Code" className="bg-white-alpha-10 p-3" value={serverId} onChange={(e) => setServerId(e.target.value)}/>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <Button label="Join" outlined onClick={() => addUserToServer(auth.authInfo.info!.id, serverId)} className="p-2 w-full hover:bg-white-alpha-10"/>
                            <Button label="Cancel" outlined onClick={(e) => hide(e)} className="p-2 w-full hover:bg-white-alpha-10"/>
                        </div>
                    </div>
                )}
            ></Dialog>
            <div>
                <div className="flex flex-column align-items-center">
                    <div className='mb-1' key={"homepage-div"}>
                        <Avatar
                            key={"homepage-avatar"}
                            className='homepage'
                            icon='pi pi-home'
                            size="large"
                            shape="circle"
                            onClick= { () => {updateCurrentChat(undefined);navigate('/'); }}/>
                    </div>
                </div>
                <div className="flex flex-column align-items-center">
                    <div className='mb-1' key={"homepage-div"}>
                        <Tooltip target=".add-server-avatar" />
                        <Avatar
                            className="add-server-avatar"
                            icon='pi pi-plus'
                            size="large"
                            shape="circle"
                            data-pr-tooltip="Add a Server"
                            data-pr-position="right"
                            onClick={() => setVisible(true)}/>
                    </div>
                </div>
                <hr className="border-top-1 border-none surface-border" />
            </div>

            <div className="sticky flex flex-column align-items-center">
                {userChats?.map((chat, index) => {
                    return (
                        <React.Fragment key = {`server-${index}-fragment`} >
                            <div className='mb-2' onClick={() => updateCurrentChat(chat)}>
                                <Tooltip target={`.server-${index}`} />
                                <Avatar
                                    className={`server-${index}`}
                                    icon="pi pi-server"
                                    size="large"
                                    shape="circle"
                                    data-pr-tooltip={`Server ${index}`}
                                    data-pr-position="right"/>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
            <div>
                <div className="mt-auto">
                    <hr className="border-top-1 border-none surface-border" />
                    <Menu
                        model={items}
                        popup
                        ref={menu}
                        id="popup_menu_right"
                        popupAlignment="left"
                        style={{"width":"4em"}}

                    />
                    <a className="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                       onClick={(event) => menu.current?.toggle(event)}
                       aria-controls="popup_menu_right"
                       aria-haspopup>
                        <Tooltip target=".profile" />
                        <Avatar
                            className="profile select-none"
                            icon="pi pi-user"
                            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                            shape="circle"
                            data-pr-tooltip={auth.authInfo.info?.username}
                            data-pr-position="right"
                        />
                    </a>

                    <hr className="border-top-1 border-none surface-border" />
                    <ThemeSwitcher lightState={lightState} setLightState={setLightState} />
                </div>
            </div>
        </div>
    )

}