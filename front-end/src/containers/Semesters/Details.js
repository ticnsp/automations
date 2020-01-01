import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { API } from 'aws-amplify';
import SemesterForm from './Form';
import DeleteSemesterModal from './DeleteModal';

export default function SemesterDetails(props) {
  const [semester, setSemester] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return null;
      }
      try {
        const semester = await loadSemester();
        setSemester(semester);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    }
    async function loadSemester() {
      return API.get('semesters', `/${props.match.params.id}`);
    }
    onLoad();
  }, [props.isAuthenticated, props.match.params.id]);

  function toggleIsEditing() {
    const updatedIsEditing = !isEditing;
    setIsEditing(updatedIsEditing);
  }

  function redirectAfterUpdate(semester) {
    setSemester(semester);
    setIsEditing(false);
  }

  function redirectAfterDelete() {
    props.history.push('/semesters');
  }

  return (
    <div className="pt-2">
      <h1 className="py-2">{ isEditing ? 'Edit Semester' : 'Semester Details' }</h1>
      {!isLoading && (!isEditing
        ? <Form>
            <Form.Group controlId="semesterName"> 
              <Form.Label>Name</Form.Label>
              <Form.Control
                readOnly
                plaintext
                defaultValue={semester.semesterName}
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                readOnly
                plaintext
                defaultValue={semester.startDate}
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                readOnly
                plaintext
                defaultValue={semester.endDate}
              />
            </Form.Group>
            <Form.Group controlId="semesterCurrent">
              <Form.Switch
                disabled
                label="Current"
                defaultChecked={semester.semesterCurrent}
              />
            </Form.Group>
          </Form>
        : <SemesterForm
            semester={semester}
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
          <DeleteSemesterModal
            semester={semester}
            redirectFunction={redirectAfterDelete}
          />
        </div>
      }
    </div>
  );
}