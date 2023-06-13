import { CustomNavbar } from "../CustomNavbar";
import { UserDropdown } from '../UserDropdown';
import { useAuth } from '../../hooks/AuthContext';

export const TeacherInterface = () => {

  const { user } = useAuth();

  // Links y componentes de Navbar
  const navbar = {
    components: [{component: <UserDropdown user={user}/>}]
  }

  return (
  
    <section className='teacher-page'>
      
      <CustomNavbar components={navbar.components}/>
      
      <div>Teacher Interface</div>
      
    </section>
  )
}
