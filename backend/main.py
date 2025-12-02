from fastapi import FastAPI , HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://hindi-translator-app.vercel.app", 
    '"*"'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class TranslationRequest(BaseModel):
    text : str


@app.post("/translate")
async def translate_text(request: TranslationRequest):
    try:
        prompt = f"Translate the following Hindi text to English. Only provide the english translation, nothing else.\n\nHindi: {request.text}"
        
        response = model.generate_content(prompt)
        
        return {"translation": response.text.strip()}
    
    except Exception as e :
        raise HTTPException(status_code=500 , detail = str(e))