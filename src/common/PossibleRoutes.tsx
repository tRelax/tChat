import { Route, Routes, Navigate } from "react-router-dom";
import { Login } from "../views/login/Login";
import { Register } from "../views/register/Register";
import { Home } from "../views/Home";
import Login2 from "../views/login/Login2";
import Register2 from "../views/register/Register2";

export function PossibleRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/test2" element={<Login2 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register2" element={<Register2 />} />
        </Routes>
    );
}