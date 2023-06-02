import { useState, useEffect } from 'react';
import { CustomButton } from '../CustomButton';
import { ActivityFormat } from './ActivityFormat';
import { ResultTable } from "../CRUD/ResultTable";
import { CodeExercise } from "../CRUD/CodeExercise"
import { OMExercise } from "../CRUD/OMExercise"
import { useGetActivitiesTask, useGetActivityExercises, useGetActivityTask } from '../../hooks/useGetTeacherTask';
import { useGetExerciseTask, useGetFilSubtemaTask, useGetFilTipoTask, useGetFilDificultadTask } from '../../hooks/useGetCRUDTask.js';

export const TeacherActivity = () => {
  const CONID = 1;
  const [step, setStep] = useState(1);
  const [editStatus, setEditStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSaveExercisePopup, setShowSaveExercisePopup] = useState(false);

  const [activityID, setActivityID] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const { data_activity } = useGetActivityTask(activityID);
  const [activityExData, setActivityExData] = useState(null);
  const { data_activity_exercises } = useGetActivityExercises(activityID);

  const [exerciseID, setExerciseID] = useState(null);
  const [exerciseData, setExerciseData] = useState(null);
  const { data_exercise } = useGetExerciseTask(exerciseID);
  
  const [filtroOptions, setFiltroOptions] = useState(['id']);
  const [hierOptions, setHierOptions] = useState(['ASC']);
  const [dataResult, setDataResult] = useState(['']);
  const { data_activities } = useGetActivitiesTask(CONID, filtroOptions, hierOptions);
  
  const [subtemaOption, setSubtemaOption] = useState('');
  const { data_subtema } = useGetFilSubtemaTask();
  const [tipoOption, setTipoOption] = useState('');
  const { data_tipo } = useGetFilTipoTask();
  const [difficultyOption, setDifficultyOption] = useState('');
  const { data_dificultad } = useGetFilDificultadTask();





  //useEffect de la vista general de todas las actividades
  useEffect(() => {
    setDataResult(data_activities);
  }, [data_activities]);

  //useEffect de la vista de una actividad en particular
  useEffect(() => {
    if (data_activity){
      setActivityData(data_activity);
    }
  }, [data_activity]);

  //useEffect de los ejercicios de una vista de una actividad en particular
  useEffect(() => {
    if (data_activity_exercises){
      setActivityExData(data_activity_exercises);
    }
  }, [data_activity_exercises]);

  //useEffect para dar el siguiente step cuando la informacion de la actividad se actualiza
  useEffect(() => {
    if (activityData !== null){
      handleNextStep();
    }
  }, [activityData]);

  //useEffect para reiniciar los estados de la informacion de una actividad cuando vuelve a la pantalla inicial
  useEffect(() => {
    if (step === 1){
      setActivityID(null);
      setActivityData(null);
      setActivityExData(null)
    }
  }, [step]);

  //useEffect de la vista de un ejercicio en particular
  useEffect(() => {
    if (data_exercise){
      setExerciseData(data_exercise);
    }
  }, [data_exercise]);
  
  //useEffect para dar el siguiente step cuando la informacion del ejercicio se actualiza
  useEffect(() => {
    if (exerciseData !== null){
      handleNextStep();
    }
  }, [exerciseData]);

  //useEffect para reiniciar los estados de la informacion de un ejercicio cuando vuelve a la pantalla inicial
  useEffect(() => {
    if (step === 2){
      setExerciseID(null);
      setExerciseData(null);
    }
  }, [step]);

  const handlePrevStep = () => {
    setStep(step - 1);
    setShowPopup(false);
  };
  
  const handleNextStep = () => {
    setStep(step + 1);
    setShowPopup(false);
  };
  
  const handleSaveExercise = () => {
    setStep(2);
    setShowSaveExercisePopup(true);
  };

  const handleCreateActivity = () => {
    setStep(1);
    setShowPopup(true);
  };

  const handleStatusExercise = (id_hand, tipo_hand) => {
    setEditStatus(tipo_hand);
    setExerciseID(id_hand);
  };

  const handleStatusAleatorio = () => {
    setStep(step + 1);
    setEditStatus('Aleatorio');
  };

  const handleStatusNormal = () => {
    setStep(step + 1);
    setEditStatus('Normal');
  };

  const handleStatusEspecífico = () => {
    setStep(step + 1);
    setEditStatus('Específico');
  };

  const handlePrevStepFour = () => {
    setStep(step - 1);
    if (step == 4)
      setEditStatus('Normal');
    else 
      setEditStatus(null);
  };

  const handlePrevStepFive = () => {
    setStep(step - 1);
    if (step == 5)
      setEditStatus('Específico');
    else 
      setEditStatus(null);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setShowSaveExercisePopup(false);
  };

  const handleEdition = (id_hand) => (e) => {
    setActivityID(id_hand);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  };

  console.log("pija", activityData);
  console.log("pijaoz", activityExData);
  console.log('Current step:', step);

  if (!dataResult || !data_activities) {
    return <div>Cargando...</div>;
  }

  return (
    <section id="teacherQuizSection">

      {showPopup && (
        <div className="message-popup">
          <div className="message-content">
            <span>La actividad ha sido creada</span>
            <div className="button-container">
              <button className="btn btn-primary btn-sm" onClick={handlePopupClose}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveExercisePopup && (
        <div className="message-popup">
          <div className="message-content">
            <span>El ejercicio ha sido guardado</span>
            <div className="button-container">
              <button className="btn btn-primary btn-sm" onClick={handlePopupClose}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2>Crear Actividad</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Actividad</th>
                <th scope="col">Fecha</th>
                <th scope="col">Veces completada</th>
                <th scope="col">Promedio grupal</th>
                <th scope="col">
                  Orden:
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
                      <option value="titulo">Actividad</option>
                      <option value="fecha">Fecha</option>
                      <option value="total_intentos">Veces completada</option>
                      <option value="promedio_correctas">Promedio grupal</option>
                    </optgroup>
                    <optgroup label="Descendente">
                      <option value="titulo">Actividad</option>
                      <option value="fecha">Fecha</option>
                      <option value="total_intentos">Veces completada</option>
                      <option value="promedio_correctas">Promedio grupal</option>
                    </optgroup>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataResult.map((row) => (
                <tr key={row.id}>
                  <td>{row.titulo}</td>
                  <td>{formatDate(row.fecha)}</td>
                  <td>{row.total_intentos}</td>
                  <td>{row.promedio_correctas != null ? row.promedio_correctas+"/"+row.total_ejercicios : "-"}</td>
                  <td>
                    <div>
                      <CustomButton
                        type="btn btn-primary btn-sm"
                        text="Editar"
                        func={handleEdition(row.id)}
                      />
                    </div>
                    <div>
                      <CustomButton
                        type="btn btn-danger btn-sm"
                        text="Borrar"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="addMoreActivitiesButton">
            <CustomButton
              type="btn btn-primary btn-lg mr-2"
              text="+"
              func={handleNextStep}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          {activityID && activityData && (
            <ActivityFormat
              onPreviousStep={handlePrevStep}
              onNextStatus={handleStatusNormal}
              onNextExercise={handleStatusExercise}
              onActivityCreation={handleCreateActivity}
              id = {activityData['id']}
              titulo = {activityData['titulo']}
              inicio = {activityData['inicio']}
              fin = {activityData['fin']}
              intentos = {activityData['intentos']}
              bloqueo = {activityData['bloqueo']}
              disponible = {activityData['disponible']}
              visible = {activityData['visible']}
              ejercicios = {activityExData}
            />
          )}
          {(!activityID || !activityData) && (
            <ActivityFormat
              onPreviousStep={handlePrevStep}
              onNextStatus={handleStatusNormal}
              onNextExercise={handleStatusExercise}
              onActivityCreation={handleCreateActivity}
            />
          )}
        </div>
      )}

      {(step === 3 || step === 5) && editStatus === 'Código' && (
        <div>
          <CodeExercise
            id={exerciseID}
            author={exerciseData['archivo']['author']}
            title={exerciseData['archivo']['title']}
            description={exerciseData['archivo']['description']}
            subtema={exerciseData.id_subtema+","+exerciseData['archivo']['topic']}
            difficulty={exerciseData['archivo']['difficulty']}
            driver={exerciseData['archivo']['driver']}
            tests={exerciseData['archivo']['tests']}
            aprobado={exerciseData.autorizado}
            edicion={true}
            onStep={handlePrevStepFive}
          />
        </div>
      )}

      {(step === 3 || step === 5) && editStatus === 'Opción múltiple' && (
        <div>
          <OMExercise
            id={exerciseID}
            author={exerciseData['archivo']['author']}
            title={exerciseData['archivo']['title']}
            description={exerciseData['archivo']['description']}
            subtema={exerciseData.id_subtema+","+exerciseData['archivo']['topic']}
            difficulty={exerciseData['archivo']['difficulty']}
            answer={exerciseData['archivo']['answer']}
            hints={exerciseData['archivo']['hints']}
            options={exerciseData['archivo']['options']}
            aprobado={exerciseData.autorizado}
            edicion={true}
            onStep={handlePrevStepFive}
          />
        </div>
      )}

      {(step === 3 || step === 4) && editStatus === 'Aleatorio' && (
        <div>
        <section id="exerciseChoosingForm" className="container-cc">
          <form>
          <div>
            <div className="text-center mb-4">
              <h3 className="mb-0">Elección de ejercicio</h3>
              <span>Selecciona los rubros que debe cumplir el ejercicio</span>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="tipo" className="text-center">Tipo</label>
              <select 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
                id="tipo" 
                value={tipoOption}
                onChange={(tipovar) => setTipoOption(Array.from(tipovar.target.selectedOptions, option => option.value))}>
                <option value="">Tipo</option>
                {data_tipo.map((row) => (
                  <option key={row.tipo} value={row.tipo}>
                    {row.tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="subtema" className="text-center">Tema</label>
              <select 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
                id="subtema" 
                value={subtemaOption}
                onChange={(subtemavar) => setSubtemaOption(Array.from(subtemavar.target.selectedOptions, option => option.value))}>
                <option value="">Subtema </option>
                {data_subtema.map((row) => (
                  <option key={row.nombre} value={row.nombre}>
                    {row.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="dificultad" className="text-center">Dificultad</label>
              <select 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
                id="dificultad" 
                value={difficultyOption}
                onChange={(dificultadvar) => setDifficultyOption(Array.from(dificultadvar.target.selectedOptions, option => option.value))}>
                <option value="">Dificultad </option>
                {data_dificultad.map((row) => (
                  <option key={row['?column?']} value={row['?column?']}>
                    {row['?column?']}
                  </option>
                ))}
              </select>
            </div>

            <div className="select next-back mt-5">
              <CustomButton
                type="btn mt-3 btnPrimary"
                text="Atrás"
                func={handlePrevStepFour}
              />
              <CustomButton 
                type='btn mt-3 btn-success'
                text='Guardar ejercicio'
                func={handleSaveExercise}
              />
            </div>
          </div>
          </form>
        </section>
        </div>
      )}

      {step === 3 && editStatus === 'Normal' && (
        <section id="exerciseChoosingForm" className="container-cc">
          <form>
          <div>
            <div className="text-center mb-4">
              <h3 className="mb-0">Elección de ejercicio</h3>
              <span>Selecciona el tipo de ejercicio que añadir</span>
            </div>

            <div className="select">
              <CustomButton
                type="btn btnPrimary btnResize"
                text="Específico"
                func={handleStatusEspecífico}
              />
              <CustomButton
                type="btn btnPrimary btnResize"
                text="Aleatorio"
                func={handleStatusAleatorio}
              />
            </div>

            <div className="select next-back mt-5">
              <CustomButton
                type="btn mt-3 btnPrimary"
                text="Atrás"
                func={handlePrevStep}
              />
            </div>
          </div>
          </form>
        </section>
      )}

      {step === 4 && editStatus === 'Específico' && (
        <div>
          <CustomButton
            type="btn mt-3 mb-3 btnPrimary btn-lg"
            text="Atrás"
            func={handlePrevStepFour}
          />
          <ResultTable/>
        </div>
      )}
    </section>
  );
};
