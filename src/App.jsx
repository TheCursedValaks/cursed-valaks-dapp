import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WalletConnect from './components/WalletConnect';
import Home from './pages/Home';
import CursedRituals from './pages/CursedRituals';
import MyProfile from './pages/MyProfile';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursed-rituals" element={<CursedRituals />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;