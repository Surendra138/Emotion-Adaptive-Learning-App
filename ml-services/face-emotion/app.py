from fastapi import FastAPI # pyright: ignore[reportMissingImports]

app = FastAPI()

@app.get("/health")
def health():
    return {"Status": "face-emotion is running."}