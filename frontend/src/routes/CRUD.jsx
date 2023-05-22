import { CustomNavbar } from '../components/CustomNavbar';
import { ResultTable } from "../components/CRUD/ResultTable"

import '../styles/forms.css'
import '../styles/adminStyles.css'

export const CRUD = () => {
    // Links y componentes de Navbar
    const links = [];
    const components = [];

    return (
      <div>
        <CustomNavbar links={links} components={components}/>
        <ResultTable/>
      </div>
    );
}