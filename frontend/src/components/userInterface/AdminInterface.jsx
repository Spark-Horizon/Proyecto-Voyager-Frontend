import { CustomNavbar } from "../CustomNavbar";
import { Footer } from "../Footer";
import { UserDropdown } from '../UserDropdown';
import { ResultTable } from "../CRUD/ResultTable";
import { useAuth } from '../../hooks/AuthContext';

import '../../styles/forms.css'
import '../../styles/adminStyles.css'

export const AdminInterface = () => {

  const { user } = useAuth();

  // Links y componentes de Navbar
  const navbar = {
    components: [{component: <UserDropdown user={user}/>}]
  }

  return (
    <section id="crudSection">

      <CustomNavbar components={navbar.components}/>
      <ResultTable
      rol={'Administrador'}/>

      <Footer/>

    </section>
  )
}
