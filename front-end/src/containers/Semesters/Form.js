import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { API } from 'aws-amplify';
import { useFormFields } from '../../libs/hooksLib';
import { parseDateField, handleDateFieldChange } from '../../libs/dateLib';
import { handleBoolFieldChange } from '../../libs/boolLib';
import LoaderButton from '../../components/LoaderButton';
import './Form.css';
import config from '../../config';

const { datepickerDateFormat } = config.app;

export default function SemesterForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  let initialFieldsValue = {
    semesterName: '',
    startDate: '',
    endDate: '',
    semesterCurrent: false,
  };
  if (props.semester) {
    const { semester } = props;
    initialFieldsValue = {
      semesterId: semester.semesterId,
      semesterName: semester.semesterName,
      startDate: semester.startDate,
      endDate: semester.endDate,
      semesterCurrent: semester.semesterCurrent,
    };
  }
  const [fields, handleFieldChange] = useFormFields(initialFieldsValue);

  function validateForm() {
    return (
      fields.semesterName.length > 0 &&
      fields.startDate.length > 0 &&
      fields.endDate.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      let semesterResponse;
      if (props.semester) {
        semesterResponse = await updateSemester(fields);
      } else {
        semesterResponse = await createSemester(fields);
      }
      props.redirectFunction(semesterResponse);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  }

  async function createSemester(semester) {
    return API.post('semesters', '', {
      body: semester,
    });
  }

  async function updateSemester(semester) {
    return API.put('semesters', `/${semester.semesterId}`, {
      body: semester,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="semesterName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          value={fields.semesterName}
          onChange={handleFieldChange}
        />
      </Form.Group>
      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <DatePicker
          showYearDropdown
          dateFormat={datepickerDateFormat}
          selected={parseDateField(fields.startDate)}
          onChange={handleDateFieldChange('startDate', handleFieldChange)}
        />
      </Form.Group>
      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <DatePicker
          showYearDropdown
          dateFormat={datepickerDateFormat}
          selected={parseDateField(fields.endDate)}
          onChange={handleDateFieldChange('endDate', handleFieldChange)}
        />
      </Form.Group>
       <Form.Group controlId="semesterCurrent">
        <Form.Check
          type="switch"
          label="Current"
          checked={fields.semesterCurrent}
          onChange={handleBoolFieldChange('semesterCurrent', handleFieldChange)}
        />
        {fields.semesterCurrent ? 'true' : 'false'}
      </Form.Group>
      <LoaderButton
        type="submit"
        block
        variant="light"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        {props.semester ? 'Update' : 'Create'}
        </LoaderButton>
    </Form>
  );
}