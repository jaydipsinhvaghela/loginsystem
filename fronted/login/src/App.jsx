import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import AdminDashboard from "./admindashboard";
import UserDashboard from "./userdashboard";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
    return (
        <Router>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg text-center navbar-dark bg-dark shadow-sm py-3">
                <div className="container">
                    {/* Logo */}
                    <Link className="navbar-brand fw-bold fs-4 text-center" to="/">MyApp</Link>
                    
                    {/* Navbar Toggler for Mobile */}
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li> */}

                            {/* Dropdown Menu for More */}
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" id="moreMenu" role="button" data-bs-toggle="dropdown">
                                    More
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/register">Register</Link></li>
                                    <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item text-danger" to="/logout">Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Routes */}
            <div className="container mt-5">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admindashboard" element={<AdminDashboard />} />
                    <Route path="/user" element={<UserDashboard />} />
                    {/* <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} /> */}
                </Routes>
            </div>
        </Router>
    );
}
