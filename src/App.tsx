import React, { useEffect, useState } from 'react';
import './App.css';

// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Expands the app to full screen

const App: React.FC = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Apply theme based on Telegram's themeParams
    const themeParams = tg.themeParams;
    if (themeParams) {
      document.documentElement.style.setProperty('--telegram-background-color', themeParams.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--telegram-text-color', themeParams.text_color || '#000000');
      document.documentElement.style.setProperty('--telegram-button-color', themeParams.button_color || '#0088cc');
      document.documentElement.style.setProperty('--telegram-button-text-color', themeParams.button_text_color || '#ffffff');

      // Adjust the box background based on the detected theme (light or dark)
      const boxBackgroundColor = themeParams.bg_color && themeParams.bg_color.toLowerCase() === '#000000' ? '#333333' : '#f9f9f9';
      document.documentElement.style.setProperty('--box-background-color', boxBackgroundColor);
    }

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
    tg.requestStarPayment({
      slug: 'your-bot-username', // Replace with your bot's username
      amount: 10,
      payload: 'bet_up_10_stars', // Custom payload to track the payment
    }).then(() => {
      tg.MainButton.text = "You successfully bet on UP!";
      tg.MainButton.show();
    }).catch((error: any) => {
      tg.MainButton.text = "Payment failed!";
      tg.MainButton.show();
      console.error('Payment Error:', error);
    });
  };

  const handleBetDown = () => {
    tg.requestStarPayment({
      slug: 'your-bot-username', // Replace with your bot's username
      amount: 10,
      payload: 'bet_down_10_stars', // Custom payload to track the payment
    }).then(() => {
      tg.MainButton.text = "You successfully bet on DOWN!";
      tg.MainButton.show();
    }).catch((error: any) => {
      tg.MainButton.text = "Payment failed!";
      tg.MainButton.show();
      console.error('Payment Error:', error);
    });
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
          Bet on UP (10 stars)
        </button>
        <button className="bet-button bet-down" onClick={handleBetDown}>
          Bet on DOWN (10 stars)
        </button>
      </div>
    </div>
  );
};

export default App;
