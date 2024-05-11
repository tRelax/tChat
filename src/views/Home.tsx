import { Panel } from "primereact/panel";
import useAuth from "../context/AuthContext";

export function Home (){
    const auth = useAuth();
    return (
        <Panel className="mt-3" header={<b>Welcome!</b>} style={{width:"50%", margin: "auto"}}>
            <h3>Welcome to the tChat!</h3>
            <p className="m-0">
                <b>
                    {
                        auth.authInfo.authenticated && (
                            <i>
                                Welcome to tChat {auth.authInfo.info?.username}!
                            </i>
                        )
                    }
                    {
                        !auth.authInfo.authenticated && (
                            <i>
                                You are not logged in, please log in to use the website!
                            </i>
                        )
                    }
                </b>
            </p>
        </Panel>
    );
}