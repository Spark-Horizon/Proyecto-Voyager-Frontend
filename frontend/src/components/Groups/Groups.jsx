import { useEffect, useState } from "react";
import { Card, Button, Container } from 'react-bootstrap';
import { getGroups, deleteGroup, exitGroup } from "../../helpers/Groups/api";
import { NewGroupModal } from "./NewGroupModal";
import { useAuth } from '../../hooks/AuthContext';
import { CustomButton } from "../CustomButton";
import { PathPage } from '../student/PathPage';

import '../../styles/Groups/App.css';
import '../../styles/Groups/Groups.css';
import '../../styles/Groups/NewGroupModal.css';

export const Groups = () => {
  const { user } = useAuth();
  const { role, id } = user;

  // Create state variables
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idMateria, setIdMateria] = useState(null);

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

  // Function to delete a group (TEACHER)
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
        }
      } else {
        alert("Operación cancelada.");
      }
    }
  };

  // Function to exit a group (STUDENT)
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
        }
      } else {
        alert("Operación cancelada.");
      }
    }
  };

  const renderGroupsOrPath = () => {
    if (idMateria === null) {
      return (
        <section id="groupsPage" style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}>
          <div className="groups-title-container">
            <h2 className="groups-title">Grupos</h2>
          </div>
          <div className="group-button">
                <Button onClick={() => setShowModal(true)}>
                  {role === 'teacher' ? 'Crear grupo 🪐' : 'Unirse a grupo'}
                </Button>
                <NewGroupModal
                  user={user}
                  show={showModal}
                  onHide={() => setShowModal(false)}
                  onGroupCreated={fetchGroups}
                />
          </div>
          <Container>
            <div className="card-container-wrapper">
              <div className="grupos">
                {groups.map((group) => (
                  <div key={group.id}>
                    <Card>
                      <Card.Body> 
                        <Card.Title><strong>Código:</strong> {group.codigo}</Card.Title> 
                        <Card.Title><strong>ID Materia:</strong> {group.id_materia}</Card.Title>
                        <Button variant="danger" onClick={() => handleDelete(role, group.id, id, group.codigo)}>
                          {role === 'teacher' ? 'Eliminar' : 'Salir'}
                        </Button>
                        {role === 'student' && (
                          <CustomButton text={'Ir al path'} type={'btn btnPrimary'} func={() => setIdMateria(group.id_materia)} />
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      );
    } else {
      return (
        <div className="startSection">
          <Button onClick={() => setIdMateria(null)} className="mb-3">
            Regresar
          </Button>
          <PathPage materia_id={idMateria} />
        </div>
      );
    }
  };

  // Return the JSX for the component
  return (
    <div className="groups-page">
      {renderGroupsOrPath()}
    </div>
  );
};
