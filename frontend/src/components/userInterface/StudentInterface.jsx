import { UserDropdown } from '../UserDropdown';
import { CustomNavbar } from "../CustomNavbar";
import { Footer } from "../Footer";

export const StudentInterface = ({user}) => {

  // Links y componentes de Navbar
  const navbar = {
    components: [
      {component: <UserDropdown user={user}/>},
    ]
  }

  return (
    <section className="student-page">

      <CustomNavbar components={navbar.components}/>
      
      <div>Student Interface</div>

      <Footer />
      
    </section>
  )
}
