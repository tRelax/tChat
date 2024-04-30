import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Menubar } from 'primereact/menubar';
import { useRef } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem';
import { useNavigate } from 'react-router-dom';
import { SidebarComponent } from './navbar-components/SidebarComponent';

type NavbarCustom = ThemeSwitcher & SidebarComponent;

export function NavbarCustom( props : NavbarCustom ) {
    const navigate = useNavigate();

    const {lightState, setLightState, sidebarState, setSidebarState} = props;
    const menu = useRef<Menu>(null);
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
            label: 'Settings',
            icon: 'pi pi-cog'
        },
        {
            label: 'Logout',
            icon: 'pi pi-power-off'
        },
        {
            separator: true
        },
        {
            template: <ThemeSwitcher lightState={lightState} setLightState={setLightState} />
        }
    ];

    const navigateToUrl = (e: MenuItemCommandEvent, url: string) => {
        e?.originalEvent?.preventDefault();
        navigate(url);
      };    
//<SidebarComponent sidebarState={sidebarState} setSidebarState={setSidebarState}/>
    const start = 
        <>
            
        </>
    const end =
        <>
            <Menu model={items} popup ref={menu} id="popup_menu_left" />
            <Button 
                label="User" 
                icon="pi pi-user" 
                className="mr-2" 
                onClick={(event) => menu.current?.toggle(event)} 
                aria-controls="popup_menu_left" 
                aria-haspopup 
                severity="info"
            />
        </>


    return (
        <>
            <Menubar model={[]} start={start} end={end}/>
        </>
    )
    //
}
