import { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { createGroup, getSubjects, enterGroup } from '../../helpers/Groups/api';
import { useAuth } from "../../hooks/AuthContext";

//A modal is something that is over the main screen
export const NewGroupModal = ({ show, onHide, onGroupCreated }) => {

    const { user } = useAuth();

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

        const userGroupData = {
            codigoGrupo: groupData.idMateriaGrupo,
            user: {
                id: user.id,
                name: user.name,
                lastname1: user.lastname1,
                lastname2: user.lastname2,
                role: user.role
            }
        };

        if (user.role === 'student') {
            await enterGroup(userGroupData);
        } else {
            await createGroup({ ...groupData, user });
        }

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
                <Modal.Title>{user.role === 'student' ? 'Unirse a grupo' : 'Crear grupo'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>{user.role === 'student' ? 'Código Único' : 'Materia'}</Form.Label>
                        {user.role === 'student' ?
                            <Form.Control
                                type="text"
                                placeholder="Escriba el Código Único"
                                value={groupData.idMateriaGrupo}
                                onChange={e => setGroupData({ ...groupData, idMateriaGrupo: e.target.value })}
                            />
                            :
                            <Form.Control as="select" value={groupData.idMateriaGrupo} onChange={e => setGroupData({ ...groupData, idMateriaGrupo: e.target.value })}>
                                <option value="">Seleccione una materia</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.nombre}
                                    </option>
                                ))}
                            </Form.Control>
                        }
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {user.role === 'student' ? 'Unirse' : 'Crear'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
