import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export default function Login({ onSwitch }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError("Invalid email or password. Try again 💔");
        }
        setLoading(false);
    };

    return (
        <div className="auth-form animate-fadeUp">
            <h2 className="auth-title">Welcome Back 💗</h2>
            <p className="auth-sub">Your love story continues here</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email" required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password" required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn-primary" type="submit" disabled={loading}>
                    {loading ? "Entering..." : "Enter HeartBeat →"}
                </button>
            </form>

            <p className="auth-switch">
                New here?{" "}
                <span onClick={onSwitch}>Create your space</span>
            </p>
        </div>
    );
}