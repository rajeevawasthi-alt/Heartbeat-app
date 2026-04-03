import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function Signup({ onSwitch }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password.length < 6) return setError("Password must be at least 6 characters.");
        setError("");
        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, { displayName: name });
            // Save user to Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name,
                email,
                createdAt: new Date().toISOString(),
            });
        } catch (err) {
            setError(err.message.includes("email-already")
                ? "This email is already registered 💌"
                : "Something went wrong. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="auth-form animate-fadeUp">
            <h2 className="auth-title">Create Your Space 🌙</h2>
            <p className="auth-sub">Start your private love story</p>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSignup}>
                <div className="input-group">
                    <label>Your Name</label>
                    <input
                        type="text" required
                        placeholder="e.g. Rajeev"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                        placeholder="Min. 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn-primary" type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Begin Our Story →"}
                </button>
            </form>

            <p className="auth-switch">
                Already have an account?{" "}
                <span onClick={onSwitch}>Sign in</span>
            </p>
        </div>
    );
}