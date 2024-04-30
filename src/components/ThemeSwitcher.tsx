import { InputSwitch } from 'primereact/inputswitch';
import { Dispatch, SetStateAction, useState } from 'react';

export interface ThemeSwitcher{
    lightState : boolean;
    setLightState : Dispatch<SetStateAction<boolean>>;
}

export function ThemeSwitcher( props : ThemeSwitcher ) {
    const {lightState, setLightState} = props;
    const [iconClassName, setIconClassName] = useState('pi-moon');

    function createLink() {
        if (document.getElementById('mode-link')) {
            return;
        }
        console.log('createLink');
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'src/assets/theme.css';
        link.id = 'mode-link';
        document.head.appendChild(link);
        setLightState(true);
    }

    function removeLink() {
        const el = document.getElementById('mode-link');
        console.log('removeLink');
        el?.remove();
        setLightState(false);
    }

    function toggleMode() {
        if (!lightState) {
            createLink();
        } else {
            removeLink();
        }
        setIconClassName((prevClasName) => (prevClasName === 'pi-moon' ? 'pi-sun' : 'pi-moon'));
    }

    return (
        <>
            <div className="flex w-full justify-content-center">
                <i className={`dark:text-white pi ${iconClassName}` } onClick={toggleMode}/>
            </div>
        </>

    );
}