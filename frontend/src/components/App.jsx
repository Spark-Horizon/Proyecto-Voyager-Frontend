import { Routes, Route } from 'react-router-dom';
import { PrivateRoute, LandingPage, IdePage, SignIn, SignUp, StudentPage, MOPage, ResetPassword, CRUD, AdminSignIn, PendingPage, SummaryPage, TeacherQuizzes } from '../routes/indexRoutes';
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
        <Route path='/resetPassword' element={<ResetPassword />}/>
        <Route path='/compiler' element={<IdePage />}/>
        <Route path='/MOPage' element={<MOPage />}/>
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
        <Route path='/pendingpage'
          element={<PrivateRoute logged={false} children={<PendingPage />} link='/home'/>}
        />
        <Route path='/summarypage'
          element={<PrivateRoute logged={false} children={<SummaryPage />} link='/home'/>}
        />
        <Route path='/teacherquizzes'
          element={<PrivateRoute logged={false} children={<TeacherQuizzes />} link='/home'/>}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
