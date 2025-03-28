import React, { useState } from "react";
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "user" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post("http://localhost:8111/register", formData);
            setMessage({ type: "success", text: res.data.message });
            setFormData({ name: "", email: "", password: "", role: "user" });
        } catch (error) {
            setMessage({ type: "danger", text: "Registration Failed!" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center mb-3">Register</h2>
                {message && <p className={`alert alert-${message.type} text-center`}>{message.text}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <input className="form-control" type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-2">
                        <select className="form-control" name="role" value={formData.role} onChange={handleChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="text-center mt-3">Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
}
