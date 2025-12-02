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

      const data = 
     }
  }
}

