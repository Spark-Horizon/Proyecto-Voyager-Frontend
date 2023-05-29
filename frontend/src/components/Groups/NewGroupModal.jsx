import { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { createGroup, getSubjects } from '../../helpers/Groups/api';

//A modal is something that is over the main screen
export const NewGroupModal = ({ user, show, onHide, onGroupCreated }) => {
    //Create state variable for form data
    const [groupData, setGroupData] = useState({
        idMateriaGrupo: '',
        visibleGrupo: true
    });

    // State variable for the subjects
    const [subjects, setSubjects] = useState([]);

    // Fetch the subjects from the database when the component mounts
    useEffect(() => {
      fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
      try {
        const fetchedSubjects = await getSubjects();
        setSubjects(fetchedSubjects);
      } catch (error) {
        console.error(error);
      }
    };

    //Function to handle the form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await createGroup({ ...groupData, user });
        setGroupData({
            idMateriaGrupo: '',
            visibleGrupo: true
        });
        onHide();
        onGroupCreated();
    };

    // Return the JSX for the component
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Crear Grupo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Materia</Form.Label>
                        <Form.Control as="select" value={groupData.idMateriaGrupo} onChange={e => setGroupData({ ...groupData, idMateriaGrupo: e.target.value })}>
                            <option value="">Seleccione una materia</option>
                            {subjects.map((subject) => (
                              <option key={subject.id} value={subject.id}>
                                {subject.nombre}
                              </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
