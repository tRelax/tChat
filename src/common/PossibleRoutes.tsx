import {Navigate, Route, Routes} from "react-router-dom";
import Login from "../views/login/Login";
import Register from "../views/register/Register";
import {Home} from "../views/Home";
import Chat from "../views/chat/Chat";

export function PossibleRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    );
}