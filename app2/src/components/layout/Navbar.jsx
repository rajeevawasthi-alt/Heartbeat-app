import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import "../../styles/navbar.css"; // will inline below

export default function Navbar() {
    const { currentUser } = useAuth();

    return (
        <nav className="navbar">
            <span className="navbar-brand">💗 HeartBeat</span>

            <div className="navbar-links">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link nav-active" : "nav-link"
                    }
                >
                    💬 Chat
                </NavLink>
                <NavLink
                    to="/memories"
                    className={({ isActive }) =>
                        isActive ? "nav-link nav-active" : "nav-link"
                    }
                >
                    📸 Memories
                </NavLink>
            </div>

            <div className="navbar-right">
                <span className="navbar-user">
                    {currentUser?.displayName || currentUser?.email}
                </span>
                <button
                    className="navbar-logout"
                    onClick={() => signOut(auth)}
                >
                    Leave
                </button>
            </div>
        </nav>
    );
}