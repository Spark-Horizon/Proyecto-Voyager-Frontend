import { useState } from 'react';
import { CustomButton } from '../CustomButton';

import '../../styles/fonts.css';
import '../../styles/buttons.css';

export const OMExcercise = (props) => {

  // Estados del componente
  const [step, setStep] = useState(1);
  const [exerciseBlocksOM, setExerciseBlocksOM] = useState([{ texto: '', output: '' }]);

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleExerciseCreation= (e) => {
    e.preventDefault();
  };

  const handleAddBlockOM = () => {
    setExerciseBlocksOM([...exerciseBlocksOM, { input: '', output: '' }]);
  };

  const handleInputChangeOM = (event, index) => {
    const { value } = event.target;
    const blocks = [...exerciseBlocksOM];
    blocks[index].input = value;
    setExerciseBlocksOM(blocks);
  };

  const handleOutputChangeOM = (event, index) => {
    const { value } = event.target;
    const blocks = [...exerciseBlocksOM];
    blocks[index].output = value;
    setExerciseBlocksOM(blocks);
  };

  return (
    <div>
        <div className="text-center mb-5">
            <h3 className="mb-0">Ejercicio de código</h3>
            <span>Ingresa los detalles del ejercicio</span>
        </div>

        <div className="form-group mb-4">
            <label htmlFor="autor" className="text-center">Autor</label>
            <input 
                type="text" 
                id="autor" 
                value={props.autor}
                onChange={() => {}} 
                className="form-control" 
                placeholder="Autor del ejercicio" 
                required 
            />
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="titulo" className="text-center">Título</label>
            <input 
                type="text" 
                id="titulo" 
                value={props.titulo}
                onChange={() => {}} 
                className="form-control" 
                placeholder="Título del ejercicio" 
                required 
            />
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="descripcion" className="text-center">Descripción</label>
            <textarea 
                id="descripcion" 
                value={props.descripcion} 
                onChange={() => {}} 
                className="form-control" 
                placeholder="Descripción del ejercicio" 
                rows={5} 
                required 
            />
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="tema" className="text-center">Tema</label>
            <select 
                id="tema" 
                value={props.tema} 
                onChange={() => {}} 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
            >
                <option value=""></option>
            </select>
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="dificultad" className="text-center">Dificultad</label>
            <select 
                id="dificultad" 
                value={props.dificultad} 
                onChange={() => {}} 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
            >
                <option value=""></option>
            </select>
        </div>
    
        <div className="form-group mb-4">
            <label htmlFor="respuesta" className="text-center">Respuesta</label>
            <input 
                type="text" 
                id="respuesta" 
                value={props.respuesta} 
                onChange={() => {}} 
                className="form-control" 
                placeholder="" 
                required 
            />
        </div>

        <div className="form-group mb-4">
            <label htmlFor="pistas" className="text-center">Pistas</label>
            <select 
                id="pistas" 
                value={props.pistas} 
                onChange={() => {}} 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
            >
                <option value=""></option>
            </select>
        </div>
    
        <h5 className="mb-2">Opciones</h5>
        {exerciseBlocksOM.map((block, index) => (
          <div key={index} className="form-group mb-4">
            <label htmlFor={`input-${index}`} className="text-center">Texto</label>
            <textarea 
              id={`texto-${index}`} 
              value={block.input} 
              onChange={(event) => handleInputChangeOM(event, index)} 
              className="form-control" 
              placeholder="Texto del ejercicio" 
              rows={5} 
              required 
            />
            <label htmlFor={`output-${index}`} className="text-center">Explicación</label>
            <textarea 
              id={`explicacion-${index}`} 
              value={block.output} 
              onChange={(event) => handleOutputChangeOM(event, index)} 
              className="form-control" 
              placeholder="Explicacion del ejercicio" 
              rows={5} 
              required 
            />
          </div>
        ))}
        <button type="button" onClick={handleAddBlockOM} className="btn btn-primary">Añadir</button>
    
        <div className="select next-back mt-5">
        <CustomButton
            type={'btn btnSecondary'}
            text={'Atrás'}
            func={handlePrevStep}
        />
        <CustomButton
            type={'btn btn-success'}
            text={'Crear ejercicio'}
            func={handleExerciseCreation}
        />
        </div>
    </div>
  )
}