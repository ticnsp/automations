import React, { Component } from 'react';
import {
  Form,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoaderButton from '../LoaderButton';

export default class SemestersForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleSubmit,
      handleChange,
      semesterName,
      startDate,
      endDate,
      handleStartDateChange,
      handleEndDateChange,
      isLoading,
      validateForm,
      submitText,
      submitLoadingText,
    } = this.props;

    return (
      <React.Fragment>
        <h1 className='mb-4 mt-4'>Create new semester</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='semesterName'>
            <Form.Label>Semester Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={semesterName}
              type='input'
            />
          </Form.Group>
          <Form.Group controlId='startDate'>
            <Form.Label>Start Date</Form.Label>
            <br />
            <DatePicker
              selected={startDate ? new Date(startDate) : startDate}
              onChange={handleStartDateChange}
              className='form-control'
            />
          </Form.Group>
          <Form.Group controlId='endDate'>
            <Form.Label>End Date</Form.Label>
            <br />
            <DatePicker
              selected={endDate ? new Date(endDate) : endDate}
              onChange={handleEndDateChange}
              className='form-control'
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
