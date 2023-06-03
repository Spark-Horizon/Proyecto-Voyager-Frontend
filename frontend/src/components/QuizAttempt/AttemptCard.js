import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

export const AttemptCard = ({ eventKey, attempt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card className="attempt-card">
      <Card.Header>
        <Button variant="link" onClick={handleToggle}>
          Intento {eventKey + 1}
        </Button>
      </Card.Header>
      {isOpen && (
        <Card.Body>
          <Card.Text>Inicio: {attempt.inicio}</Card.Text>
          <Card.Text>Fin: {attempt.fin}</Card.Text>
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
