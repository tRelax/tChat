import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import ChatBox from "../components/ChatBox";

export function PossibleRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ChatBox/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    );
}