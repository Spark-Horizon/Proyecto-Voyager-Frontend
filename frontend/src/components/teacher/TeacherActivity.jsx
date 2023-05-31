import { useState } from 'react';
import { CustomButton } from '../CustomButton';
import { ActivityFormat } from './ActivityFormat';
import { ResultTable } from "../CRUD/ResultTable";
import { CodeExercise } from "../CRUD/CodeExercise"
import { OMExercise } from "../CRUD/OMExercise"

export const TeacherActivity = () => {
  const [step, setStep] = useState(1);
  const [editStatus, setEditStatus] = useState(null);
  const [tipoOption, setTipoOption] = useState('');
  const [subtemaOptions, setSubtemaOptions] = useState('');
  const [difficultyOption, setDifficultyOption] = useState('');

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleNextStep = () => {
    setStep(step + 1);
  };

  console.log('Current step:', step);

  return (
    <div className="teacherQuizSection">

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
                  >
                    <optgroup label="Ascendente">
                      <option value="id_actividad">Actividad</option>
                      <option value="fecha">Fecha</option>
                      <option value="veces_completada">Veces completada</option>
                      <option value="promedio">Promedio grupal</option>
                    </optgroup>
                    <optgroup label="Descendente">
                      <option value="id_actividad">Actividad</option>
                      <option value="fecha">Fecha</option>
                      <option value="veces_completada">Veces completada</option>
                      <option value="promedio">Promedio grupal</option>
                    </optgroup>
                  </select>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Accccc</td>
                <td>23342342</td>
                <td>5</td>
                <td>5/13</td>
                <td>
                  <div>
                    <CustomButton
                      type="btn btn-primary btn-sm"
                      text="Editar"
                      func={handleNextStep}
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
          <ActivityFormat />
        </div>
      )}

      {(step === 3 || step === 5) && editStatus === 'Código' && (
        <div>
          <CodeExercise/>
        </div>
      )}

      {(step === 3 || step === 5) && editStatus === 'Opción múltiple' && (
        <div>
          <OMExercise/>
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
                onChange={(e) => setTipoOption(e.target.value)}
              >
                <option value="value1">Placeholder para cuadno le metas algo de eso de base de datos</option>
              </select>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="subtema" className="text-center">Tema</label>
              <select 
                className="form-select form-select-sm"
                aria-label="Filtro" 
                required 
                id="subtema" 
                value={subtemaOptions}
                onChange={(e) => setSubtemaOptions(e.target.value)}
              >
                <option value="value1">Placeholder para cuadno le metas algo de eso de base de datos</option>
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
                onChange={(e) => setDifficultyOption(e.target.value)}
              >
                <option value="easy">Placeholder para cuando le metas algo de eso de base de datos</option>
              </select>
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
                func={() => setEditStatus('Específico')}
              />
              <CustomButton
                type="btn btnPrimary btnResize"
                text="Aleatorio"
                func={() => setEditStatus('Aleatorio')}
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
          <ResultTable/>
        </div>
      )}
    </div>
  );
};
