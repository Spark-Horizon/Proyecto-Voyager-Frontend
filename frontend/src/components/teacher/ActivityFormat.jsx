import { useEffect, useState } from 'react';
import { CustomButton } from '../CustomButton';
import { getCreateActivity, getUpdateActivity } from '../../helpers/getTeacherTask';

export const ActivityFormat = (props) => {
  const [titleOption, setTitleOption] = useState(props.titulo || '');
  const [inicioOption, setInicioOption] = useState(props.inicio || '');
  const [finOption, setFinOption] = useState(props.fin || '');
  const [numIntentosOption, setNumIntentosOption] = useState(props.intentos || '');
  const [bloqueoOption, setBloqueoOption] = useState(props.bloqueo || false);
  const [visibleOption, setVisibleOption] = useState(props.visible || false);
  const [disponibleOption, setDisponibleOption] = useState(props.disponible || false);
  const [exerciseBlocksCode, setExerciseBlocksCode] = useState(props.ejercicios || []);

  useEffect(() => {
    if (props.titulo){
      setTitleOption(props.titulo);
    }
  }, [props.titulo]);

  useEffect(() => {
    if (props.inicio){
      setInicioOption(props.inicio);
    }
  }, [props.inicio]);

  useEffect(() => {
    if (props.fin){
      setFinOption(props.fin);
    }
  }, [props.fin]);

  useEffect(() => {
    if (props.intentos){
      setNumIntentosOption(props.intentos);
    }
  }, [props.intentos]);

  useEffect(() => {
    if (props.bloqueo){
      setBloqueoOption(props.bloqueo);
    } else {
      setBloqueoOption(false);
    }
  }, [props.bloqueo]);

  useEffect(() => {
    if (props.visible){
      setVisibleOption(props.visible);
    } else {
      setVisibleOption(false);
    }
  }, [props.visible]);

  useEffect(() => {
    if (props.disponible){
      setDisponibleOption(props.disponible);
    } else {
      setDisponibleOption(false);
    }
  }, [props.disponible]);

  useEffect(() => {
    if (props.ejercicios){
      setExerciseBlocksCode(props.ejercicios);
    }
  }, [props.ejercicios]);

  const handlePrevious = () => {
    props.onPreviousStep();
  };

  const handleNext = () => {
    props.onNextStatus();
  };

  const handleCreation = (titulo, inicio, fin, intentos, bloqueo, disponible, visible, id_grupo, ejercicios) => (e) => {
    e.preventDefault();
    getCreateActivity(titulo, inicio, fin, intentos, bloqueo, disponible, visible, id_grupo, ejercicios);
    props.onActivityCreation();  
  }

  const handleEdition = (id, titulo, inicio, fin, intentos, bloqueo, disponible, visible, ejercicios) => (e) => {
    e.preventDefault();
    getUpdateActivity(id, titulo, inicio, fin, intentos, bloqueo, disponible, visible, ejercicios);
    props.onActivityUpdate();  
  }

  const handleEjercicio = (id_hand, tipo_hand, index) => {
    props.onNextExercise(id_hand, tipo_hand, index);
  }

  const handleIntentosChange = (event) => {
    const { value } = event.target;
    const trimmedValue = value.trim();
    if (/^(?:\s|\d+|-?\d*|)$/.test(trimmedValue)) {
      props.onIntentosChange(trimmedValue);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hour}:${minute}`;
  };
  
  const handleDeleteRow = (index) => {
    props.onDeleteRow(index);
  };

  const handleMoveRowUp = (index) => {
    props.onMoveRowUp(index);
  };

  const handleMoveRowDown = (index) => {
    props.onMoveRowDown(index);
  };

  return (
    <section id="teacherActivityFormat">
      <h2>Crear Actividad</h2>

      <div className="form-group mb-4">
        <label htmlFor="título">Título</label>
        <input
          type="text"
          id="título"
          value={titleOption}
          onChange={(event) => props.onTitleChange(event.target.value)}
          className="form-control"
          placeholder="Título del ejercicio"
          required
        />
      </div>

      <div className="form-group mb-4">
        <label htmlFor="inicio">Inicio</label>
        <input
          type="datetime-local"
          id="inicio"
          value={formatDate(inicioOption)}
          onChange={(event) => props.onInicioChange(event.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="form-group mb-4">
        <label htmlFor="fin">Fin</label>
        <input
          type="datetime-local"
          id="fin"
          value={formatDate(finOption)}
          onChange={(event) => props.onFinChange(event.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="form-group mb-4">
        <label htmlFor="numIntentos">Número de Intentos</label>
        <input
          type="text"
          id="numIntentos"
          value={numIntentosOption}
          onChange={handleIntentosChange}
          className="form-control"
          placeholder=" "
          required
        />
      </div>

      <div className="form-group mb-4">
        <label htmlFor="bloqueo" className="text-center mt-3">
          ¿La actividad se bloquea tras la fecha de fin?
        </label>
        <div className="form-check">
          <input
            type="checkbox"
            id="bloqueo"
            checked={bloqueoOption}
            onChange={(e) => props.onBloqueoChange(e.target.checked)}
            className="form-check-input"
            required
          />
          <label className="form-check-label" htmlFor="bloqueo">
            Sí se bloquea
          </label>
        </div>
      </div>

      <div className="form-group mb-4">
        <label htmlFor="visible" className="text-center">
          ¿La actividad es visible?
        </label>
        <div className="form-check">
          <input
            type="checkbox"
            id="visible"
            checked={visibleOption}
            onChange={(e) => props.onVisibleChange(e.target.checked)}
            className="form-check-input"
            required
          />
          <label className="form-check-label" htmlFor="visible">
            Sí es visible para los alumnos
          </label>
        </div>
      </div>

      <div className="form-group mb-4">
        <label htmlFor="disponible" className="text-center">
          ¿La actividad está disponible?
        </label>
        <div className="form-check">
          <input
            type="checkbox"
            id="disponible"
            checked={disponibleOption}
            onChange={(e) => props.onDisponibleChange(e.target.checked)}
            className="form-check-input"
            required
          />
          <label className="form-check-label" htmlFor="disponible">
            Sí está disponible para los alumnos
          </label>
        </div>
      </div>

      <h3>Ejercicios</h3>
      <table className="exercise-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Subtema</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {exerciseBlocksCode.map((block, index) => (
            <tr key={index}>
              <td>{block.id}</td>
              <td>{block['?column?']}</td>
              <td>{block.tipo}</td>
              <td>{block.id_subtema}</td>
              <td className="button-cell">
                <div>
                  <CustomButton
                    type="btn btn-primary btn-sm mr-2"
                    text="Ver"
                    func={() => handleEjercicio(block.id, block.tipo, index)}
                  />
                  <CustomButton
                    type="btn btn-danger btn-sm mr-2"
                    text="Borrar"
                    func={() => handleDeleteRow(index)}
                  />
                  <CustomButton
                    type="btn btn-secondary btn-sm mr-2"
                    text="↑"
                    func={() => handleMoveRowUp(index)}
                    disabled={index === 0}
                  />
                  <CustomButton
                    type="btn btn-secondary btn-sm mr-2"
                    text="↓"
                    func={() => handleMoveRowDown(index)}
                    disabled={index === exerciseBlocksCode.length - 1}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

        <div className="d-flex flex-column align-items-center mt-4">
          <CustomButton type={'btn btn-primary'} func={handleNext} text={'Añadir ejercicio'} />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <CustomButton type={'btn btn-primary'} func={handlePrevious} text={'Atrás'} />

          {props.edicion && (
            <CustomButton
              type={'btn btn-success'}
              text={'Editar actividad'}
              func={handleEdition(props.id, titleOption, inicioOption, finOption, numIntentosOption, bloqueoOption, disponibleOption, visibleOption, exerciseBlocksCode.map(item => item.id))}
              disabled={
                !titleOption.trim() ||
                !inicioOption ||
                !finOption ||
                !numIntentosOption || //EL TRIM ANDABA AQUÍ
                numIntentosOption < -1 ||
                numIntentosOption == ' ' ||
                exerciseBlocksCode.length < 1
              }
            />
          )}
          {!props.edicion && (
            <CustomButton
              type={'btn btn-success'}
              text={'Crear actividad'}
              func={handleCreation(titleOption, inicioOption, finOption, numIntentosOption, bloqueoOption, disponibleOption, visibleOption, props.grupo, exerciseBlocksCode.map(item => item.id))}
              disabled={
                !titleOption.trim() ||
                !inicioOption ||
                !finOption ||
                !numIntentosOption || //EL TRIM ANDABA AQUÍ
                numIntentosOption < -1 ||
                numIntentosOption == ' ' ||
                exerciseBlocksCode.length < 1
              }
            />
          )}
      </div>
    </section>
  );
};
