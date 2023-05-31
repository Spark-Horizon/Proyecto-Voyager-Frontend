import { useState } from 'react';
import { CustomButton } from '../CustomButton';

export const ActivityFormat = (props) => {
  const [titleOption, setTitleOption] = useState('');
  const [inicioOption, setInicioOption] = useState('');
  const [finOption, setFinOption] = useState('');
  const [numIntentosOption, setNumIntentosOption] = useState('0');
  const [bloqueoOption, setBloqueoOption] = useState(false);
  const [visibleOption, setVisibleOption] = useState(false);
  const [exerciseBlocksCode, setExerciseBlocksCode] = useState([
    { name: 'Exercise 1', type: 'Type 1', subtema: 'Subtema 1' },
    { name: 'Exercise 2', type: 'Type 2', subtema: 'Subtema 2' },
    { name: 'Exercise 3', type: 'Type 3', subtema: 'Subtema 3' },
  ]);

  const handlePrevious = () => {
    props.onPreviousStep();
  };

  const handleNext = () => {
    props.onNextStatus();
  };

  const handleCreate = () => {
    props.onActivityCreation();
  };

  const handleCodigo = () => {
    props.onNextCodigo();
  };

  const handleOM = () => {
    props.onNextOM();
  };

  const handleIntentosChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setNumIntentosOption(value);
    }
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
          value={inicioOption}
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
          value={finOption}
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
              <td>{index + 1}</td>
              <td>{block.name}</td>
              <td>{block.type}</td>
              <td>{block.subtema}</td>
              <td>
              <div>
                <CustomButton // ESTE BOTON DEBERIA RECIBIR handleCodigo O handleOM DEPENDIENDO DEL TIPO, NO SUPE CÓMO PONERLO ASÍ QUE...
                  type="btn btn-primary btn-sm mr-2"
                  text="Editar"
                  func={handleNext}
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
        <CustomButton
          type={'btn btn-primary btn-success mt-4'}
          func={handleCreate}
          text={'Crear actividad'}
        />
      </div>
    </section>
  );
};
