import { CustomNavbar } from "../CustomNavbar";
import { UserDropdown } from '../UserDropdown';
import { useAuth } from '../../hooks/AuthContext';
import { ProfessorDashboard } from "../../routes/ProfessorDashboard";

import '../../styles/professor_dashboard/professorDashboard.css';

export const TeacherInterface = () => {

  const { user } = useAuth();

  // Links y componentes de Navbar
  const navbar = {
    components: [{component: <UserDropdown user={user}/>}]
  }

  return (
  
    <section className='teacher-page'>
      
      <CustomNavbar components={navbar.components}/>
      <ProfessorDashboard />
      
    </section>
  )
}
