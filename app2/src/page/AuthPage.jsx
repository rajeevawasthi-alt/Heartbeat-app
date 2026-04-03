import { useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import "../styles/auth.css";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="brand">
                    <span className="brand-icon heartbeat-icon">💗</span>
                    <h1 className="brand-name">HeartBeat</h1>
                    <p className="brand-tagline">Every beat connects us</p>
                </div>
                <div className="brand-deco">
                    <div className="deco-ring ring-1" />
                    <div className="deco-ring ring-2" />
                    <div className="deco-ring ring-3" />
                </div>
            </div>

            <div className="auth-right">
                {isLogin
                    ? <Login onSwitch={() => setIsLogin(false)} />
                    : <Signup onSwitch={() => setIsLogin(true)} />
                }
            </div>
        </div>
    );
} 