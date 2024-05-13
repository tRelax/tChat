import {ThemeSwitcher} from "./ThemeSwitcher";
import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {Menu} from "primereact/menu";
import {Tooltip} from "primereact/tooltip";
import {MenuItem, MenuItemCommandEvent} from "primereact/menuitem";
import {Avatar} from "primereact/avatar";
import '../assets/Sidebar.css'
import useAuth from "../context/AuthContext";
import {CustomToastContainer} from "./ToastComponent";
import {toast} from "react-toastify";

export function SidebarComponent ( props: ThemeSwitcher ) {
    const auth = useAuth();
    const navigate = useNavigate();
    const { lightState, setLightState } = props;

    const servers = [
        {
            id:1,
            name:"name1",
            icon:"pi pi-server"
        },
        {
            id:2,
            name:"name2",
            icon:"pi pi-server"
        },
        {
            id:3,
            name:"name3",
            icon:"pi pi-server"
        },
        {
            id:4,
            name:"name4",
            icon:"pi pi-server"
        },
        {
            id:5,
            name:"name5",
            icon:"pi pi-server"
        },
        {
            id:6,
            name:"name6",
            icon:"pi pi-server"
        },
        {
            id:7,
            name:"name7",
            icon:"pi pi-server"
        },
        {
            id:8,
            name:"name8",
            icon:"pi pi-server"
        },
        {
            id:9,
            name:"name9",
            icon:"pi pi-server"
        },
        {
            id:10,
            name:"name10",
            icon:"pi pi-server"
        },
        {
            id:11,
            name:"name11",
            icon:"pi pi-server"
        }
    ]

    const menu = useRef<Menu>();
    const items : MenuItem[] = [
        {
            label: 'Login',
            command: (e) => { navigateToUrl(e, '/login') }
        },
        {
            label: 'Register',
            command: (e) => { navigateToUrl(e, '/register') }
        },
        {
            label: 'Chat',
            command: (e) => { navigateToUrl(e, '/chat') }
        },
        {
            //label: 'Settings',
            icon: 'pi pi-cog'
        },
        {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => { logOut() }
        }
    ];

    const logOut = () => {
        auth.setToken(undefined);
        toast.success('Logged out successfully!', {
            autoClose: 2000,
            onClose: () => window.location.href = '/',
        });
    };

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
            <div className="flex flex-column align-items-center">
                <div className='mb-1' key={"homepage-div"}>
                    <Avatar
                        key={"homepage-avatar"}
                        className='homepage'
                        icon='pi pi-home'
                        size="large"
                        shape="circle"
                        onClick= { () => {navigate('/'); }}/>
                </div>
            </div>

            <div className="sticky flex flex-column align-items-center">
                {servers.map( (server) => {
                    return (
                        <React.Fragment key = {`server-${server.id}-fragment`}>
                            <div className='mb-1'>
                                <Tooltip target={`.${server.name}-${server.id}`} />
                                <Avatar
                                    className={`${server.name}-${server.id}`}
                                    icon={server.icon}
                                    size="large"
                                    shape="circle"
                                    data-pr-tooltip={server.name}
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
                            data-pr-tooltip="Username"
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

// <div className="flex h-full w-full">
//     <div className="flex" style={{"width": "10%"}}>
//         <div className="flex flex-column h-full justify-content-between p-3">
//             <div className="flex flex-column align-items-center">
//                 <div className='mb-1' key={"homepage-div"}>
//                     <Avatar
//                         key={"homepage-avatar"}
//                         className='homepage'
//                         icon='pi pi-home'
//                         size="large"
//                         shape="circle"
//                         onClick= { () => {navigate('/'); }}/>
//                 </div>
//                 {servers.map( (server) => {
//                     return (
//                         <React.Fragment key = {`server-${server.id}-fragment`}>
//                             <div className='mb-1'>
//                                 <Tooltip target={`.${server.name}-${server.id}`} />
//                                 <Avatar
//                                     className={`${server.name}-${server.id}`}
//                                     icon={server.icon}
//                                     size="large"
//                                     shape="circle"
//                                     data-pr-tooltip={server.name}
//                                     data-pr-position="right"/>
//                             </div>
//                         </React.Fragment>
//                     );
//                 })}
//             </div>
//             <div>
//                 <div className="mt-auto">
//                     <hr className="border-top-1 border-none surface-border" />
//                     <Menu
//                         model={items}
//                         popup
//                         ref={menu}
//                         id="popup_menu_right"
//                         popupAlignment="left"
//                         style={{"width":"4em"}}
//
//                     />
//                     <a className="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
//                        onClick={(event) => menu.current?.toggle(event)}
//                        aria-controls="popup_menu_right"
//                        aria-haspopup>
//                         <Tooltip target=".profile" />
//                         <Avatar
//                             className="profile select-none"
//                             icon="pi pi-user"
//                             image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
//                             shape="circle"
//                             data-pr-tooltip="Username"
//                             data-pr-position="right"
//                         />
//                     </a>
//
//                     <hr className="border-top-1 border-none surface-border" />
//                     <ThemeSwitcher lightState={lightState} setLightState={setLightState} />
//                 </div>
//             </div>
//         </div>
//     </div>
//
//     <PossibleRoutes className="flex" style={{"width": "100%"}}/>
// </div>