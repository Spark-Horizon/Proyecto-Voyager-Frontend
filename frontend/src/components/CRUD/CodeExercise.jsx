import { useEffect, useState } from 'react';
import { CustomButton } from '../CustomButton';
import {useGetFilSubtemaTask, useGetFilDificultadTask} from '../../hooks/useGetCRUDTask.js';
import {useGetNameTask} from '../../hooks/useGetTeacherTask';

import '../../styles/fonts.css';
import '../../styles/buttons.css';
import { getUpdateCodeExercise, getCreateCodeExercise } from '../../helpers/getCRUDTask';

export const CodeExercise = (props) => {
  const [subtemaOptions, setSubtemaOptions] = useState(props.subtema || '');
  const [authorOption, setAuthorOption] = useState(props.author || '');
  const [titleOption, setTitleOption] = useState(props.title || '');
  const [descriptionOption, setDescriptionOption] = useState(props.description || '');
  const [difficultyOption, setDifficultyOption] = useState(props.difficulty || '');
  const [driverOption, setDriverOption] = useState(props.driver || '');
  const [aprobadoOption, setAprobadoOption] = useState(props.rol === 'Administrador' ? (props.aprobado || false) : false );
  const [readOnly, setReadOnly] = useState(false);
  const [editable, setEditable] = useState(false);
  const { data_subtema } = useGetFilSubtemaTask();
  const { data_dificultad } = useGetFilDificultadTask();
  const { data_name } = useGetNameTask(props.idDocente);

  const [exerciseBlocksCode, setExerciseBlocksCode] = useState(props.tests || [{ input: '', output: '' }]);

  useEffect(() => {
    if (data_name && !authorOption){
      setAuthorOption(data_name['nombre']+" "+data_name['apellido1']+" "+data_name['apellido2']);
    }
  }, [data_name]);

  useEffect(() => {
    if (props.idDocente !== props.id_autor && props.rol === 'Docente' && props.idDocente) {
      setReadOnly(true);
      setEditable(false);
    } else {
      setReadOnly(false);
      setEditable(true);
    }
  }, [props.idDocente, props.id_autor, props.rol]);
  
  const handlePrevious = () => {
    props.onStep();
  }

  const handleAddBlockCode = () => {
    setExerciseBlocksCode([...exerciseBlocksCode, { input: '', output: '' }]);
  };

  const handleRemoveBlockCode = () => {
    if (exerciseBlocksCode.length === 1) {
      setExerciseBlocksCode([{ input: '', output: '' }]);
    } else {
      const blocks = [...exerciseBlocksCode];
      blocks.pop();
      setExerciseBlocksCode(blocks);
    }
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

  const handleCreation = (aprobado, subtema, author, title, description, difficulty, driver, tests, id_autor) => (e) => {
    e.preventDefault();
    getCreateCodeExercise(aprobado, 'Código', subtema, author, title, description, difficulty, driver, tests, id_autor);
    props.onStep();
  }

  const handleEdition = (id, aprobado, subtema, author, title, description, difficulty, driver, tests) => (e) => {
    e.preventDefault();
    getUpdateCodeExercise(id, aprobado, 'Código', subtema, author, title, description, difficulty, driver, tests);
    props.onStep();
  }

  const handleAddition = (id, titulo, tipo, id_subtema) => (e) => {
    const addExercise = {"id": id, 
                         "?column?": titulo,
                         "tipo": tipo,
                         "id_subtema": id_subtema.split(',')[0]};
    props.onAddExercise(addExercise);
  }

  if (!data_subtema || !data_dificultad) {
    return <div>Cargando...</div>;
  }

  console.log(props.idDocente, props.id_autor, props.rol);

  return (
    <div>
        <div className="text-center mb-5">
            <h3 className="mb-0">Ejercicio de código</h3>
            <span>Ingresa los detalles del ejercicio</span>
        </div>

        <div className="form-group mb-4">
            <label htmlFor="autor" className="text-center">Autor</label>
            {(props.rol === 'Docente') && (
              <input 
                  type="text" 
                  id="autor" 
                  value={authorOption} 
                  onChange={(e) => setAuthorOption(e.target.value)}
                  className="form-control" 
                  placeholder="Autor del ejercicio" 
                  required
                  readOnly
              />
            )}
            {(props.rol === 'Administrador') && (
              <input 
                  type="text" 
                  id="autor" 
                  value={authorOption} 
                  onChange={(e) => setAuthorOption(e.target.value)}
                  className="form-control" 
                  placeholder="Autor del ejercicio" 
                  required
              />
            )}
        </div>

        <div className="form-group mb-4">
            <label htmlFor="titulo" className="text-center">Título</label>
            <input 
                type="text" 
                id="titulo" 
                value={titleOption} 
                onChange={(e) => setTitleOption(e.target.value)}
                className="form-control" 
                placeholder="Título del ejercicio" 
                required 
                readOnly={readOnly}
            />
        </div>

        <div className="form-group mb-4">
            <label htmlFor="descripcion" className="text-center">Descripción</label>
            <textarea 
                id="descripcion" 
                value={descriptionOption} 
                onChange={(e) => setDescriptionOption(e.target.value)}
                className="form-control" 
                placeholder="Descripción del ejercicio" 
                rows={5} 
                required 
                readOnly={readOnly}
            />
        </div>

        <div className="form-group mb-4">
            <label htmlFor="subtema" className="text-center">Tema</label>
            <select 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
                disabled={!editable}
                id="subtema" 
                value={subtemaOptions}
                onChange={(e) => setSubtemaOptions(e.target.value)}>
                <option value={props.subtema}></option>
                {data_subtema.map((row) => (
                  <option key={row.id_subtema} value={row.id_subtema+","+row.nombre}>
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
                disabled={!editable}
                id="dificultad" 
                value={difficultyOption}
                onChange={(e) => setDifficultyOption(e.target.value)}>
                <option value={props.dificultad}></option>
                {data_dificultad.map((row) => (
                  <option key={row['?column?']} value={row['?column?']}>
                    {row['?column?']}
                  </option>
                ))}
            </select>
        </div>

        <div className="form-group mb-4">
            <label htmlFor="driver" className="text-center">Driver</label>
            <input 
                type="text" 
                id="driver" 
                value={driverOption} 
                onChange={(e) => setDriverOption(e.target.value)}
                className="form-control" 
                placeholder="" 
                required 
                readOnly={readOnly}
            />
        </div>

        {(props.rol === 'Administrador') && (
          <div className="form-group mb-4">
            <label htmlFor="aprobado" className="text-center">Aprobado</label>
            <div className="form-check">
              <input
                type="checkbox"
                id="aprobado"
                checked={aprobadoOption}
                onChange={(e) => setAprobadoOption(e.target.checked)}
                className="form-check-input"
                required
                
              />
              <label className="form-check-label" htmlFor="aprobado">
                Marcar como aprobado
              </label>
            </div>
          </div>
        )}

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
              readOnly={readOnly}
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
              readOnly={readOnly}
            />
          </div>
        ))}

        {(props.idDocente === props.id_autor || props.rol === 'Administrador') && (
          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={handleAddBlockCode}
              className="btn btn-primary"
            >
              Añadir
            </button>
            {exerciseBlocksCode.length > 1 && (
              <button
                type="button"
                onClick={handleRemoveBlockCode}
                className="btn btn-primary btn-danger"
              >
                Quitar
              </button>
            )}
          </div>
        )}

        <div className="select next-back mt-5">
          <CustomButton
            type={'btn btnSecondary'}
            text={'Atrás'}
            func={handlePrevious}
          />
          
          { props.edicion && props.rol === 'Docente' && (
            <CustomButton
              type={'btn btn-success'}
              text={'Agregar ejercicio'}
              func={handleAddition(props.id, titleOption, 'Código', subtemaOptions, )}
              disabled={
                !titleOption.trim() ||
                !authorOption.trim() ||
                !descriptionOption.trim() ||
                !subtemaOptions ||
                !difficultyOption ||
                !driverOption.trim() ||
                exerciseBlocksCode.some(block => !block.input || !block.output)
              }
            />
          )}

          {props.edicion && (props.idDocente === props.id_autor || props.rol === 'Administrador') && (
            <CustomButton
              type={'btn btn-success'}
              text={'Editar ejercicio'}
              func={handleEdition(props.id, aprobadoOption, subtemaOptions, authorOption, titleOption, descriptionOption, difficultyOption, driverOption, JSON.stringify(exerciseBlocksCode))}
              disabled={
                !titleOption.trim() ||
                !authorOption.trim() ||
                !descriptionOption.trim() ||
                !subtemaOptions ||
                !difficultyOption ||
                !driverOption.trim() ||
                exerciseBlocksCode.some(block => !block.input || !block.output)
              }
            />
          )}

          {!props.edicion && (
            <CustomButton
              type={'btn btn-success'}
              text={'Crear ejercicio'}
              func={handleCreation(aprobadoOption, subtemaOptions, authorOption, titleOption, descriptionOption, difficultyOption, driverOption, JSON.stringify(exerciseBlocksCode), (props.idDocente || null))}
              disabled={
                !titleOption.trim() ||
                !authorOption.trim() ||
                !descriptionOption.trim() ||
                !subtemaOptions ||
                !difficultyOption ||
                !driverOption.trim() ||
                exerciseBlocksCode.some(block => !block.input || !block.output)
              }
            />
          )}
        </div>
    </div>
  )
}