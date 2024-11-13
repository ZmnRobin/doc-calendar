import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/year/:year/month/:month" element={<Calendar />} />
        <Route path="/" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
