import { useState } from 'react';
import { useGetCRUDTask } from '../hooks/useGetTask.js';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';

import '../styles/forms.css'

/* export const CodeInstructions = ({ problem_id }) => {
  const { data } = useGetCodeTask(problem_id);

  if (!data) {
    return <div>Cargando...</div>;
  }

  const { author, title, description, topic, difficulty, tests } = data;

  const formattedTests = tests.map((test) => (
    <tr key={test.id}>
      <td>{test.input}</td>
      <td>{test.output}</td>
    </tr>
  )); */

export const CRUD = ({ fil1, fil2, fil3, fil4, fil5, order, hier }) => {

  // Estados del componente
  const [rows, setRows] = useState([]);

  const { data } = useGetCRUDTask(fil1, fil2, fil3, fil4, fil5, order, hier);

  console.log(data);

  if (!data) {
    return <div>Cargando...</div>;
  }

  const { id_resultado, titulo, autor, subtema, tipo_resultado, dificultad, autorizado_resultado } = data;

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
                <th scope="col">ID: {id_resultado}</th>
                <th scope="col">Título: {titulo}</th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[0]}
                    onChange={(e) => columnOptions[0] = e.target.value}>
                    <option value="">Autor: {autor}</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[1]}
                    onChange={(e) => columnOptions[1] = e.target.value}>
                    <option value="">Subtema: {subtema}</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[2]}
                    onChange={(e) => columnOptions[2] = e.target.value}>
                    <option value="">Tipo: {tipo_resultado}</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[3]}
                    onChange={(e) => columnOptions[3] = e.target.value}>
                    <option value="">Dificultad: {dificultad}</option>
                  </select>
                </th>
                <th scope="col">
                  <select
                    className="form-select form-select-sm"
                    aria-label="Filtro"
                    value={columnOptions[4]}
                    onChange={(e) => columnOptions[4] = e.target.value}>
                    <option value="">Aprobado: {autorizado_resultado}</option>
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
            <option value="Option 1">ID: {id_resultado}</option>
            <option value="Option 2">Título: {titulo}</option>
            <option value="Option 3">Autor: {autor}</option>
            <option value="Option 4">Subtema: {subtema}</option>
            <option value="Option 5">Tipo: {tipo_resultado}</option>
            <option value="Option 6">Dificultad: {dificultad}</option>
            <option value="Option 7">Aprobado: {autorizado_resultado}</option>
          </optgroup>
          <optgroup label="Descendente">
            <option value="Option 8">ID: {id_resultado}</option>
            <option value="Option 9">Título: {titulo}</option>
            <option value="Option 10">Autor: {autor}</option>
            <option value="Option 11">Subtema: {subtema}</option>
            <option value="Option 12">Tipo: {tipo_resultado}</option>
            <option value="Option 13">Dificultad: {dificultad}</option>
            <option value="Option 14">Aprobado: {autorizado_resultado}</option>
          </optgroup>
        </select>
        </div>
      </section>

    </div>
  );
}