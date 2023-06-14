import { UserDropdown } from '../UserDropdown';

import { useAuth } from '../../hooks/AuthContext';
import { CustomNavbar } from '../CustomNavbar';
import { StudentDashboard } from '../../routes/StudentDashboard';

export const StudentInterface = () => {

  const { user } = useAuth();

  // Links y componentes de Navbar
  const navbar = {
    components: [
      {component: <UserDropdown/>},
    ]
  };

  // Tabs

  return (
    <section id='activitiesPage'>
      <CustomNavbar components={navbar.components}/>
      <StudentDashboard />
    </section>
  );
}
