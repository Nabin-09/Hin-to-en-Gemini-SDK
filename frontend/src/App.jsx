import { useState } from "react";
import "./App.css";

function App() {
  const [inpText, setInpText] = useState("");
  const [Trans, setTrans] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inpText) return;

    setIsLoading(true);
    setTrans(""); // Reset result to trigger animation later

    try {
      // Note: Using your verified Render URL
      const response = await fetch("https://hin-to-en-gemini-sdk.onrender.com/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inpText }),
      });

      const data = await response.json();
      setTrans(data.translation);
    } catch (error) {
      console.error("Error", error);
      setTrans("⚠️ server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 1. Page Wrapper for the full-screen gradient
    <div className="page-wrapper">
      
      <div className="glass-card">
        {/* 2. Hero Section */}
        <div className="hero-section">
          <h1 className="gradient-title">Hindi <span className="arrow">→</span> English</h1>
          <p className="subtitle">Powered by Gemini AI • Instant & Accurate</p>
        </div>

        <div className="input-box">
          <textarea
            rows="4"
            placeholder="लिखना शुरू करें... (Start typing in Hindi)"
            value={inpText}
            onChange={(e) => setInpText(e.target.value)}
          />
        </div>

        <button 
          className={`translate-btn ${isLoading ? "loading" : ""}`} 
          onClick={handleTranslate} 
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            "Translate Now"
          )}
        </button>

        {/* 3. Result Box with Animation */}
        {Trans && (
          <div className="result-box slide-up">
            <div className="result-label">English Translation</div>
            <p>{Trans}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
