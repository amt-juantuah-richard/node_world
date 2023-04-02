import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Signup /> } />
          <Route path="/" element={<Homepage />} />
          <Route path='*' element={ <Login /> } />
        </Routes>
    </div>
  );
}

export default App;
