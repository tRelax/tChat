import {ThemeSwitcher} from "./ThemeSwitcher";
import React from "react";
import {PossibleRoutes} from "../common/PossibleRoutes";
import {SidebarComponent} from "./SidebarComponent";
import useAuth from "../context/AuthContext";
import {ChatContextProvider} from "../context/ChatConext";

export function MainLayout ( props: ThemeSwitcher ) {
    const { lightState, setLightState } = props;
    const auth = useAuth();

    return (
        <ChatContextProvider userInfo={auth.authInfo.info}>
            <div className="flex h-full w-full">
                <div className="flex" style={{"width": "10%"}}>
                    <SidebarComponent lightState={lightState} setLightState={setLightState}/>
                </div>

                <PossibleRoutes className="flex" style={{"width": "100%"}}/>
            </div>
        </ChatContextProvider>
    )

}