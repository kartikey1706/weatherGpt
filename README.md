# WeatherGPT

AI-powered multilingual weather intelligence and decision-support platform.

## 🚀 Features
- Grounded AI responses (No hallucinated weather)
- Real-time weather data integration
- Official warning system
- Deterministic risk engine
- Contextual agriculture and travel advisories
- Multilingual support (English, Hindi, etc.)
- Voice interaction
- Interactive weather map

## 🛠 Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Leaflet
- **Backend**: FastAPI, Python, Pydantic
- **Database**: PostgreSQL
- **Cache**: Redis
- **AI**: OpenAI / Gemini / Groq

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone <repo-url>
cd weathergpt
```

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```
Edit `.env` with your API keys.

### 3. Run with Docker Compose
```bash
docker compose up --build
```

### 4. Access the App
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`
- API Docs: `http://localhost:8000/docs`

## 🧪 Demo Mode
To run the app with deterministic sample data:
Set `DEMO_MODE=true` in `.env`.
