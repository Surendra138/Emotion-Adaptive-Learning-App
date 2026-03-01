import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { analyzeEmotion } from "../api/emotion.api";

export default function EmotionCapture({ onEmotionDetected, onConfidenceDetected }) {
    const webcamRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const captureAndSend = async () => {
        if (!webcamRef.current) return;

        const video = webcamRef.current.video;

        if (!video || video.readyState !== 4) {
            console.log("Video not ready yet...");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const imgSrc = webcamRef.current.getScreenshot();

            if (!imgSrc || imgSrc.length < 1000) {
                throw new Error("Captured image is invalid or empty");
            }

            const result = await analyzeEmotion(imgSrc);

            onEmotionDetected(result.emotion);
            onConfidenceDetected(result.confidence);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to analyze emotion");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid #4f46e5",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                }}
            >
            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                audio={false}
                videoConstraints={{
                    facingMode: "user"
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }}
                onUserMedia={() => {
                    setTimeout(() => {
                        captureAndSend();
                    }, 500);
                }}
            />
        </div>

        {loading && <p style={{ marginTop: "10px" }}>Analyzing...</p>}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
    );
}