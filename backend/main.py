from fastapi import FastAPI , HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv('OPEN AI KEY'))

app = FastAPI()

origins = [
    'http://localhost:5173',
    'http://localhost:3000',
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


@app.post('/translate')
async def translate_text(req : TranslationRequest):
    try :
        response = client.chat.completions.create(
            model = 'gpt-40-mini',
            messages=[
                {'role' : 'system' , 'content' : 'You are a translator you task it to translates '
                'all the sentences provided and Hindi to English and return the translation only , '
                'no greeting or formal extra messages'},
                {'role' : 'user' , 'content' : req.text}
            ]
        )

        English_text = response.choices[0].message.content
        return {'translation' : English_text}
    
    except Exception as e :
        raise HTTPexception(status_code=500 , detail = str(e))