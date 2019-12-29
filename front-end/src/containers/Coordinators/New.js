import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { API } from 'aws-amplify';
import { useFormFields } from '../../libs/hooksLib';
import { parseDateField, handleDateFieldChange } from '../../libs/dateLib';
import LoaderButton from '../../components/LoaderButton';
import './New.css';

export default function NewCoordinator(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    coordinatorNames: '',
    lastNames: '',
    birthdate: '',
    gender: '',
  });

  function validateForm() {
    return (
      fields.coordinatorNames.length > 0 &&
      fields.lastNames.length > 0 &&
      fields.birthdate.length > 0 &&
      fields.gender.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await createCoordinator(fields); 
      props.history.push('/coordinators');
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  }

  async function createCoordinator(coordinator) {
    return API.post('coordinators', '', {
      body: coordinator,
    });
  }

  return (
    <div className="pt-2">
      <h1 className="py-2">New Coordinator</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="coordinatorNames"> 
          <Form.Label>Names</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.coordinatorNames}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="lastNames">
          <Form.Label>Last names</Form.Label>
          <Form.Control
            type="text"
            value={fields.lastNames}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            value={fields.gender}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="birthdate">
          <Form.Label>Birthdate</Form.Label>
          <DatePicker
            showYearDropdown
            selected={parseDateField(fields.birthdate)}
            onChange={handleDateFieldChange('birthdate', handleFieldChange)}
          />
        </Form.Group>
        <LoaderButton
          type="submit"
          block
          variant="light"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}