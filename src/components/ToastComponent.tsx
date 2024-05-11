import React from 'react';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

const Toast = ({ message, onClose }) => (
    <div className="custom-toast">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
    </div>
);

export const CustomToastContainer = () => (
    <ToastContainer toast={Toast} />
);