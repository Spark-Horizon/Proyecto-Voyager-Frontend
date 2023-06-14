import { UserDropdown } from '../UserDropdown';

import { CustomNavbar } from '../CustomNavbar';
import { Footer } from '../Footer';
import { StudentDashboard } from '../../routes/StudentDashboard';

export const StudentInterface = () => {

  // Links y componentes de Navbar
  const navbar = {
    components: [
      {component: <UserDropdown/>},
    ]
  };

  return (
    <section id='student-interface'>
      <CustomNavbar components={navbar.components}/>
      <div className="startSection">
        <StudentDashboard />
      </div>
      <Footer/>
    </section>
  );
}
