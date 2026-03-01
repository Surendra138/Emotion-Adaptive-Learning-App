from fastapi import FastAPI
from pydantic import BaseModel
from deepface import DeepFace
import base64
import numpy as np
import cv2 as cv

app = FastAPI()


class ImageRequest(BaseModel):
    image: str


@app.get("/health")
def health():
    return {"Status": "face-emotion is running."}


@app.post("/analyze")
async def analyze_emotion(data: ImageRequest):
    try:
        # Remove base64 header if exists
        if "," in data.image:
            image_data = base64.b64decode(data.image.split(",")[1])
        else:
            image_data = base64.b64decode(data.image)    

        # Convert to numpy array
        np_array = np.frombuffer(image_data, np.uint8)   
        img = cv.imdecode(np_array, cv.IMREAD_COLOR)

        # Run DeepFace
        result = DeepFace.analyze(
            img,
            actions=["emotion"],
            enforce_detection=False
        )

        dominant_emotion = result[0]["dominant_emotion"]
        confidence = round(float(result[0]["emotion"][dominant_emotion]), 2)

        return {
            "emotion": dominant_emotion,
            "confidence": confidence
        }
    
    except Exception as e:
        return {"error": str(e)}