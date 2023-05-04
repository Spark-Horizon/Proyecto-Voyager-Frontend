import { useState } from 'react';
import { useGetCRUDTask, useGetFilAutorTask, useGetFilSubtemaTask, useGetFilTipoTask, useGetFilDificultadTask, useGetFilAutorizacionTask } from '../../hooks/useGetCRUDTask.js';
import { CustomButton } from '../CustomButton';

export const ResultTable = ({ fil1, fil2, fil3, fil4, fil5, order, hier }) => {
  // Estados del componente
  const [rows, setRows] = useState([]);
  const [columnOptions, setColumnOptions] = useState([]);
  const [autorOptions, setAutorOptions] = useState([]);
  const [subtemaOptions, setSubtemaOptions] = useState([]);
  const [tipoOptions, setTipoOptions] = useState([]);
  const [dificultadOptions, setDificultadOptions] = useState([]);
  const [autorizacionOptions, setAutorizacionOptions] = useState([]);

  // Funcionalidades del componente
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas borrar esta fila?")) {
      setRows(rows.filter(row => row.id !== id));
    }
  }

  const { data_result } = useGetCRUDTask(fil1, fil2, fil3, fil4, fil5, order, hier);
  const { data_autor } = useGetFilAutorTask();
  const { data_subtema } = useGetFilSubtemaTask();
  const { data_tipo } = useGetFilTipoTask();
  const { data_dificultad } = useGetFilDificultadTask();
  const { data_autorizacion } = useGetFilAutorizacionTask();

  console.log(data_result);
  console.log(data_autor);
  console.log(data_subtema);
  console.log(data_tipo);
  console.log(data_dificultad);
  console.log(data_autorizacion);

  if (!data_result || !data_autor || !data_subtema || !data_tipo || !data_dificultad || !data_autorizacion) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>

            <th scope="col">ID:</th>
            <th scope="col">Título:</th>

            <th scope="col">
              <select
                className="form-select form-select-sm multiselect-dropdown"
                aria-label="Filtro"
                multiple
                value={autorOptions}
                onChange={(autorvar) => setAutorOptions(Array.from(autorvar.target.selectedOptions, option => option.value))} >
                <option value="">Autor: </option>
                {data_autor.map((row) => (
                  <option key={row['?column?']} value={row['?column?']}>
                    {row['?column?']}
                  </option>
                ))}
              </select>
            </th>

            <th scope="col">
              <select
                className="form-select form-select-sm multiselect-dropdown"
                aria-label="Filtro"
                multiple
                value={subtemaOptions}
                onChange={(subtemavar) => setSubtemaOptions(Array.from(subtemavar.target.selectedOptions, option => option.value))}>
                <option value="">Subtema: </option>
                {data_subtema.map((row) => (
                  <option key={row.nombre} value={row.nombre}>
                    {row.nombre}
                  </option>
                ))}
              </select>
            </th>

            <th scope="col">
              <select
                className="form-select form-select-sm multiselect-dropdown"
                aria-label="Filtro"
                multiple
                value={tipoOptions}  
                onChange={(tipovar) => setTipoOptions(Array.from(tipovar.target.selectedOptions, option => option.value))}>
                <option value="">Tipo: </option>  
                {data_tipo.map((row) => (
                  <option key={row.tipo} value={row.tipo}>
                    {row.tipo}
                  </option>
                ))}
              </select>
            </th>

            <th scope="col">
              <select
                className="form-select form-select-sm multiselect-dropdown"
                aria-label="Filtro"
                multiple
                value={dificultadOptions}
                onChange={(dificultadvar) => setDificultadOptions(Array.from(dificultadvar.target.selectedOptions, option => option.value))}>
                <option value="">Dificultad: </option>
                {data_dificultad.map((row) => (
                  <option key={row['?column?']} value={row['?column?']}>
                    {row['?column?']}
                  </option>
                ))}
              </select>
            </th>

            <th scope="col">
              <select
                className="form-select form-select-sm multiselect-dropdown"
                aria-label="Filtro"
                multiple
                value={autorizacionOptions}
                onChange={(autorizadovar) => setAutorizacionOptions(Array.from(autorizadovar.target.selectedOptions, option => option.value))}>
                <option value="">Aprobación: </option>
                {data_autorizacion.map((row) => (
                  <option key={row.autorizado} value={row.autorizado}>
                    {row.autorizado ? "Aprobado" : "Rechazado"}
                  </option>
                ))}
              </select>
            </th>

            <th scope="col">
              <section id="crudPage" className='container-cc'>
                <div>
                <select
                  className="form-select form-select-sm"
                  aria-label="Filtro"
                  value={columnOptions[0]}
                  onChange={(e) => columnOptions[0] = e.target.value}>
                  <option value="">Orden</option>
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
            </th>

            <th scope="col">
              <CustomButton type={'btn btn-primary btn-block'} text={'Aplicar filtros'} />
            </th>

            <th scope="col">
              <CustomButton type={'btn btn-primary btn-block btn-success'} text={'Añadir ejercicio'}/>
            </th>

          </tr>
        </thead>

        <tbody>
        {data_result.map((row) => (
          <tr key={row.id_resultado}>
            <td>{row.id_resultado}</td>
            <td>{row.titulo}</td>
            <td>{row.autor}</td>
            <td>{row.subtema}</td>
            <td>{row.tipo_resultado}</td>
            <td>{row.dificultad}</td>
            <td>{row.autorizado_resultado ? "Aprobado" : "Rechazado"}</td>
            <td>
              <CustomButton type={'btn btn-primary btn-sm mr-2'} text={'Editar'} />
              <CustomButton type={'btn btn-danger btn-sm'} text={'Borrar'} onClick={() => handleDelete(row.id_resultado)} />
            </td>
          </tr>
            ))}
        </tbody>

      </table>
    </div>
  );
};
