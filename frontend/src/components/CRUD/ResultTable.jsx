import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetCRUDTask, useGetFilAutorTask, useGetFilSubtemaTask, useGetFilTipoTask, useGetFilDificultadTask, useGetFilAutorizacionTask, useGetDeleteExercise } from '../../hooks/useGetCRUDTask.js';
import { useGetCodeTask, useGetMOTask } from '../../hooks/useGetTask.js';
import { CustomButton } from '../CustomButton';
import { getDeleteExercise }  from '../../helpers/getCRUDTask.js';
import { CodeExercise } from "./CodeExercise"
import { OMExercise } from "./OMExercise"

export const ResultTable = () => {
  const [step, setStep] = useState(1);

  const [exerciseCodeID, setExerciseCodeID] = useState(null);
  const [exerciseOMID, setExerciseOMID] = useState(null);
  const [exerciseCodeData, setExerciseCodeData] = useState(null);
  const [exerciseOMData, setExerciseOMData] = useState(null);

  const [editStatus, setEditStatus] = useState(null);

  const [dataResult, setDataResult] = useState(['']);
  
  const [autorOptions, setAutorOptions] = useState(['X']);
  const [subtemaOptions, setSubtemaOptions] = useState(['X']);
  const [tipoOptions, setTipoOptions] = useState(['X']);
  const [dificultadOptions, setDificultadOptions] = useState(['X']);
  const [autorizacionOptions, setAutorizacionOptions] = useState(['X']);
  
  const [filtroOptions, setFiltroOptions] = useState(['id_resultado']);
  const [hierOptions, setHierOptions] = useState(['ASC']);
  const { data_code } = useGetCodeTask(exerciseCodeID);
  const { data_om } = useGetMOTask(exerciseOMID);
  const { data_result } = useGetCRUDTask(autorOptions, subtemaOptions, tipoOptions, dificultadOptions, autorizacionOptions, filtroOptions, hierOptions);
  const { data_autor } = useGetFilAutorTask();
  const { data_subtema } = useGetFilSubtemaTask();
  const { data_tipo } = useGetFilTipoTask();
  const { data_dificultad } = useGetFilDificultadTask();
  const { data_autorizacion } = useGetFilAutorizacionTask();
  
  const navigate = useNavigate();
  
  useEffect(() => {
    setDataResult(data_result);
  }, [data_result]);
  
  useEffect(() => {
    if (data_code){
      setExerciseCodeData(data_code);
    }
  }, [data_code]);

  useEffect(() => {
    if (data_om){
      setExerciseOMData(data_om);
    }
  }, [data_om]);

  useEffect(() => {
    if (exerciseCodeData !== null){
      handleNextStep();
    }
  }, [exerciseCodeData]);

  useEffect(() => {
    if (exerciseOMData !== null){
      handleNextStep();
    }
  }, [exerciseOMData]);

  const handleReset = (e) => {
    e.preventDefault();
    setAutorOptions(['X']);
    setSubtemaOptions(['X']);
    setTipoOptions(['X']);
    setDificultadOptions(['X']);
    setAutorizacionOptions(['X']);
    setFiltroOptions(['id_resultado']);
    setHierOptions(['ASC']);
  }
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  const handleDeletion = (id_hand) => (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de que deseas borrar este ejercicio?")) {
      getDeleteExercise(id_hand);
      const newDataResult = dataResult.filter(row => row.id_resultado !== id_hand);
      setDataResult(newDataResult);
    }
  }
  
  const handleEdition = (tipo_hand, id_hand) => (e) => {
    if (tipo_hand === 'Código'){
      setEditStatus('Código');
      setExerciseCodeID(id_hand);
    }else{
      setEditStatus('Opción múltiple');
      setExerciseOMID(id_hand);
    }
  }

  const handleCreation = (e) => {
    e.preventDefault();
    navigate('/CreateExercise');
  }

  if (!dataResult || !data_result || !data_autor || !data_subtema || !data_tipo || !data_dificultad || !data_autorizacion) {
    return <div>Cargando...</div>;
  }

  console.log('informacion del ejercicio jalada', data_code);
  console.log('informacion del ejercicio realmente cargada', exerciseCodeData);

  return (
    <div>
      {step === 1 && (
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
                  Orden:
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
                  <CustomButton 
                  type={'btn btn-primary btn-block'} 
                  text={'Reiniciar filtros'} 
                  func={handleReset}/>
                </th>

                <th scope="col">
                  <CustomButton 
                  type={'btn btn-primary btn-block btn-success'} 
                  text={'Añadir ejercicio'}
                  func={handleCreation}/>
                </th>

              </tr>
            </thead>

            <tbody >
            {dataResult.map((row) => (
              <tr key={row.id_resultado}>
                <td>{row.id_resultado}</td>
                <td>{row.titulo}</td>
                <td>{row.autor}</td>
                <td>{row.subtema}</td>
                <td>{row.tipo_resultado}</td>
                <td>{row.dificultad}</td>
                <td>{row.autorizado_resultado ? "Aprobado" : "Rechazado"}</td>
                <td>
                  <CustomButton 
                    type={'btn btn-primary btn-sm mr-2'} 
                    text={'Editar'} 
                    func={handleEdition(row.tipo_resultado, row.id_resultado)}/>
                  <CustomButton 
                    type={'btn btn-danger btn-sm'} 
                    text={'Borrar'} 
                    func={handleDeletion(row.id_resultado)}/>
                </td>
              </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {step === 2 && editStatus === 'Código' && (
        <CodeExercise 
          id={exerciseCodeID}
          author={exerciseCodeData['author']}
          title={exerciseCodeData['title']}
          description={exerciseCodeData['description']}
          subtema={exerciseCodeData['topic']}
          difficulty={exerciseCodeData['difficulty']}
          driver={exerciseCodeData['driver']}
          tests={exerciseCodeData['tests']}
          onStep={handlePrevStep}
          edicion={true}
        />
      )}
      {step === 2 && editStatus === 'Opción múltiple'&& (
        <OMExercise 
          id={exerciseOMID}
          author={exerciseOMData['author']}
          title={exerciseOMData['title']}
          description={exerciseOMData['description']}
          subtema={exerciseOMData['topic']}
          difficulty={exerciseOMData['difficulty']}
          answer={exerciseOMData['answer']}
          hints={exerciseOMData['hints']}
          options={exerciseOMData['options']}
          onStep={handlePrevStep}
          edicion={true}
        />
      )}
    </div>
  );
};