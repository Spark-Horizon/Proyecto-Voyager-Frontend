import { CustomNavbar } from '../components/CustomNavbar';
import { ResultTable } from "../components/CRUD/ResultTable"

import '../styles/forms.css'
import '../styles/adminStyles.css'

export const CRUD = () => {

  // Opciones de cada columna
  const columnOptions = ['', '', '', '', '', ''];

  return (
    <div>
      <ResultTable 
        fil1={'X'}
        fil2={'X'}
        fil3={'X'}
        fil4={'X'}
        fil5={'X'}
        order={'autor'}
        hier={'ASC'}/>
    </div>
  );
}