import { useState, useEffect } from 'react';
import { CustomButton } from '../CustomButton';
import { ActivityFormat } from './ActivityFormat';
import { ResultTable } from "../CRUD/ResultTable";
import { CodeExercise } from "../CRUD/CodeExercise"
import { OMExercise } from "../CRUD/OMExercise"
import { RandomExercise } from "../CRUD/RandomExercise"
import { useGetActivitiesTask, useGetActivityExercises, useGetActivityTask } from '../../hooks/useGetTeacherTask';
import { useGetExerciseTask } from '../../hooks/useGetCRUDTask.js';
import { getDeleteActivity } from '../../helpers/getTeacherTask';

export const TeacherActivity = (props) => {
  const [step, setStep] = useState(1);
  const [editStatus, setEditStatus] = useState(null);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showSaveExercisePopup, setShowSaveExercisePopup] = useState(false);
  const [showEditExercisePopup, setShowEditExercisePopup] = useState(false);

  const [activityID, setActivityID] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const { data_activity } = useGetActivityTask(activityID);
  const [activityExData, setActivityExData] = useState(null);
  const [editBlocks, setEditBlocks] = useState(null);
  const [editCheck, setEditCheck] = useState(false);
  const { data_activity_exercises, loading_activityEx, refetchDataActivityExercises } = useGetActivityExercises(activityID);

  const [exerciseID, setExerciseID] = useState(null);
  const [exerciseData, setExerciseData] = useState(null);
  const [exerciseIndex, setExerciseIndex] = useState(null);
  const { data_exercise } = useGetExerciseTask(exerciseID);

  const [titleOption, setTitleOption] = useState(activityData ? activityData['titulo'] : '');
  const [inicioOption, setInicioOption] = useState(activityData ? activityData['inicio'] : '');
  const [finOption, setFinOption] = useState(activityData ? activityData['fin'] : '');
  const [numIntentosOption, setNumIntentosOption] = useState(activityData ? activityData['intentos'] : -1);
  const [bloqueoOption, setBloqueoOption] = useState(activityData ? activityData['bloqueo'] : false);
  const [visibleOption, setVisibleOption] = useState(activityData ? activityData['disponible'] : false);
  const [disponibleOption, setDisponibleOption] = useState(activityData ? activityData['visible'] : false);
  
  const [filtroOptions, setFiltroOptions] = useState(['id']);
  const [hierOptions, setHierOptions] = useState(['ASC']);
  const [dataResult, setDataResult] = useState(['']);
  const { data_activities, refetchDataActivities } = useGetActivitiesTask(props.grupo, filtroOptions, hierOptions);

  const handleMoveRowDown = (index) => {
    if (index < activityExData.length - 1) {
      const reorderedBlocks = [...activityExData];
      const temp = reorderedBlocks[index];
      reorderedBlocks[index] = reorderedBlocks[index + 1];
      reorderedBlocks[index + 1] = temp;
      setActivityExData(reorderedBlocks);
    }
  };

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
      console.log("Actualizado...");
      setActivityExData(data_activity_exercises);
      console.log(activityExData);
    }
  }, [data_activity_exercises]);

  //useEffect para dar el siguiente step cuando la informacion de la actividad se actualiza
  useEffect(() => {
    if (activityData !== null){
      handleTitle(activityData['titulo'])
      handleInicio(activityData['inicio'])
      handleFin(activityData['fin'])
      handleIntentos(activityData['intentos'])
      handleBloqueo(activityData['bloqueo'])
      handleDisponible(activityData['disponible'])
      handleVisible(activityData['visible'])      
      handleNextStep();
    }
  }, [activityData]);

  //useEffect para reiniciar los estados de la informacion de una actividad cuando vuelve a la pantalla inicial
  useEffect(() => {
    if (step === 1){
      setActivityID(null);
      setActivityData(null);
      setActivityExData(null);
      setTitleOption('');
      setInicioOption('');
      setFinOption('');
      setNumIntentosOption(-1);
      setBloqueoOption(false);
      setVisibleOption(false);
      setDisponibleOption(false);
      refetchDataActivities();
    }
  }, [step]);

  //useEffect de la vista de un ejercicio en particular
  useEffect(() => {
    if (data_exercise && !loading_activityEx){
      setExerciseData(data_exercise);
    }
  }, [data_exercise]);
  
  //useEffect para dar el siguiente step cuando la informacion del ejercicio se actualiza
  useEffect(() => {
    if (exerciseData !== null){
      handleNextStep();
    }
  }, [exerciseData]);

  useEffect(() => {
    if (editCheck){
      setEditCheck(false);
      console.log("... y merge!");
      console.log("Actualmente, la información de la BD es:", activityExData);
      console.log("Actualmente, la información adaptada es:", editBlocks);
      
      if (editBlocks){
        const resultingBlocks = [...new Set([...editBlocks , ...activityExData])]
        setActivityExData(resultingBlocks);
        setEditBlocks(null);
      }
      else{
        const resultingBlocks = [...activityExData]
        setActivityExData(resultingBlocks);
      }
      console.log("Por último, la información final es:", activityExData);
    }
  }, [activityExData])

  const handleTitle = (titulo) => {
    setTitleOption(titulo);
  };

  const handleInicio = (inicio) => {
    setInicioOption(inicio);
  };

  const handleFin = (fin) => {
    setFinOption(fin);
  };

  const handleIntentos = (intentos) => {
    setNumIntentosOption(intentos);
  };

  const handleBloqueo = (bloqueo) => {
    setBloqueoOption(bloqueo);
  };

  const handleVisible = (visible) => {
    setVisibleOption(visible);
  };

  const handleDisponible = (disponible) => {
    setDisponibleOption(disponible);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setShowCreatePopup(false);
    setShowUpdatePopup(false);
  };
  
  const handleNextStep = () => {
    setStep(step + 1);
    setShowCreatePopup(false);
    setShowUpdatePopup(false);
  };
  
  const handleSaveExercise = () => {
    setStep(2);
    setShowSaveExercisePopup(true);
  };

  const handleUpdateExercise = () => {
    setStep(2);
    setShowEditExercisePopup(true);
  };

  const handleCreateActivity = () => {
    setStep(1);
    setShowCreatePopup(true);
  };

  const handleUpdateActivity = () => {
    setStep(1);
    setShowUpdatePopup(true);
  };

  //useEffect para reiniciar los estados de la informacion de un ejercicio cuando vuelve a la pantalla inicial
  useEffect(() => {
    if (step === 2){
      setExerciseID(null);
      setExerciseData(null);
      if (editCheck){
        refetchDataActivityExercises();
      }
    }
  }, [step]);

  const handleStatusExercise = (id_hand, tipo_hand, index) => {
    setEditStatus(tipo_hand);
    setExerciseID(id_hand);
    setExerciseIndex(index);
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
    setShowCreatePopup(false);
    setShowUpdatePopup(false);
    setShowSaveExercisePopup(false);
    setShowEditExercisePopup(false);
  };

  const handleEdition = (id_hand) => (e) => {
    setActivityID(id_hand);
  }

  const handlePreventDup = (id_hand) => {
    if (activityExData.map(item => item.id).includes(id_hand)){
      return false;
    }
    return true;
  }

  const handleDeletion = (id_hand) => (e) => {
    e.preventDefault();
    if (window.confirm("¿Estás seguro de que deseas borrar esta actividad?")) {
      getDeleteActivity(id_hand);
      const newDataResult = dataResult.filter(row => row.id !== id_hand);
      setDataResult(newDataResult);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  };

  const handleAddExercise = (exerciseInfo) => {
      const updatedBlocks = activityExData ? [...activityExData] : [];
      updatedBlocks.push(exerciseInfo);
      setActivityExData(updatedBlocks);
      handleSaveExercise()
  };

  const handleEditExercise = (index) => {
    const tempBlocks = [...activityExData];
    tempBlocks.splice(index, 1)
    setEditBlocks(tempBlocks);
    setEditCheck(true);
    handleUpdateExercise();
  };
  
  const handleDeleteRow = (index) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas borrar este ejercicio?');
    if (confirmed) {
      const updatedBlocks = [...activityExData];
      updatedBlocks.splice(index, 1);
      setActivityExData(updatedBlocks);
    }
  };
  
  const handleMoveRowUp = (index) => {
    if (index > 0) {
      const reorderedBlocks = [...activityExData];
      const temp = reorderedBlocks[index];
      reorderedBlocks[index] = reorderedBlocks[index - 1];
      reorderedBlocks[index - 1] = temp;
      setActivityExData(reorderedBlocks);
    }
  };

  if (!dataResult || !data_activities) {
    return <div>Cargando...</div>;
  }

  console.log("La información al momento", activityExData);

  return (
    <section id="teacherQuizSection">

      {showCreatePopup && (
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

      {showUpdatePopup && (
        <div className="message-popup">
          <div className="message-content">
            <span>La actividad ha sido actualizada</span>
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

      {showEditExercisePopup && (
        <div className="message-popup">
          <div className="message-content">
            <span>El ejercicio ha sido editado</span>
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
                        func={handleDeletion(row.id)}
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
          {activityID && activityData && activityExData &&(
            <ActivityFormat
              onDeleteRow = {handleDeleteRow}
              onMoveRowUp = {handleMoveRowUp}
              onMoveRowDown = {handleMoveRowDown}
              onPreviousStep={handlePrevStep}
              onNextStatus={handleStatusNormal}
              onNextExercise={handleStatusExercise}
              onActivityCreation={handleCreateActivity}
              onActivityUpdate={handleUpdateActivity}
              edicion={true}
              id = {activityData['id']}
              titulo = {titleOption}
              onTitleChange = {handleTitle}
              inicio = {inicioOption}
              onInicioChange = {handleInicio}
              fin = {finOption}
              onFinChange = {handleFin}
              intentos = {numIntentosOption}
              onIntentosChange = {handleIntentos}
              bloqueo = {bloqueoOption}
              onBloqueoChange = {handleBloqueo}
              disponible = {disponibleOption}
              onDisponibleChange = {handleDisponible}
              visible = {visibleOption}
              onVisibleChange = {handleVisible}
              ejercicios = {activityExData}
            />
          )}
          {(!activityID || !activityData || !activityExData) && (
            <ActivityFormat
              onDeleteRow = {handleDeleteRow}
              onMoveRowUp = {handleMoveRowUp}
              onMoveRowDown = {handleMoveRowDown}
              onPreviousStep={handlePrevStep}
              onNextStatus={handleStatusNormal}
              onNextExercise={handleStatusExercise}
              onActivityCreation={handleCreateActivity}
              onActivityUpdate={handleUpdateActivity}
              grupo = {props.grupo}
              titulo = {titleOption}
              onTitleChange = {handleTitle}
              inicio = {inicioOption}
              onInicioChange = {handleInicio}
              fin = {finOption}
              onFinChange = {handleFin}
              intentos = {numIntentosOption}
              onIntentosChange = {handleIntentos}
              bloqueo = {bloqueoOption}
              onBloqueoChange = {handleBloqueo}
              disponible = {disponibleOption}
              onDisponibleChange = {handleDisponible}
              visible = {visibleOption}
              onVisibleChange = {handleVisible}
              ejercicios = {activityExData}
            />
          )}
        </div>
      )}

      {(step === 3 || step === 5) && editStatus === 'Código' && (
        <section id="exerciseCreationForm" className="container-cc">
         <form>
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
              id_autor={exerciseData.id_autor}
              index={exerciseIndex}
              edicion={true}
              onStep={handlePrevStepFive}
              idDocente={props.id}
              rol={'Docente'}
              onAddExercise = {handleAddExercise}
              onEditExercise = {handleEditExercise}
              onCheckDup = {handlePreventDup}
            />
          </form>
        </section>  
      )}

      {(step === 3 || step === 5) && editStatus === 'Opción múltiple' && (
        <section id="exerciseCreationForm" className="container-cc">
          <form>
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
              id_autor={exerciseData.id_autor}
              index={exerciseIndex}
              edicion={true}
              onStep={handlePrevStepFive}
              idDocente={props.id}
              rol={'Docente'}
              onAddExercise = {handleAddExercise}
              onEditExercise = {handleEditExercise}
              onCheckDup = {handlePreventDup}
            />
          </form>
        </section>  
      )}

      {(step === 3 || step === 4) && editStatus === 'Aleatorio' && (
        <div>
          {exerciseID && exerciseData && (
            <RandomExercise
              id={exerciseID}
              subtema={exerciseData.id_subtema+","+exerciseData['archivo']['topic']}
              difficulty={exerciseData['archivo']['difficulty']}
              tipo={exerciseData['archivo']['type']}
              onExerciseAdd={handleSaveExercise}
              onStep={handlePrevStepFour}
              onAddExercise = {handleAddExercise}
              onEditExercise = {handleEditExercise}
              idDocente={props.id}
              index={exerciseIndex}
              edicion={true}
            />
          )}
          {(!exerciseID || !exerciseData) && (
            <RandomExercise
              onExerciseAdd={handleSaveExercise}
              onStep={handlePrevStepFour}
              onAddExercise = {handleAddExercise}
              onEditExercise = {handleEditExercise}
              idDocente={props.id}
            />
          )}
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
          <ResultTable
            id={props.id}
            rol={'Docente'}
            onAddExercise = {handleAddExercise}
            onCheckDup = {handlePreventDup}
          />
        </div>
      )}
    </section>
  );
};
