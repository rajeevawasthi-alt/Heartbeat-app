import Navbar from "../components/layout/Navbar";
import MemoriesGallery from "../components/memories/MemoriesGallery";

export default function MemoriesPage() {
    return (
        <div style={{ minHeight: "100vh" }}>
            <Navbar />
            <MemoriesGallery />
        </div>
    );
}