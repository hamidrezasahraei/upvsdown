import React, { useEffect, useState } from 'react';
import './App.css';

// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Expands the app to full screen

const App: React.FC = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const generateRandomPrice = () => {
      // Generate a random price between $1.00 and $10.00
      const randomPrice = (Math.random() * (10 - 1) + 1).toFixed(2);
      setPrice(parseFloat(randomPrice));
      setLoading(false);
    };

    // Generate price every 10 seconds
    generateRandomPrice();
    const interval = setInterval(generateRandomPrice, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleBetUp = () => {
    tg.MainButton.text = "You bet on price UP!";
    tg.MainButton.show();
  };

  const handleBetDown = () => {
    tg.MainButton.text = "You bet on price DOWN!";
    tg.MainButton.show();
  };

  return (
    <div className="app-container">
      <h1>TON Price Betting</h1>
      {loading ? (
        <p>Loading price...</p>
      ) : (
        <div className="price-container">
          <h2>Current TON Price: ${price?.toFixed(2)}</h2>
        </div>
      )}

      <div className="buttons-container">
        <button className="bet-button bet-up" onClick={handleBetUp}>
          Bet on UP
        </button>
        <button className="bet-button bet-down" onClick={handleBetDown}>
          Bet on DOWN
        </button>
      </div>
    </div>
  );
};

export default App;
