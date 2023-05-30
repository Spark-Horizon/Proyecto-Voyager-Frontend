import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, LandingPage, IdePage, SignIn, SignUp, StudentPage, MOPage, ResetPassword, CRUD, AdminSignIn, CreateExercise, EditExercise, ContainerTest, PendingQuizzes, Groups } from '../routes/indexRoutes';
import { useAuth, AuthProvider } from '../hooks/AuthContext';

const user = {
  id: 'A01735335',
  name: 'Francisco',
  lastname1: 'Rocha',
  lastname2: 'Juárez',
  role: 'student'
};

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
        <Route path='/containerTest'
          element={<PrivateRoute logged={false} children={<ContainerTest />} link='/home'/>}
        />
        <Route path='/groups'
          element={<PrivateRoute logged={true} children={<Groups user={user}/>} link='/'/>}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
