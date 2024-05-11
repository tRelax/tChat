import {ThemeSwitcher} from "./ThemeSwitcher";
import React from "react";
import {PossibleRoutes} from "../common/PossibleRoutes";
import {SidebarComponent} from "./SidebarComponent";

export function MainLayout ( props: ThemeSwitcher ) {
    const { lightState, setLightState } = props;

    return (
        <div className="flex h-full w-full">
            <div className="flex" style={{"width": "10%"}}>
                <SidebarComponent lightState={lightState} setLightState={setLightState}/>
            </div>

            <PossibleRoutes className="flex" style={{"width": "100%"}}/>
        </div>
    )

}