import { useEffect, useRef, useState } from "react";
import {
    collection, addDoc, query,
    orderBy, onSnapshot, serverTimestamp
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import Message from "./Message";
import MessageInput from "./MessageInput";
import "../../styles/chat.css";

export default function ChatBox() {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const bottomRef = useRef(null);
    const ROOM_ID = "main-room"; // Fixed room for 2 users

    // Real-time listener
    useEffect(() => {
        const q = query(
            collection(db, "rooms", ROOM_ID, "messages"),
            orderBy("createdAt", "asc")
        );
        const unsub = onSnapshot(q, (snap) => {
            setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            setLoading(false);
        });
        return unsub;
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (text) => {
        if (!text.trim()) return;
        await addDoc(collection(db, "rooms", ROOM_ID, "messages"), {
            text,
            senderId: currentUser.uid,
            senderName: currentUser.displayName || "You",
            createdAt: serverTimestamp(),
        });
    };

    return (
        <div className="chatbox">
            <div className="chat-header">
                <span className="chat-header-icon heartbeat-icon">💗</span>
                <div>
                    <h3>HeartBeat</h3>
                    <span className="online-dot">● Live</span>
                </div>
            </div>

            <div className="chat-messages">
                {loading ? (
                    <div className="chat-loading">
                        <span className="pulse-dot" />
                        <span className="pulse-dot" />
                        <span className="pulse-dot" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="chat-empty">
                        <p>💌</p>
                        <p>Send your first message!</p>
                        <p className="chat-empty-sub">Every conversation is a memory</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <Message
                            key={msg.id}
                            message={msg}
                            isSent={msg.senderId === currentUser.uid}
                        />
                    ))
                )}
                <div ref={bottomRef} />
            </div>

            <MessageInput onSend={sendMessage} />
        </div>
    );
}