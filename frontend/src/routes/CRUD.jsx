import { useState } from 'react';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';

import '../styles/forms.css'
import '../styles/buttons.css'

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

  // Opciones de filtro

  // Opciones de cada columna
  const columnOptions = ['', '', '', '', '', '', ''];

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
                    value={columnOptions[1]}
                    onChange={(e) => columnOptions[1] = e.target.value}>
                    <option value="">Autor</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[2]}
                    onChange={(e) => columnOptions[2] = e.target.value}>
                    <option value="">Subtema</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[3]}
                    onChange={(e) => columnOptions[3] = e.target.value}>
                    <option value="">Tipo</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[4]}
                    onChange={(e) => columnOptions[4] = e.target.value}>
                    <option value="">Dificultad</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[5]}
                    onChange={(e) => columnOptions[5] = e.target.value}>
                    <option value="">Aprobado</option>
                  </select>
                </th>
                <th scope="col"></th>
              </tr>
            </thead>

            <tbody>
              {rows.filter((row) => true).map((row) => (
                <tr key={row.id}>
                    <td>{row.col1}</td>
                    <td>{row.col2}</td>
                    <td>{row.col3}</td>
                    <td>{row.col4}</td>
                    <td>{row.col5}</td>
                    <td>{row.col6}</td>
                    <td>{row.col7}</td>
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
      </section>

    </div>
  );
}