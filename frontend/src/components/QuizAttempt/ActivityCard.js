import React from 'react';
import { Card } from 'react-bootstrap';

const ActivityCard = ({ activity }) => {
  return (
    <Card className="activity-card">
      <Card.Header>{activity.titulo}</Card.Header>
      <Card.Body>
        <Card.Text>Inicio: {activity.inicio}</Card.Text>
        <Card.Text>Fin: {activity.fin}</Card.Text>
        <Card.Text>Bloqueo: {activity.bloqueo ? "Sí" : "No"}</Card.Text>
        <Card.Text>Disponible: {activity.disponible ? "Sí" : "No"}</Card.Text>
        <Card.Text>Visible: {activity.visible ? "Sí" : "No"}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ActivityCard;
