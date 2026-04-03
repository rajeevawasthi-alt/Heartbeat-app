import { useState } from "react";

export default function MessageInput({ onSend }) {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text);
        setText("");
    };

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="msg-input-bar">
            <textarea
                className="msg-input"
                placeholder="Say something sweet... 💌"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
            />
            <button
                className="msg-send-btn"
                onClick={handleSend}
                disabled={!text.trim()}
            >
                ➤
            </button>
        </div>
    );
}