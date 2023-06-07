import { StudentInterface } from '../components/userInterface/StudentInterface';
import { TeacherInterface } from '../components/userInterface/TeacherInterface';
import { AdminInterface } from '../components/userInterface/AdminInterface';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/AuthContext';

import '../styles/studentPage.css';

export const HomePage = () => {

  // Obtiene las funcionalidades proporcionadas por el contexto de autenticación
  const { logout } = useAuth();
  const { user } = useAuth();
  
  // Obtiene la función navigate para redireccionar a otras páginas
  const navigate = useNavigate();

  // Funcionalidad para manejar el cierre de sesión
  async function handleLogout() {
    try {
      await logout();
      navigate('/'); // Redirige a la página principal después de cerrar sesión

    } catch (error) {
      console.error("Failed to log out", error);
      // Aquí puedes manejar el error, por ejemplo mostrando un mensaje al usuario
    }
  }

  // Verifica si el usuario está definido antes de intentar acceder a sus propiedades
  if (!user) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras el usuario está indefinido
  }

  // Muestra diferentes interfaces dependiendo del rol del usuario
  switch(user.role){
    case 'student':
      return (
        <StudentInterface user={user}/>
      )
    case 'teacher':
      return (
        <TeacherInterface user={user}/>
      )
    case 'admin':
      return(
        <AdminInterface user={user}/>
      )
    default:
      return(
        // Si el rol del usuario no se reconoce, pide al usuario que cierre sesión y vuelva a iniciarla
        <section>
          <p>No se pudo identificar el rol del usuario. Por favor, inicie sesión de nuevo.</p>
          <CustomButton type={'btn btn-sm btnPrimary'} text={'Cerrar sesión'} func={handleLogout}/>
        </section>
      )
  }
}