import {Avatar} from "primereact/avatar";
import {Sidebar} from "primereact/sidebar";
import {Tooltip} from "primereact/tooltip";
import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {ThemeSwitcher} from "../ThemeSwitcher";
import {Menu} from "primereact/menu";
import {MenuItem, MenuItemCommandEvent} from "primereact/menuitem";

export function SidebarComponent ( props: ThemeSwitcher ) {
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
    }
    ]

    const menu = useRef<Menu>();
    const items : MenuItem[] = [
        {
            label: 'Login',
            command: (e) => { navigateToUrl(e, '/login') }
        },
        {
            label: 'Login2',
            command: (e) => { navigateToUrl(e, '/test2') }
        },
        {
            label: 'Register',
            command: (e) => { navigateToUrl(e, '/register') }
        },
        {
            //label: 'Settings',
            icon: 'pi pi-cog'
        },
        {
            //label: 'Logout',
            icon: 'pi pi-power-off'
        }
    ];

    const navigateToUrl = (e: MenuItemCommandEvent, url: string) => {
        e?.originalEvent?.preventDefault();
        navigate(url);
      }; 
//TODO napraviti svoj sidebar jer ovaj radi pizdarije sa formama :)
    return (
        <>
            <Sidebar 
                    className="p-sidebar-sm" 
                    visible={true}
                    modal={false}
                    onHide={() => {}} 
                    autoFocus={false}
                    style={{width: "auto"}}
                    showCloseIcon={false}
                    header={false}
                    
                    content={({}) => (
                        <div className="flex flex-column h-full justify-content-between p-3">
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
                    )}
                    >                   
                                
                </Sidebar>
        </>
    )
}