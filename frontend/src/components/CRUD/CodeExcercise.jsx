import { useState } from 'react';
import { CustomButton } from '../CustomButton';

import '../../styles/fonts.css';
import '../../styles/buttons.css';

export const CodeExcercise = (props) => {

  // Estados del componente
  const [step, setStep] = useState(1);
  const [exerciseBlocksCode, setExerciseBlocksCode] = useState([{ input: '', output: '' }]);

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleExerciseCreation= (e) => {
    e.preventDefault();
  };

  const handleAddBlockCode = () => {
    setExerciseBlocksCode([...exerciseBlocksCode, { input: '', output: '' }]);
  };

  const handleInputChangeCode = (event, index) => {
    const { value } = event.target;
    const blocks = [...exerciseBlocksCode];
    blocks[index].input = value;
    setExerciseBlocksCode(blocks);
  };

  const handleOutputChangeCode = (event, index) => {
    const { value } = event.target;
    const blocks = [...exerciseBlocksCode];
    blocks[index].output = value;
    setExerciseBlocksCode(blocks);
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
            <label htmlFor="driver" className="text-center">Driver</label>
            <input 
                type="text" 
                id="driver" 
                value={props.driver} 
                onChange={() => {}} 
                className="form-control" 
                placeholder="" 
                required 
            />
        </div>

        <h5 className="mb-2">Casos de prueba</h5>
        {exerciseBlocksCode.map((block, index) => (
          <div key={index} className="form-group mb-4">
            <label htmlFor={`input-${index}`} className="text-center">Input</label>
            <textarea 
              id={`input-${index}`} 
              value={block.input} 
              onChange={(event) => handleInputChangeCode(event, index)} 
              className="form-control" 
              placeholder="Input del ejercicio" 
              rows={5} 
              required 
            />

            <label htmlFor={`output-${index}`} className="text-center">Output</label>
            <textarea 
              id={`output-${index}`} 
              value={block.output} 
              onChange={(event) => handleOutputChangeCode(event, index)} 
              className="form-control" 
              placeholder="Output del ejercicio" 
              rows={5} 
              required 
            />
          </div>
        ))}

        <button type="button" onClick={handleAddBlockCode} className="btn btn-primary">Añadir</button>
        
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