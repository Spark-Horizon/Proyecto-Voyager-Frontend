import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomNavbar } from '../components/CustomNavbar';
import { CustomButton } from '../components/CustomButton';
import { useAuth } from '../hooks/AuthContext';

import '../styles/fonts.css';
import '../styles/buttons.css';

export const EditExercise = (props) => {

  // Estados del componente
  const [step, setStep] = useState(1);
  const [exerciseType, setExerciseType] = useState(null);
  const [exerciseBlocksCode, setExerciseBlocksCode] = useState([{ input: '', output: '' }]);
  const [exerciseBlocksOM, setExerciseBlocksOM] = useState([{ input: '', output: '' }]);

  const handleExerciseEdit= (e) => {
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
      <section id="exerciseEditForm" className='container-cc'>

        <form onSubmit={handleExerciseEdit}>

            {exerciseType === 'Código' && (
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
                    value={''} 
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
                    value={''} 
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
                    value={''} 
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
                    value={''} 
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
                    value={''} 
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
                    value={''} 
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
                    type={'btn btn-success'}
                    text={'Completar edición'}
                    func={handleExerciseEdit}
                />
                </div>
            </div>
            )}

            {exerciseType === 'Opción múltiple' && (
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
                    value={''} 
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
                    value={''} 
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
                    value={''} 
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
                    value={''} 
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
                    value={''} 
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
                    value={''} 
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
                    value={''} 
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
                    type={'btn btn-success'}
                    text={'Completar edición'}
                    func={handleExerciseEdit}
                />
                </div>
            </div>
            )}
        </form>
      </section> 
    </div>
  )
}