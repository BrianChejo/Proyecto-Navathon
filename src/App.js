import './App.css';
import Home from './Pages/Home';
import Default from './Pages/Default';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="*" element={<Default />} />
      </Routes>
    </Router>
  );
}

export default App;
