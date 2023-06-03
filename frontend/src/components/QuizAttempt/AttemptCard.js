import React from 'react';
import { Card, Button } from 'react-bootstrap';

export const AttemptCard = ({ eventKey, attempt }) => {
  return (
    <Card className="attempt-card">
      <Card.Header>
        <Button variant="link">
          Intento {eventKey + 1}
        </Button>
      </Card.Header>
      <Card.Body>
        <Card.Text>Inicio: {attempt.inicio}</Card.Text>
        <Card.Text>Fin: {attempt.fin}</Card.Text>
        <Card.Text>Respuestas Correctas: {attempt.correctos}</Card.Text>
        <Card.Text>Respuestas Incorrectas: {attempt.incorrectos}</Card.Text>
        {/* Aquí puedes iterar sobre las respuestas y mostrar los detalles */}
      </Card.Body>
    </Card>
  );
};

