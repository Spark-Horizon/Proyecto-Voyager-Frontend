import { useEffect, useState } from "react";
import { Card, Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getGroups, deleteGroup, exitGroup } from "../../helpers/Groups/api";
import { NewGroupModal } from "./NewGroupModal";
import { useAuth } from '../../hooks/AuthContext';
import { CustomButton } from "../CustomButton";
import { PathPage } from '../student/PathPage';

import '../../styles/Groups/App.css';
import '../../styles/Groups/Groups.css';
import '../../styles/Groups/NewGroupModal.css';

import { PDSHPanelTemplate } from "../P_DASHBOARD/PDSHPanelTemplate";

export const Groups = ({setGroupId, changeParentView}) => {
  const { user } = useAuth();
  const { role, id } = user;

  // Create state variables
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idMateria, setIdMateria] = useState(null);
  const [expandedActivitiesButton, setExpandedActivitiesButton] = useState(false);

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

  const optionalItems = [
    <Button onClick={() => setShowModal(true)}>
      {role === 'teacher' ? 'Crear grupo 🪐' : 'Unirse a grupo 🚀'}
    </Button>
  ];

  const handleMouseEnter = () => {
    setExpandedActivitiesButton(true);
  };

  const handleMouseLeave = () => {
    setExpandedActivitiesButton(false);
  };

  const handleOnActividadesClick = (groupId) => {
    setGroupId(groupId);
    changeParentView(1);
  }

  const renderTruncatedButton = (text, func) => {
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="tooltip">{text}</Tooltip>}
      >
        <Button 
          className={`text-truncate grupos-btn ${expandedActivitiesButton ? 'expanded' : ''}`} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          onClick={func}
        >
          {text}
        </Button>
      </OverlayTrigger>
    );
  };

  const handleGoToPath = (group) => {
    setIdMateria(group.id_materia);
  }

  const renderGroupsOrPath = () => {
    if (idMateria === null) {
      return (
        <>
          <PDSHPanelTemplate title={'Grupos'} optionalItems={optionalItems} />
          <div className="groups-creation-main-container">
            <div className="group-button">
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
                      <Card className="grupos-card">
                        <Card.Body>
                          <div className="grupo-card-info">
                            <p className="gradient"><strong>Código:</strong></p>
                            <h1>{group.codigo}</h1>
                            <p className="gradient"><strong>ID Materia:</strong></p>
                            <h1>{group.id_materia}</h1>
                          </div>
                          <div className="grupos-btns-container">
                            <Button className="grupos-btn" variant="danger" onClick={() => handleDelete(role, group.id, id, group.codigo)}>
                              {role === 'teacher' ? 'Eliminar' : 'Salir'}
                            </Button>
                            {role === 'teacher' && renderTruncatedButton('Ver actividades', null)}
                            {role === 'student' && (
                              renderTruncatedButton('Ir al path', () => handleGoToPath(group))
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="p-dash-top-container">            
            <Button onClick={() => setIdMateria(null)} className="">
              Regresar
            </Button>
          </div>
          <div className="progress-main-container">
            <PathPage materia_id={idMateria} />
          </div>
        </>
      );
    }
  };

  // Return the JSX for the component
  return (
    <>
      {renderGroupsOrPath()}
    </>
  );
};
