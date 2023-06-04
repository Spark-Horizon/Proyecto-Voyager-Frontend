import { useState } from 'react';
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

  const handleEjercicio = (id_hand, tipo_hand) => {
    props.onNextExercise(id_hand, tipo_hand);
  }

  const handleIntentosChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setNumIntentosOption(value);
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
    const confirmed = window.confirm('¿Estás seguro de que deseas borrar este ejercicio?');
    if (confirmed) {
      const updatedBlocks = [...exerciseBlocksCode];
      updatedBlocks.splice(index, 1);
      setExerciseBlocksCode(updatedBlocks);
    }
  };

  const handleMoveRowUp = (index) => {
    if (index > 0) {
      const reorderedBlocks = [...exerciseBlocksCode];
      const temp = reorderedBlocks[index];
      reorderedBlocks[index] = reorderedBlocks[index - 1];
      reorderedBlocks[index - 1] = temp;
      setExerciseBlocksCode(reorderedBlocks);
    }
  };

  const handleMoveRowDown = (index) => {
    if (index < exerciseBlocksCode.length - 1) {
      const reorderedBlocks = [...exerciseBlocksCode];
      const temp = reorderedBlocks[index];
      reorderedBlocks[index] = reorderedBlocks[index + 1];
      reorderedBlocks[index + 1] = temp;
      setExerciseBlocksCode(reorderedBlocks);
    }
  };

  return (
    <section id="teacherActivityFormat">
      <h2>Crear Actividad</h2>

      <div className="form-group">
        <label htmlFor="título">Título</label>
        <input
          type="text"
          id="título"
          value={titleOption}
          onChange={(event) => setTitleOption(event.target.value)}
          className="form-control"
          placeholder="Título del ejercicio"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="inicio">Inicio</label>
        <input
          type="datetime-local"
          id="inicio"
          value={formatDate(inicioOption)}
          onChange={(event) => setInicioOption(event.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="fin">Fin</label>
        <input
          type="datetime-local"
          id="fin"
          value={formatDate(finOption)}
          onChange={(event) => setFinOption(event.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
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
            onChange={(e) => setBloqueoOption(e.target.checked)}
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
            onChange={(e) => setVisibleOption(e.target.checked)}
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
            onChange={(e) => setDisponibleOption(e.target.checked)}
            className="form-check-input"
            required
          />
          <label className="form-check-label" htmlFor="visible">
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
              <td>
              <div>
                <CustomButton
                  type="btn btn-primary btn-sm mr-2"
                  text="Ver"
                  func={() => handleEjercicio(block.id, block.tipo)}
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

      <div className="d-flex justify-content-between">
        <CustomButton type={'btn btn-primary mt-4'} func={handlePrevious} text={'Atrás'} />
        <CustomButton type={'btn btn-primary mt-4'} func={handleNext} text={'Añadir ejercicio'} />
        {props.edicion && (
            <CustomButton
              type={'btn btn-success'}
              text={'Editar actividad'}
              func={handleEdition(props.id, titleOption, inicioOption, finOption, numIntentosOption, bloqueoOption, disponibleOption, visibleOption, exerciseBlocksCode.map(item => item.id))}
              disabled={      
                !titleOption.trim() ||
                !inicioOption ||
                !finOption ||
                !numIntentosOption ||
                exerciseBlocksCode.some(block => !block.id)
              }
            />
          )}
          {!props.edicion && (
            <CustomButton
              type={'btn btn-success'}
              text={'Crear actividad'}
              func={handleCreation(titleOption, inicioOption, finOption, numIntentosOption, bloqueoOption, disponibleOption, visibleOption, props.grupo, JSON.stringify(exerciseBlocksCode))}
              disabled={      
                !titleOption.trim() ||
                !inicioOption ||
                !finOption ||
                !numIntentosOption ||
                exerciseBlocksCode.some(block => !block.id)
              }
            />
          )}
      </div>
    </section>
  );
};
