import { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { createGroup } from '../../helpers/Groups/api';

//A modal is something that is over the main screen
export const NewGroupModal = ({ user, show, onHide, onGroupCreated }) => {
    //Create state variable for form data
    const [groupData, setGroupData] = useState({
        idMateriaGrupo: '',
        visibleGrupo: true
    });

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
                <Modal.Title>Create Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Group ID</Form.Label>
                        <Form.Control type="text" value={groupData.idMateriaGrupo} onChange={e => setGroupData({ ...groupData, idMateriaGrupo: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};