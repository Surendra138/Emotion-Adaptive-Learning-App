import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContentById } from "../api/content.api.js";
import { startSession, endSession, logInteraction } from "../api/session.api.js";
import { detectEmotion } from "../api/emotion.api.js";


const ContentView = () => {
    const id = useParams();
    const navigate = useNavigate();

    const [content, setContent] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    //1. Load content + start session
    useEffect(() => {
        const init = async () => {
            const contentRes = await getContentById(id);
            setContent(contentRes.data);

            const sessionRes = await startSession(id, "web");
            setSessionId(sessionRes.data.id);
        }

        init();

        //2. End session when leaving page
        return () => handleExit();
    }, []);

    const handleExit = async() => {
        if(!sessionId) return;

        await endSession(sessionId);
        await detectEmotion(sessionId);

        navigate(`/recommend/${id}`);
    };

    // Interaction examples
    const handleScroll = () => {
        if(sessionId) logInteraction(sessionId, "scroll", "fast");
    };

    const handlePause = () => {
        if(sessionId) logInteraction(sessionId, "pause", "video_paused");
    };

    if (!content) return <p>Loading...</p>;

    return (
    <div onScroll={handleScroll} style={{ height: "90vh", overflowY: "scroll" }}>
        <h1>{content.title}</h1>
        <p>{content.description}</p>

        {content.content_type === "article" && (
            <p>{content.content_body}</p>
        )}

        {content.content_type === "video" && (
            <video
                src={content.content_body}
                controls
                onPause={handlePause}
            />
        )}

        <button onClick={handleExit}>Finish Lesson</button>
    </div>
    );
};


export default ContentView;