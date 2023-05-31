import { useState } from 'react';
import { CustomButton } from '../CustomButton';

export const ActivityFormat = () => {
  const [titleOption, setTitleOption] = useState('');
  const [inicioOption, setInicioOption] = useState('');
  const [finOption, setFinOption] = useState('');
  const [numIntentosOption, setNumIntentosOption] = useState('0');
  const [bloqueoOption, setBloqueoOption] = useState(false);
  const [visibleOption, setVisibleOption] = useState(false);
  const [exerciseBlocksCode, setExerciseBlocksCode] = useState([{}]);
  const [step, setStep] = useState(1);
  const [editStatus, setEditStatus] = useState(null);

  const handleAddExercise = () => {
    setStep(3);
    setEditStatus('Normal');
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleIntentosChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setNumIntentosOption(value);
    }
  };

  return (
    <div>
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
        <label htmlFor="bloqueo" className="text-center">
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

      <h5 className="mb-2">Ejercicios</h5>
      {exerciseBlocksCode.map((block, index) => (
        <div key={index} className="form-group mb-4">
          <div id={`input-${index}`} className="form-control" rows={5}>
            {block.input}
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-primary" func={handleBack}>Atrás</button>
        <button type="button" className="btn btn-primary btn-success" func={handleAddExercise}>Añadir ejercicio</button>
      </div>
      
    </div>
  );
};
