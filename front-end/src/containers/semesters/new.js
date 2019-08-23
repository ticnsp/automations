import React, { Component } from 'react';
import { API } from 'aws-amplify';
import {
  Form,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoaderButton from '../../components/LoaderButton';

export default class SemesterNewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      semesterName: '',
      startDate: null,
      endDate: null,
    };
  }

  createSemester(semester) {
    return API.post('semesters', '/semesters', {
      body: semester,
    });
  }

  validateForm() {
    const validation =
      (
        this.state.semesterName.length > 0 &&
        this.state.startDate &&
        this.state.endDate
      );
    return validation;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleDateChange = whichDate => {
    return (date) => {
      this.setState({
        [`${whichDate}Date`]: date,
      });
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    const {
      semesterName,
      startDate,
      endDate,
    } = this.state;

    const newSemester = {
      semesterName,
      startDate,
      endDate,
    };

    try {
      await this.createSemester(newSemester);
      this.props.history.push('/semesters');
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1 className='mb-4 mt-4'>Create new semester</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='semesterName'>
            <Form.Label>Semester Name</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              value={this.state.semesterName}
              type='input'
            />
          </Form.Group>
          <Form.Group controlId='startDate'>
            <Form.Label>Start Date</Form.Label>
            <br />
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleDateChange('start')}
              className='form-control'
            />
          </Form.Group>
          <Form.Group controlId='endDate'>
            <Form.Label>End Date</Form.Label>
            <br />
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleDateChange('end')}
              className='form-control'
            />
          </Form.Group>
          <LoaderButton
            block
            variant='light'
            size='lg'
            disabled={ !this.validateForm() }
            type='submit'
            isLoading={ this.state.isLoading }
            text='Create'
            loadingText='Creating...'
          />
        </Form>
      </React.Fragment>
    );
  }
}
