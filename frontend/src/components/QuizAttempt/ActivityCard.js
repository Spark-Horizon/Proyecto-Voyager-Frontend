import React from 'react';
import { Card } from 'react-bootstrap';

export const ActivityCard = ({ activity }) => {

  function formatearFechaHora(cadenaFechaHora) {
    const fechaHora = new Date(cadenaFechaHora);
    const dia = agregarCero(fechaHora.getUTCDate());
    const mes = agregarCero(fechaHora.getUTCMonth() + 1);
    const año = fechaHora.getUTCFullYear();
    const horas = agregarCero(fechaHora.getUTCHours());
    const minutos = agregarCero(fechaHora.getUTCMinutes());
  
    return `${dia}/${mes}/${año}, ${horas}:${minutos}`;
  }

  function agregarCero(numero) {
    return numero < 10 ? `0${numero}` : numero;
  }

  return (
    <Card className="activity-card">
      <Card.Header>{activity.titulo}</Card.Header>
      <Card.Body>
        <Card.Text>Inicio: {formatearFechaHora(activity.inicio)}</Card.Text>
        <Card.Text>Fin: {formatearFechaHora(activity.fin)}</Card.Text>
        <Card.Text>Bloqueo: {activity.bloqueo ? "Sí" : "No"}</Card.Text>
        <Card.Text>Disponible: {activity.disponible ? "Sí" : "No"}</Card.Text>
        <Card.Text>Visible: {activity.visible ? "Sí" : "No"}</Card.Text>
      </Card.Body>
    </Card>
  );
};
