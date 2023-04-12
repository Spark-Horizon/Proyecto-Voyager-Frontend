import { Routes, Route } from 'react-router-dom';
import { LandingPage, IDEPage } from '../routes/indexRoutes';

function App() {
  return (
    <Routes>
      <Route path='/landing' element={<LandingPage />}/>
      <Route path='/IDEPage' element={<IDEPage />}/>
    </Routes>
  );
}

export default App;
