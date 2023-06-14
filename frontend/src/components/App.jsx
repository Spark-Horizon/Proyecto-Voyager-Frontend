import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, LandingPage, IdePage, SignIn, SignUp, HomePage, MOPage, ResetPassword, AdminSignIn, TeacherQuizzes } from '../routes/indexRoutes';
import { AuthProvider } from '../hooks/AuthContext';
import { QuizView } from './QuizStudent/QuizView';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/'
          element={<PrivateRoute logged={false} children={<LandingPage />} link='/home' />}
        />
        <Route path='/home'
          element={<PrivateRoute logged={true} children={<HomePage/>} link='/'/>}
        />
        <Route path='/signin'
          element={<PrivateRoute logged={false} children={<SignIn/>} link='/home'/>}
        />
        <Route path='/signup'
          element={<PrivateRoute logged={false} children={<SignUp/>} link='/home' />}
        />
        <Route path='/MOPage' element={<MOPage />}/>
        <Route path='/adminsignin'
          element={<PrivateRoute logged={false} children={<AdminSignIn/>} link='/home' />}
        />
        <Route path='/resetPassword'
          element={<PrivateRoute logged={false} children={<ResetPassword/>} link='/home' />}
        />
        <Route path='/compiler'
          element={<PrivateRoute logged={true} children={<IdePage />} link='/home' />}
        />
        <Route path='/teacherquizzes'
          element={<PrivateRoute logged={false} children={<TeacherQuizzes/>} link='/home'/>}
        />
        <Route path='/quizpage/:id_activity'
          element={
            <PrivateRoute logged={true} link='/home'>
              <QuizView />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
