import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletConnect = () => {
  const { connected } = useWallet();
  return (
    <div>
      <WalletMultiButton />
      {connected && <p style={{ color: '#ff0000' }}>Wallet connected!</p>}
    </div>
  );
};

export default WalletConnect;