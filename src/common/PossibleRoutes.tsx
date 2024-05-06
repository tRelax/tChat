import { Route, Routes } from "react-router-dom";
import { Login } from "../components/views/login/Login";
import { Register } from "../components/Register";
import { Home } from "../components/views/Home";
import Login2 from "../components/views/login/Login2";

export function PossibleRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test2" element={<Login2 />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}