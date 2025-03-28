import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function userDashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.post("http://localhost:8111/logout");
        navigate("/login");
    };

    return (
        <div className="container">
            <h2>User Dashboard</h2>
            <p>Welcome, User!</p>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
    );
}
