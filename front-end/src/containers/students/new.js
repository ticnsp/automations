import React, { Component } from 'react';
import { API } from 'aws-amplify';

import StudentsForm from '../../components/students/form'

export default class StudentsNewPage extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);

    this.state = {
      isLoading: false,
      studentNames: '',
      lastNames: '',
      birthdate: null,
      tutors: null,
      emergencyContact: null,
      notes: ''
    };
  }

  createStudent(student) {
    return API.post('students', '/students', {
      body: student,
    });
  }

  validateForm() {
    const validation =
      (
        this.state.studentNames.length > 0 &&
        this.state.lastNames.length > 0 &&
        this.state.birthdate
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
        [`${whichDate}date`]: date,
      });
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    const {
      studentNames,
      lastNames,
      birthdate,
      tutors,
      emergencyContact,
      notes,
    } = this.state;

    const newStudent = {
      studentNames,
      lastNames,
      birthdate,
      tutors,
      emergencyContact,
      notes,
    };

    try {
      await this.createStudent(newStudent);
      this.props.history.push('/students');
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <React.Fragment>
        <StudentsForm 
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          studentNames={this.state.studentNames}
          lastNames={this.state.lastNames}
          birthdate={this.state.birthdate}
          handleBirthdateChange={this.handleDateChange('birth')}
          tutors={this.state.tutors}
          emergencyContact={this.state.emergencyContact}
          notes={this.state.notes}
          isLoading={this.state.isLoading}
          validateForm={this.validateForm}
          submitText='Create'
          submitLoadingText='Creating...'
        />
      </React.Fragment>
    );
  }
}
