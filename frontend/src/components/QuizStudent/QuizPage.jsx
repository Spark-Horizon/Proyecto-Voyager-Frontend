import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchQuizStudent } from "../../hooks/QuizStudent/useFetchQuizStudent";
import { CompilerPage } from './CompilerPage'; 
import { MultipleOptionPage } from './MultipleOptionPage'; 

export const QuizPage = ({ id_activity }) => {
  const { data, isLoading, error } = useFetchQuizStudent(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = () => {
    navigate('/home'); // Asume que la ruta de inicio es '/home'
  };

  const currentItem = data[currentIndex];

  return (
    <div>
      <p>Ejercicio {currentIndex + 1} de {data.length}</p>

      {currentItem.tipo === "Código" ? <CompilerPage id={currentItem.id} /> : 
      currentItem.tipo === "Opción múltiple" ? <MultipleOptionPage id={currentItem.id} /> : 
      null}

      {currentIndex < data.length - 1 ? (
        <button onClick={handleNext}>Siguiente</button>
      ) : (
        <button onClick={handleFinish}>Terminar y volver al inicio</button>
      )}
    </div>
  );
}
