import { Panel } from "primereact/panel";
import useAuth from "../context/Auth/AuthContext";
import React from "react";
import {useNavigate} from "react-router-dom";

export function Home (){
    const navigate = useNavigate();
    const auth = useAuth();
    return (
        <Panel className="mt-3" header={<b>Welcome!</b>} style={{width:"50%", margin: "auto"}}>
            <h3>
                Welcome to tChat {" "}
                {
                    auth.authInfo.authenticated && (
                        <i>
                            {auth.authInfo.info?.username}!
                        </i>
                    )
                }
            </h3>
            <p className="m-0">
                <b>
                    {
                        auth.authInfo.authenticated && (
                            <i>
                                Click the server and start chatting!
                            </i>
                        )
                    }
                    {
                        !auth.authInfo.authenticated && (
                            <i>
                                You are not logged in, please <a className="cursor-pointer" style={{color: "blueviolet"}} onClick={() => {navigate('/login')}}>log in</a> to use the website!
                            </i>
                        )
                    }
                </b>
            </p>
        </Panel>
    );
}