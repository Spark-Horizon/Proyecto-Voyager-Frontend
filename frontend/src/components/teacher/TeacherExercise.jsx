import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from '../CustomButton';

export const TeacherExercise = () => {
  const [step, setStep] = useState(1);
  const [editStatus, setEditStatus] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="teacherQuizSection">
      <h2>Crear Actividad</h2>

      {step === 1 && (
        <table>
          <thead>
            <tr>
              <th scope="col">Actividad</th>
              <th scope="col">Fecha</th>
              <th scope="col">Veces Completada</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Accccc</td>
              <td>23342342</td>
              <td>5</td>
              <td>
                <div>
                  <CustomButton
                    type="btn btn-primary btn-sm"
                    text="Editar"
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
      )}

      <div className="addMoreActivitiesButton">
        <CustomButton
          type="btn btn-primary btn-sm mr-2"
          text="+"
        />
      </div>
    </div>
  );
};
