import { useState } from 'react';
import { useGetCRUDTask, useGetFilAutorTask, useGetFilSubtemaTask, useGetFilTipoTask, useGetFilDificultadTask, useGetFilAutorizacionTask } from '../../hooks/useGetCRUDTask.js';
import { CustomButton } from '../CustomButton';

export const ResultTable = ({ fil1, fil2, fil3, fil4, fil5, order, hier }) => {
  // Estados del componente
  const [rows, setRows] = useState([]);
  const [columnOptions, setColumnOptions] = useState([]);
  const [autorOptions, setAutorOptions] = useState(['X']);
  const [subtemaOptions, setSubtemaOptions] = useState(['X']);
  const [tipoOptions, setTipoOptions] = useState(['X']);
  const [dificultadOptions, setDificultadOptions] = useState(['X']);
  const [autorizacionOptions, setAutorizacionOptions] = useState(['X']);
  const [filtroOptions, setFiltroOptions] = useState(['id_resultado']);
  const [hierOptions, setHierOptions] = useState(['ASC']);

  const handleReset = (e) => {
    e.preventDefault();
    setAutorOptions(['X']);
    setSubtemaOptions(['X']);
    setTipoOptions(['X']);
    setDificultadOptions(['X']);
    setAutorizacionOptions(['X']);
    setFiltroOptions(['X']);
    setHierOptions(['X']);
  }

  // Funcionalidades del componente
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas borrar esta fila?")) {
      setRows(rows.filter(row => row.id !== id));
    }
  }

  const { data_result } = useGetCRUDTask(autorOptions, subtemaOptions, tipoOptions, dificultadOptions, autorizacionOptions, filtroOptions, hierOptions);
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

  console.log('webos', autorOptions);
  console.log('webos', subtemaOptions);
  console.log('webos', tipoOptions);
  console.log('webos', dificultadOptions);
  console.log('webos', autorizacionOptions);


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
                  value={filtroOptions}
                  onChange={(filtrovar) => {
                    setFiltroOptions(Array.from(filtrovar.target.selectedOptions, option => option.value))
                    const selectedOption = filtrovar.target.selectedOptions[0];
                    if (selectedOption.parentElement.label === "Ascendente") {
                      setHierOptions(['ASC']);
                    } else if (selectedOption.parentElement.label === "Descendente") {
                      setHierOptions(['DESC']);
                    }
                  }}
                >
                  <option value="">Orden</option>
                  <optgroup label="Ascendente">
                    <option value="id_resultado">ID</option>
                    <option value="titulo">Título</option>
                    <option value="autor">Autor</option>
                    <option value="subtema">Subtema</option>
                    <option value="tipo_resultado">Tipo</option>
                    <option value="dificultad">Dificultad</option>
                    <option value="autorizado_resultado">Aprobado</option>
                  </optgroup>
                  <optgroup label="Descendente">
                    <option value="id_resultado">ID</option>
                    <option value="titulo">Título</option>
                    <option value="autor">Autor</option>
                    <option value="subtema">Subtema</option>
                    <option value="tipo_resultado">Tipo</option>
                    <option value="dificultad">Dificultad</option>
                    <option value="autorizado_resultado">Aprobado</option>
                  </optgroup>
                </select>
                </div>
              </section>
            </th>

            <th scope="col">
              <CustomButton type={'btn btn-primary btn-block'} text={'Reiniciar filtros'} onClick={() => handleReset()}/>
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
