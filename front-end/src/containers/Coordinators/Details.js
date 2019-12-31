import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { API } from 'aws-amplify';
import CoordinatorForm from './Form';
import DeleteCoordinatorModal from './DeleteModal';

export default function CoordinatorDetails(props) {
  const [coordinator, setCoordinator] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return null;
      }
      try {
        const coordinator = await loadCoordinator();
        setCoordinator(coordinator);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    }
    async function loadCoordinator() {
      return API.get('coordinators', `/${props.match.params.id}`);
    }
    onLoad();
  }, [props.isAuthenticated, props.match.params.id]);

  function toggleIsEditing() {
    const updatedIsEditing = !isEditing;
    setIsEditing(updatedIsEditing);
  }

  function redirectAfterUpdate() {
    setIsEditing(false);
  }

  function redirectAfterDelete() {
    props.history.push('/coordinators');
  }

  return (
    <div className="pt-2">
      <h1 className="py-2">{ isEditing ? 'Edit Coordinator' : 'Coordinator Details' }</h1>
      {!isLoading && (!isEditing
        ? <Form>
            <Form.Group controlId="coordinatorNames"> 
              <Form.Label>Names</Form.Label>
              <Form.Control
                readOnly
                plaintext
                defaultValue={coordinator.coordinatorNames}
              />
            </Form.Group>
            <Form.Group controlId="lastNames">
              <Form.Label>Last names</Form.Label>
              <Form.Control
                readOnly
                plaintext
                defaultValue={coordinator.lastNames}
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                readOnly
                plaintext
                defaultValue={coordinator.gender}
              />
            </Form.Group>
            <Form.Group controlId="birthdate">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                readOnly
                plaintext
                defaultValue={coordinator.birthdate}
              />
            </Form.Group>
          </Form>
        : <CoordinatorForm
            coordinator={coordinator}
            redirectFunction={redirectAfterUpdate}
          />
        )
      }
      { !isLoading &&
        <div className="d-flex">
          <Button
            onClick={toggleIsEditing}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          <DeleteCoordinatorModal
            coordinator={coordinator}
            redirectFunction={redirectAfterDelete}
          />
        </div>
      }
    </div>
  );
}