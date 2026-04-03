import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { uploadMemory } from "../../services/memoriesService";

export default function UploadMemory({ onClose }) {
    const { currentUser } = useAuth();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState("");
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef();

    const handleFile = (f) => {
        if (!f) return;
        if (!f.type.startsWith("image/")) {
            setError("Only image files allowed 🖼️");
            return;
        }
        if (f.size > 10 * 1024 * 1024) {
            setError("File too large. Max 10MB.");
            return;
        }
        setError("");
        setFile(f);
        setPreview(URL.createObjectURL(f));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        try {
            await uploadMemory(
                file,
                caption,
                currentUser.uid,
                currentUser.displayName || "Someone special",
                setProgress
            );
            onClose();
        } catch (err) {
            setError("Upload failed. Try again 💔");
            setUploading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-box animate-fadeUp"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h3>Add a Memory ✨</h3>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                {/* Drop Zone */}
                {!preview ? (
                    <div
                        className={`drop-zone ${dragOver ? "drag-active" : ""}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => inputRef.current.click()}
                    >
                        <span className="drop-icon">🖼️</span>
                        <p className="drop-text">Drop your photo here</p>
                        <p className="drop-sub">or click to browse · Max 10MB</p>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleFile(e.target.files[0])}
                        />
                    </div>
                ) : (
                    <div className="preview-wrap">
                        <img src={preview} alt="preview" className="img-preview" />
                        <button
                            className="preview-change"
                            onClick={() => { setFile(null); setPreview(null); }}
                        >
                            Change Photo
                        </button>
                    </div>
                )}

                {/* Caption */}
                <div className="input-group" style={{ marginTop: "20px" }}>
                    <label>Caption (optional)</label>
                    <input
                        type="text"
                        placeholder="A moment to remember... 💌"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        maxLength={120}
                        disabled={uploading}
                    />
                </div>

                {error && <div className="auth-error" style={{ marginTop: "12px" }}>{error}</div>}

                {/* Progress */}
                {uploading && (
                    <div className="progress-wrap">
                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }}
                        />
                        <span className="progress-label">{progress}%</span>
                    </div>
                )}

                <button
                    className="btn-primary"
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    style={{ marginTop: "20px" }}
                >
                    {uploading ? `Uploading... ${progress}%` : "Save Memory 💗"}
                </button>
            </div>
        </div>
    );
}