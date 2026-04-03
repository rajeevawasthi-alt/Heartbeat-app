import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import { deleteMemory } from "../../services/memoriesService";
import { useState } from "react";

export default function MemoryCard({ memory, onExpand }) {
    const { currentUser } = useAuth();
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const isOwner = memory.uploadedBy === currentUser.uid;

    const handleDelete = async () => {
        if (!confirmDelete) { setConfirmDelete(true); return; }
        setDeleting(true);
        await deleteMemory(memory.id, memory.storagePath);
    };

    const formattedDate = memory.createdAt
        ? format(new Date(memory.createdAt), "dd MMM yyyy")
        : "";

    return (
        <div className={`memory-card animate-fadeUp ${deleting ? "card-deleting" : ""}`}>
            {/* Image */}
            <div className="memory-img-wrap" onClick={() => onExpand(memory)}>
                <img
                    src={memory.imageUrl}
                    alt={memory.caption || "Memory"}
                    className="memory-img"
                    loading="lazy"
                />
                <div className="memory-img-overlay">
                    <span>🔍 View</span>
                </div>
            </div>

            {/* Info */}
            <div className="memory-info">
                {memory.caption && (
                    <p className="memory-caption">{memory.caption}</p>
                )}
                <div className="memory-meta">
                    <span className="memory-uploader">
                        {isOwner ? "You" : memory.uploaderName}
                    </span>
                    <span className="memory-date">{formattedDate}</span>
                </div>
            </div>

            {/* Delete */}
            {isOwner && (
                <button
                    className={`memory-delete ${confirmDelete ? "confirm" : ""}`}
                    onClick={handleDelete}
                    title={confirmDelete ? "Tap again to confirm" : "Delete"}
                >
                    {confirmDelete ? "Sure? ✕" : "✕"}
                </button>
            )}
        </div>
    );
}