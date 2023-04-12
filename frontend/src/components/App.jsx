import { Routes, Route } from 'react-router-dom';
import { LandingPage, IdePage } from '../routes/indexRoutes';

function App() {
  return (
    <Routes>
      <Route path='/landing' element={<LandingPage />}/>
      <Route path='/compiler' element={<IdePage />}/>
    </Routes>
  );
}

export default App;
