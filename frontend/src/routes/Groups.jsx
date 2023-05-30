import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { getGroups, deleteGroup, exitGroup } from "../helpers/Groups/api";
import { NewGroupModal } from "../components/Groups/NewGroupModal";
import '../styles/Groups/App.css';
import '../styles/Groups/Groups.css';
import '../styles/Groups/NewGroupModal.css';

export const Groups = ({ user }) => {

  const { role, id } = user;

  // Create state variables
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Use Effect to get the groups on first render
  useEffect(() => {
    fetchGroups();
  }, []);

  // Fetch groups from API
  const fetchGroups = async () => {
    try {
      const fetchedGroups = await getGroups(role, id);
      setGroups(fetchedGroups);
    } catch (error) {
      console.error(error);
      // Aquí podrías agregar código para manejar el error de manera más específica
    }
  };

  // Function to handle the Delete petition according to the role
  const handleDelete = async (role, id_group, id_estudiante, codigo) => {
    switch (role) {
      case 'teacher':
        deleteGroupFront(role, id_group);
        break;
      case 'student':
        if (codigo) {
          exitGroupFront(role, id_estudiante, codigo);
        } else {
          throw new Error('Codigo is required for role "student".');
        }
        break;
      default:
        break;
    }
  };


  //Function to delete a group (TEACHER)
  const deleteGroupFront = async (role, id) => {
    let confirmation = window.confirm("¿Seguro que quieres eliminar?");
    if (confirmation) {
      let deleteConfirmation = window.prompt("Escribe 'eliminar' para continuar");
      if (deleteConfirmation && deleteConfirmation.toLowerCase() === "eliminar") {
        try {
          await deleteGroup(role, id);
          // Update groups state after deleting
          setGroups(groups.filter(group => group.id !== id));
        } catch (error) {
          console.error(error);
          // Aquí podrías agregar código para manejar el error de manera más específica
        }
      } else {
        alert("Operación cancelada.");
      }
    }
  };

  //Function to exit a group (STUDENT)
  const exitGroupFront = async (role, id, codigo) => {
    let confirmation = window.confirm("¿Seguro que quieres salir del grupo?");
    if (confirmation) {
      let deleteConfirmation = window.prompt("Escribe 'salir' para continuar");
      if (deleteConfirmation && deleteConfirmation.toLowerCase() === "salir") {
        try {
          await exitGroup(role, id, codigo);
          // Update groups state after deleting
          setGroups(groups.filter(group => group.id !== id));
        } catch (error) {
          console.error(error);
          // Aquí podrías agregar código para manejar el error de manera más específica
        }
      } else {
        alert("Operación cancelada.");
      }
    }
  }

  // Return the JSX for the component
  return (
    <Container>
      {/* Button to open the NewGroupModal */}
      <Button onClick={() => setShowModal(true)} className="mb-3">Crear grupo 🪐</Button>

      {/* Modal for creating new group */}
      <NewGroupModal user={user} show={showModal} onHide={() => setShowModal(false)} onGroupCreated={fetchGroups} />

      {/* Display groups */}
      <Row className="container-cc">
        {groups.map((group) => (
          <Col md={4} key={group.id}>
            <Card>
              <Card.Body>
                <Card.Title>{`Código: ${group.codigo}
                ID Materia: ${group.id_materia}`}</Card.Title>
                <Button variant="danger" onClick={() => handleDelete(role,group.id,id,group.codigo)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
