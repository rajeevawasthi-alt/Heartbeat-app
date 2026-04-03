import Navbar from "../components/layout/Navbar";
import ChatBox from "../components/chat/ChatBox";

export default function ChatPage() {
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <div style={{ flex: 1, overflow: "hidden" }}>
                <ChatBox />
            </div>
        </div>
    );
}