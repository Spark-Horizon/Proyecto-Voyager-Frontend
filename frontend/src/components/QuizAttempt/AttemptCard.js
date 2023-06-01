import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';

const AttemptCard = ({ eventKey, attempt }) => {
  return (
    <Accordion>
      <Card className="attempt-card">
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={eventKey}>
            Intento {eventKey + 1}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body>
            <Card.Text>Inicio: {attempt.inicio}</Card.Text>
            <Card.Text>Fin: {attempt.fin}</Card.Text>
            <Card.Text>Respuestas Correctas: {attempt.correctos}</Card.Text>
            <Card.Text>Respuestas Incorrectas: {attempt.incorrectos}</Card.Text>
            {/* Aquí puedes iterar sobre las respuestas y mostrar los detalles */}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AttemptCard;
