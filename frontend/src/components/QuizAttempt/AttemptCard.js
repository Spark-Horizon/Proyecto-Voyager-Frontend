import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

export const AttemptCard = ({ eventKey, attempt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  function formatearFechaHora(cadenaFechaHora) {
    const fechaHora = new Date(cadenaFechaHora);
    const dia = agregarCero(fechaHora.getUTCDate());
    const mes = agregarCero(fechaHora.getUTCMonth() + 1);
    const año = fechaHora.getUTCFullYear();
    const horas = agregarCero(fechaHora.getUTCHours());
    const minutos = agregarCero(fechaHora.getUTCMinutes());
    const segundos = agregarCero(fechaHora.getUTCSeconds());
  
    return cadenaFechaHora ? `${dia}/${mes}/${año}, ${horas}:${minutos}:${segundos}` : 'En progreso';
  }

  function agregarCero(numero) {
    return numero < 10 ? `0${numero}` : numero;
  }

  return (
    <Card className="attempt-card">
      <Card.Header>
        <Button className='btn btnPrimary' onClick={handleToggle}>
          Intento {eventKey + 1}
        </Button>
      </Card.Header>
      {isOpen && (
        <Card.Body>
          <Card.Text>Inicio: {formatearFechaHora(attempt.inicio)}</Card.Text>
          <Card.Text>Fin: {formatearFechaHora(attempt.fin)}</Card.Text>
          <Card.Text>Respuestas Correctas: {attempt.correctos}</Card.Text>
          <Card.Text>Respuestas Incorrectas: {attempt.incorrectos}</Card.Text>
          {attempt.answers.respuestas.map((respuesta, index) => (
            <Card.Text key={index}>
              Respuesta {index+1}: {respuesta.respuesta ? respuesta.respuesta : 'N/A'} - Correcto: {respuesta.correcto ? 'Si' : 'No'}
            </Card.Text>
          ))}
        </Card.Body>
      )}
    </Card>
  );
};
