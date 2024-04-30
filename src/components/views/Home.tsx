import { Panel } from "primereact/panel";

export function Home (){
    return (
        <Panel className="mt-3" header={<b>Welcome!</b>} style={{width:"50%", margin: "auto"}}>
            <h3>Welcome to the TVZ-forum!</h3>
            <p className="m-0">
                <b>
                    <i>
                    You are not logged in, please log in to use the website!
                    </i>
                </b>
            </p>
        </Panel>
    );
}