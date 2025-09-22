import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { publicKey } = useWallet();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const launchDate = new Date('2025-10-18T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = launchDate - now;
    return difference > 0 ? Math.floor(difference / 1000) : 0;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${mins}m ${secs}s`;
  };

  // Mock Sol balance (replace with real API call later)
  const mockSolBalance = publicKey ? '10.5 SOL' : 'N/A';

  return (
    <div className="home-layout">
      <div className="container">
        <h1>Welcome to The Cursed Valaks</h1>
        <p className="launch-timer">Time Until Launch (Oct 18, 2025): <span className="timer-value">{formatTime(timeLeft)}</span></p>
      </div>
      {publicKey && (
        <div className="side-panel">
          <p>Sol Balance: {mockSolBalance}</p>
          <Link to="/cursed-lock">Enter Cursed Lock</Link>
        </div>
      )}
    </div>
  );
};

export default Home;