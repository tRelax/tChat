import {ThemeSwitcher} from "./ThemeSwitcher";
import React from "react";
import {PossibleRoutes} from "../common/PossibleRoutes";
import {SidebarComponent2} from "./SidebarComponent2";

export function MainLayout ( props: ThemeSwitcher ) {
    const { lightState, setLightState } = props;

    return (
        <div className="flex h-full w-full">
            <div className="flex" style={{"width": "10%"}}>
                <SidebarComponent2 lightState={lightState} setLightState={setLightState}/>
            </div>

            <PossibleRoutes className="flex" style={{"width": "100%"}}/>
        </div>
    )

}