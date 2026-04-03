import {
    collection, addDoc, query,
    orderBy, onSnapshot, deleteDoc, doc
} from "firebase/firestore";
import {
    ref, uploadBytesResumable,
    getDownloadURL, deleteObject
} from "firebase/storage";
import { db, storage } from "../firebase/config";

// Upload image to Storage + save metadata to Firestore
export const uploadMemory = (file, caption, userId, userName, onProgress) => {
    return new Promise((resolve, reject) => {
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `memories/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snap) => {
                const progress = Math.round(
                    (snap.bytesTransferred / snap.totalBytes) * 100
                );
                onProgress?.(progress);
            },
            (err) => reject(err),
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await addDoc(collection(db, "memories"), {
                    imageUrl: downloadURL,
                    storagePath: `memories/${fileName}`,
                    caption: caption.trim(),
                    uploadedBy: userId,
                    uploaderName: userName,
                    createdAt: new Date().toISOString(),
                });
                resolve(downloadURL);
            }
        );
    });
};

// Real-time listener for memories
export const subscribeToMemories = (callback) => {
    const q = query(
        collection(db, "memories"),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snap) => {
        const memories = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        callback(memories);
    });
};

// Delete memory from Storage + Firestore
export const deleteMemory = async (memoryId, storagePath) => {
    await deleteDoc(doc(db, "memories", memoryId));
    try {
        await deleteObject(ref(storage, storagePath));
    } catch (_) {
        // File already gone — ignore
    }
};