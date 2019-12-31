import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { API } from 'aws-amplify';
import { useFormFields } from '../../libs/hooksLib';
import { parseDateField, handleDateFieldChange } from '../../libs/dateLib';
import LoaderButton from '../../components/LoaderButton';
import './Form.css';

export default function CoordinatorForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  let initialFieldsValue = {
    coordinatorNames: '',
    lastNames: '',
    birthdate: '',
    gender: '',
  };
  if (props.coordinator) {
    const { coordinator } = props;
    initialFieldsValue = {
      coordinatorId: coordinator.coordinatorId,
      coordinatorNames: coordinator.coordinatorNames,
      lastNames: coordinator.lastNames,
      birthdate: coordinator.birthdate,
      gender: coordinator.gender,
    };
  }
  const [fields, handleFieldChange] = useFormFields(initialFieldsValue);

  function validateForm() {
    return (
      fields.coordinatorNames.length > 0 &&
      fields.lastNames.length > 0 &&
      fields.birthdate.length > 0 &&
      (fields.gender && fields.gender.length > 0)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      let coordinatorResponse;
      if (props.coordinator) {
        coordinatorResponse = await updateCoordinator(fields);
      } else {
        coordinatorResponse = await createCoordinator(fields);
      }
      props.redirectFunction(coordinatorResponse);
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  }

  async function createCoordinator(coordinator) {
    return API.post('coordinators', '', {
      body: coordinator,
    });
  }

  async function updateCoordinator(coordinator) {
    return API.put('coordinators', `/${coordinator.coordinatorId}`, {
      body: coordinator,
    });
  }

  return (
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
        {props.coordinator ? 'Update' : 'Create'}
        </LoaderButton>
    </Form>
  );
}