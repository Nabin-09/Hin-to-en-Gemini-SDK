import { useState, useSyncExternalStore } from "react";
import './App.css'

function App(){

  const [inpText , setInpText] = useState('');
  const [Trans , setTrans] = useState('');
  const [isLoading , setIsLoading] = useState(false);

  const handleTranslate = async()=>{
     if(!inpText) return;

     setIsLoading(true);
     setTrans('');

     try{
      const response = await fetch('http://127.0.0.1/translate',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({text : inpText}),
      });

      const data = await response.json();

      setTrans(data.Trans);
     }catch(error){
      console.log('Error', error);
      setTrans('Some error occured while Translating, sorry for the inconvenience')
     }finally{
      setIsLoading(false)
     }
  }

  return (
    <div className="app-container">
      <h1>Hindi to English Translator</h1>

      <div className="input-box">
        <textarea
          rows='4'
          placeholder="Type your sentence in Hindi here..."
          value={inpText}
          onChange={(e)=> setInpText(e.target.value)}
        />
      </div>

      <button 
        onClick={handleTranslate}
        disabled={isLoading}
      >
        {isLoading? 'Translating...' : 'Translate'}
      </button>

      {Trans}
    </div>
  )
}

