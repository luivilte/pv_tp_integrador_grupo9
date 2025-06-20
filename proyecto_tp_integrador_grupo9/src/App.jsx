import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  return (
    <>
      <nav>
        <a href="/">Inicio</a> | <a href="/favoritos">Favoritos</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
