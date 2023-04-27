import { useState } from 'react';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';

import '../styles/forms.css'

export const CRUD = () => {

  // Estados del componente
  const [rows, setRows] = useState([]);

  // Funcionalidades del componente
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas borrar esta fila?")) {
      setRows(rows.filter(row => row.id !== id));
    }
  }

  // Links y componentes de Navbar
  const links = [];
  const components = [];

  // Opciones de cada columna
  const columnOptions = ['', '', '', '', '', ''];

  return (
    <div>
      <CustomNavbar links={links} components={components}/>

      <section id="crudPage" className='container-cc'>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Título</th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[0]}
                    onChange={(e) => columnOptions[0] = e.target.value}>
                    <option value="">Autor</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[1]}
                    onChange={(e) => columnOptions[1] = e.target.value}>
                    <option value="">Subtema</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[2]}
                    onChange={(e) => columnOptions[2] = e.target.value}>
                    <option value="">Tipo</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[3]}
                    onChange={(e) => columnOptions[3] = e.target.value}>
                    <option value="">Dificultad</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[4]}
                    onChange={(e) => columnOptions[4] = e.target.value}>
                    <option value="">Aprobado</option>
                  </select>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>
              {rows.filter((row) => true).map((row) => (
                <tr key={row.id}>
                    <td>{row.col0}</td>
                    <td>{row.col1}</td>
                    <td>{row.col2}</td>
                    <td>{row.col3}</td>
                    <td>{row.col4}</td>
                    <td>{row.col5}</td>
                    <td>{row.col6}</td>
                    <td>
                    <CustomButton
                        type={'btn btn-primary btn-sm mr-2'}
                        text={'Editar'}/>
                    <CustomButton
                        type={'btn btn-danger btn-sm'}
                        text={'Borrar'}/>
                    </td>
                </tr>
                ))}
            </tbody>
          </table>
            <CustomButton
                type={'btn btn-primary btn-block'}
                text={'Añadir fila'}/>
        </div>
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