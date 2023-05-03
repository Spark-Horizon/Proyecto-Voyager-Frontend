import { CustomNavbar } from '../components/CustomNavbar';
import { ResultTable } from "../components/CRUD/ResultTable"

import '../styles/forms.css'

export const CRUD = () => {
  // Links y componentes de Navbar
  const links = [];
  const components = [];

  // Opciones de cada columna
  const columnOptions = ['', '', '', '', '', ''];

  return (
    <div>
      <CustomNavbar links={links} components={components}/>
      <ResultTable 
        fil1={'X'}
        fil2={'X'}
        fil3={'X'}
        fil4={'X'}
        fil5={'X'}
        order={'autor'}
        hier={'ASC'}/>
      <section id="crudPage" className='container-cc'>
        <div>
        <select
          className="form-select form-select-sm"
          aria-label="Filtro"
          value={columnOptions[5]}
          onChange={(e) => columnOptions[5] = e.target.value}>
          <option value="">Filtros</option>
          <optgroup label="Ascendente">
            <option value="Option 1">ID</option>
            <option value="Option 2">Título</option>
            <option value="Option 3">Autor</option>
            <option value="Option 4">Subtema</option>
            <option value="Option 5">Tipo</option>
            <option value="Option 6">Dificultad</option>
            <option value="Option 7">Aprobado</option>
          </optgroup>
          <optgroup label="Descendente">
            <option value="Option 8">ID</option>
            <option value="Option 9">Título</option>
            <option value="Option 10">Autor</option>
            <option value="Option 11">Subtema</option>
            <option value="Option 12">Tipo</option>
            <option value="Option 13">Dificultad</option>
            <option value="Option 14">Aprobado</option>
          </optgroup>
        </select>
        </div>
      </section>

    </div>
  );
}