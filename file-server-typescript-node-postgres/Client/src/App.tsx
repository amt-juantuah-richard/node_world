import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Reset from './pages/Reset';
import Signup from './pages/Signup';
import { useState } from 'react';
import Verification from './pages/Verification';

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Signup /> } />
          <Route path='/reset' element={ <Reset /> } />
          <Route path='/verify/:username/:email/:token' element={ <Verification /> } />
          <Route path="/" element={<Homepage />} />
          <Route path='*' element={ <Login /> } />
        </Routes>
    </div>
  );
}

export default App;
