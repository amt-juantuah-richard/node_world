import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Details from './pages/Details';
// import { ThemeContext } from './Theme';

function App() {
  // const { theme } = useContext(ThemeContext)
  return (
    <div className="App">
      <Routes>
        <Route path="/:capital" element={<Details />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
