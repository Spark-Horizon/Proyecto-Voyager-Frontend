import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, LandingPage, IdePage, SignIn, SignUp, HomePage, MOPage, ResetPassword, AdminSignIn, TeacherQuizzes, Groups } from '../routes/indexRoutes';
import { AuthProvider } from '../hooks/AuthContext';
import { QuizAttempt } from './QuizAttempt/QuizAttempt';

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthProvider setUser={setUser}>
      <Routes>
        <Route path='/'
          element={<PrivateRoute logged={false} children={<LandingPage />} link='/home' />}
        />
        <Route path='/home'
          element={<PrivateRoute logged={true} children={<HomePage user={user}/>} link='/'/>}
        />
        <Route path='/signin'
          element={<PrivateRoute logged={false} children={<SignIn/>} link='/home'/>}
        />
        <Route path='/signup'
          element={<PrivateRoute logged={false} children={<SignUp />} link='/home' />}
        />
        <Route path='/MOPage' element={<MOPage />}/>
        <Route path='/adminsignin'
          element={<PrivateRoute logged={false} children={<AdminSignIn />} link='/home' />}
        />
        <Route path='/resetPassword'
          element={<PrivateRoute logged={false} children={<ResetPassword />} link='/home' />}
        />
        <Route path='/compiler'
          element={<PrivateRoute logged={true} children={<IdePage />} link='/home' />}
        />
        <Route path='/groups'
          element={<PrivateRoute logged={true} children={<Groups user={user} />} link='/' />}
        />
        <Route path='/quizAttempt/:id_activity'
          element={
            <PrivateRoute logged={true} children={<QuizAttempt user={user} />} link='/home' />
          }
        />
        <Route path='/teacherquizzes'
          element={<PrivateRoute logged={false} children={<TeacherQuizzes />} link='/home'/>}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
