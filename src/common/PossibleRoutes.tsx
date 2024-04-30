import { Route, Routes } from "react-router-dom";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import { Home } from "../components/views/Home";

export function PossibleRoutes() {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    );
}