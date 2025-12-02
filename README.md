# 🇮🇳 Hindi to English Translator (Gemini AI)

A minimal, full-stack AI translation app using Google's Gemini 2.5 Flash Lite model.

** Live Demo:** [https://hin-to-en-gemini-sdk.vercel.app/](https://hin-to-en-gemini-sdk.vercel.app/)

---

## 🛠 Tech Stack
- **Frontend:** React (Vite), CSS Modules (Glassmorphism UI)
- **Backend:** FastAPI (Python), Uvicorn
- **AI Model:** Google Gemini 2.5 Flash Lite (via Generative AI SDK)
- **Deployment:** Vercel (Frontend) + Render (Backend)

## 🏗 Architecture
- **Client-Server:** React sends HTTP POST requests to FastAPI.
- **Inference:** Backend securely calls Google's Gemini API for translation.
- **Security:** API keys are stored serverside; CORS is configured for production.

##  Quick Start
1.  **Clone Repo:** `git clone https://github.com/Nabin-09/Hin-to-en-Gemini-SDK.git`
2.  **Backend:**
    *   `cd backend`
    *   `pip install -r requirements.txt`
    *   Create `.env` with `GEMINI_API_KEY=your_key`
    *   Run: `uvicorn main:app --reload`
3.  **Frontend:**
    *   `cd frontend`
    *   `npm install`
    *   Run: `npm run dev`

## 🛡 API Endpoint
- **POST** `/translate`
- **Body:** `{"text": "नमस्ते"}`
- **Response:** `{"translation": "Hello"}`
