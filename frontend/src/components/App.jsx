import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, LandingPage, IdePage, SignIn, SignUp, HomePage, MOPage, ResetPassword, CRUD, AdminSignIn, CreateExercise, EditExercise } from '../routes/indexRoutes';
import { AuthProvider } from '../hooks/AuthContext';

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthProvider setUser={setUser}>
      <Routes>
        <Route path='/'
          element={<PrivateRoute logged={false} children={<LandingPage />} link='/home'/>}
        />
        <Route path='/home'
          element={<PrivateRoute logged={true} children={<HomePage user={user}/>} link='/'/>}
        />
        <Route path='/signin'
          element={<PrivateRoute logged={false} children={<SignIn/>} link='/home'/>}
        />
        <Route path='/signup'
          element={<PrivateRoute logged={false} children={<SignUp />} link='/home'/>}
        />
        <Route path='/resetPassword' element={<ResetPassword />}/>
        <Route path='/compiler' element={<IdePage />}/>
        <Route path='/MOPage' element={<MOPage />}/>
        <Route path='/crud'
          element={<PrivateRoute logged={true} children={<CRUD />} link='/home'/>}
        />
        <Route path='/createexercise'
          element={<PrivateRoute logged={true} children={<CreateExercise />} link='/home'/>}
        />
        <Route path='/editexercise'
          element={<PrivateRoute logged={true} children={<EditExercise />} link='/home'/>}
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
