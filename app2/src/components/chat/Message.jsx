import { format } from "date-fns";

export default function Message({ message, isSent }) {
    const time = message.createdAt?.toDate
        ? format(message.createdAt.toDate(), "hh:mm a")
        : "";

    return (
        <div className={`msg-wrapper ${isSent ? "msg-sent" : "msg-received"}`}>
            {!isSent && (
                <div className="msg-avatar">
                    {message.senderName?.[0]?.toUpperCase() || "?"}
                </div>
            )}
            <div className="msg-bubble-group">
                {!isSent && (
                    <span className="msg-sender">{message.senderName}</span>
                )}
                <div className="msg-bubble">
                    <p>{message.text}</p>
                </div>
                <span className="msg-time">{time}</span>
            </div>
        </div>
    );
}