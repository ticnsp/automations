import React, { Component } from 'react';
import {
  Form,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoaderButton from '../LoaderButton';

export default class StudentsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleSubmit,
      handleChange,
      studentNames,
      lastNames,
      birthdate,
      tutors,
      emergencyContact,
      notes,
      handleBirthdateChange,
      isLoading,
      validateForm,
      submitText,
      submitLoadingText,
    } = this.props;

    return (
      <React.Fragment>
        <h1 className='mb-4 mt-4'>Create new student</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='studentNames'>
            <Form.Label>Names</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={studentNames}
              type='input'
            />
          </Form.Group>
          <Form.Group controlId='lastNames'>
            <Form.Label>Last Names</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={lastNames}
              type='input'
            />
          </Form.Group>
          <Form.Group controlId='startDate'>
            <Form.Label>Birthdate</Form.Label>
            <br />
            <DatePicker
              selected={birthdate ? new Date(birthdate) : birthdate}
              onChange={handleBirthdateChange}
              className='form-control'
            />
          </Form.Group>
          <Form.Group controlId='notes'>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={notes}
              type='textarea'
            />
          </Form.Group>
          <LoaderButton
            block
            variant='light'
            size='lg'
            disabled={!validateForm()}
            type='submit'
            isLoading={isLoading}
            text={submitText}
            loadingText={submitLoadingText}
          />
        </Form>
      </React.Fragment>
    );
  }
}
