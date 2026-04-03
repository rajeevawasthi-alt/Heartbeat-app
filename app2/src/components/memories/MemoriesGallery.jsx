import { useEffect, useState } from "react";
import { subscribeToMemories } from "../../services/memoriesService";
import MemoryCard from "./MemoryCard";
import UploadMemory from "./UploadMemory";

export default function MemoriesGallery() {
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);
    const [expanded, setExpanded] = useState(null);

    useEffect(() => {
        const unsub = subscribeToMemories((data) => {
            setMemories(data);
            setLoading(false);
        });
        return unsub;
    }, []);

    return (
        <div className="memories-page">
            {/* Header */}
            <div className="memories-header">
                <div>
                    <h2 className="memories-title">Our Memories 📸</h2>
                    <p className="memories-sub">{memories.length} moments captured</p>
                </div>
                <button
                    className="btn-primary"
                    style={{ width: "auto", padding: "12px 24px" }}
                    onClick={() => setShowUpload(true)}
                >
                    + Add Memory
                </button>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="memories-loading">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="memory-skeleton" />
                    ))}
                </div>
            ) : memories.length === 0 ? (
                <div className="memories-empty">
                    <p>📷</p>
                    <p>No memories yet</p>
                    <p className="memories-empty-sub">
                        Upload your first photo together!
                    </p>
                </div>
            ) : (
                <div className="memories-grid">
                    {memories.map((m) => (
                        <MemoryCard
                            key={m.id}
                            memory={m}
                            onExpand={setExpanded}
                        />
                    ))}
                </div>
            )}

            {/* Upload Modal */}
            {showUpload && (
                <UploadMemory onClose={() => setShowUpload(false)} />
            )}

            {/* Lightbox */}
            {expanded && (
                <div className="lightbox" onClick={() => setExpanded(null)}>
                    <div
                        className="lightbox-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={expanded.imageUrl} alt={expanded.caption} />
                        {expanded.caption && (
                            <p className="lightbox-caption">{expanded.caption}</p>
                        )}
                        <button
                            className="lightbox-close"
                            onClick={() => setExpanded(null)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}