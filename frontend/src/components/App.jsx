import { Routes, Route } from 'react-router-dom';
import { LandingPage } from '../routes/LandingPage';

function App() {
  return (
    <Routes>
      <Route path='/landing' element={<LandingPage />}/>
    </Routes>
  );
}

export default App;
