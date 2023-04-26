import { useState } from 'react';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';

import '../styles/forms.css'
import '../styles/buttons.css'

export const CRUD = () => {

  // Estados del componente
  const [rows, setRows] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');

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
  const filterOptions = ['Título', 'Autor', 'Subtema', 'Tipo', 'Dificultad', 'Aprobado'];

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
                <th scope="col">Autor</th>
                <th scope="col">Subtema</th>
                <th scope="col">Tipo</th>
                <th scope="col">Dificultad</th>
                <th scope="col">Aprobado</th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}>

                    <option value="" disabled>Filtrar por:</option>
                        {filterOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                  </select>
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.filter((row) => selectedFilter === '' || row[selectedFilter] !==selectedFilter).map((row) => (
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
                        text={'Borrar'}
                        func={() => handleDelete(row.id)} />
                    </td>
                </tr>
                ))}
            </tbody>
          </table>
            <CustomButton
                type={'btn btn-primary btn-block'}
                text={'Añadir fila'}
                func={() => setRows([...rows, {id: rows.length + 1, col1: rows.length + 1, col2: '', col3: '', col4: '', col5: '', col6: '', col7: ''}])} />
        </div>
      </section>

    </div>
  );
}