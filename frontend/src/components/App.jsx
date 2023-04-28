import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, LandingPage, IdePage, SignIn, SignUp, StudentPage, ResetPassword, CRUD, AdminSignIn } from '../routes/indexRoutes';
import { useAuth, AuthProvider } from '../hooks/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/'
          element={<PrivateRoute logged={false} children={<LandingPage />} link='/home'/>}
        />
        <Route path='/home'
          element={<PrivateRoute logged={true} children={<StudentPage />} link='/'/>}
        />
        <Route path='/signin'
          element={<PrivateRoute logged={false} children={<SignIn />} link='/home'/>}
        />
        <Route path='/signup'
          element={<PrivateRoute logged={false} children={<SignUp />} link='/home'/>}
        />
        <Route path='/crud'
          element={<PrivateRoute logged={true} children={<CRUD />} link='/home'/>}
        />
        <Route path='/adminsignin'
          element={<PrivateRoute logged={false} children={<AdminSignIn />} link='/home'/>}
        />
        <Route path='/resetPassword'
          element={<PrivateRoute logged={false} children={<ResetPassword />} link='/home'/>}
        />
        <Route path='/compiler'
          element={<PrivateRoute logged={true} children={<IdePage />} link='/home'/>}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
