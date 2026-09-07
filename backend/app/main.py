from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import weather, location, chat, climate

app = FastAPI(
    title="WeatherGPT API",
    description="AI-powered weather intelligence and decision-support platform",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather.router, prefix="/api/weather", tags=["Weather"])
app.include_router(location.router, prefix="/api/location", tags=["Location"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(climate.router, prefix="/api/climate", tags=["Climate"])

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "version": "0.1.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
