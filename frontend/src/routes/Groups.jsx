import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { getGroups, deleteGroup } from "../helpers/Groups/api";
import { NewGroupModal } from "../components/Groups/NewGroupModal";
import '../styles/Groups/App.css';
import '../styles/Groups/Groups.css';
import '../styles/Groups/NewGroupModal.css';

export const Groups = ({ user }) => {
  // Create state variables
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Use Effect to get the groups on first render
  useEffect(() => {
    fetchGroups();
  }, []);

  // Fetch groups from API
  const fetchGroups = async () => {
    const fetchedGroups = await getGroups(user.id,user.role);
    console.log(fetchedGroups);
    setGroups(fetchedGroups);
  };

  // Delete a group
  const handleDelete = async (id) => {
    await deleteGroup(id);
    fetchGroups();
  };

  // Return the JSX for the component
  return (
    <Container>
      {/* Button to open the NewGroupModal */}
      <Button onClick={() => setShowModal(true)} className="mb-3">Create Group</Button>

      {/* Modal for creating new group */}
      <NewGroupModal user={user} show={showModal} onHide={() => setShowModal(false)} onGroupCreated={fetchGroups} />

      {/* Display groups */}
      <Row className="container-cc">
        {groups.map((group, index) => (
          <Col md={4} key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{group.idMateriaGrupo}</Card.Title>
                <Button variant="danger" onClick={() => handleDelete(group.id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};