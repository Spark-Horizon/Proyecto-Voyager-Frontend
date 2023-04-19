import { Routes, Route } from 'react-router-dom';
import { LandingPage, IdePage, SignIn, SignUp, StudentPage, ResetPassword } from '../routes/indexRoutes';

function App() {
  return (
    <Routes>
      <Route path='/landing' element={<LandingPage />}/>
      <Route path='/compiler' element={<IdePage />}/>
      <Route path='/signin' element={<SignIn />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/studentPage' element={<StudentPage />}/>
      <Route path='/resetPassword' element={<ResetPassword />}/>
    </Routes>
  );
}

export default App;
