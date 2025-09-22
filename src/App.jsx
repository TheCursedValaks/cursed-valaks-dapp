import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CursedLock from './pages/CursedLock';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursed-lock" element={<CursedLock />} />
        <Route path="/cursed-rituals" element={<div>Cursed Rituals Page</div>} />
        <Route path="/my-profile" element={<div>My Profile Page</div>} />
      </Routes>
    </>
  );
}

export default App;