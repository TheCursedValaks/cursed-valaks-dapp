import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const Home = () => {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const [solBalance, setSolBalance] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (connected && publicKey) {
      connection.getBalance(publicKey).then((balance) => setSolBalance(balance / LAMPORTS_PER_SOL));
    }

    // Countdown to October 11, 2025, 12:00 UTC
    const targetDate = new Date('2025-10-11T12:00:00Z').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        setTimeLeft('The Cursed Valaks is live!');
        clearInterval(timer);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [connected, publicKey, connection]);

  return (
    <div className="home-layout">
      <div className="container">
        <h1>Welcome to The Cursed Valaks</h1>
        <p>Enter the horror realm...</p>
        <p style={{ marginTop: '20px' }}><span style={{ color: '#ff0000' }}>The Cursed Valaks goes live:</span> <span style={{ color: '#ffffff' }}>{timeLeft}</span></p>
      </div>
      {connected && (
        <div className="side-panel">
          <h3>User Profile</h3>
          <p><span style={{ color: '#ff0000' }}>Sol Balance:</span> <span style={{ color: '#ffffff' }}>{solBalance.toFixed(4)} SOL</span></p>
          <p><span style={{ color: '#ff0000' }}>SpectraX Balance:</span> <span style={{ color: '#ffffff' }}>Coming soon...</span></p>
          <p><span style={{ color: '#ff0000' }}>Rituals Total:</span> <span style={{ color: '#ffffff' }}>Coming soon...</span></p>
        </div>
      )}
    </div>
  );
};

export default Home;