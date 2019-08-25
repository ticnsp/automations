import React, { Component } from 'react';
import { API } from 'aws-amplify';
import moment from 'moment';
import LoaderButton from '../../components/LoaderButton';

import StudentsForm from '../../components/students/form';

export default class StudentPage extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);

    this.state = {
      isLoading: null,
      isDeleting: null,
      student: null,
      studentNames: '',
      lastNames: '',
      birthDate: null,
      tutors: null,
      emergencyContact: null,
      notes: '',
      createdAt: null,
      updatedAt: null,
    };
  }

  async componentDidMount() {
    try {
      const student = await this.getStudent();

      const {
        studentNames,
        lastNames,
        birthdate,
        tutors,
        emergencyContact,
        notes,
        createdAt,
        updatedAt,
      } = student;

      const formattedCreatedAt = moment(createdAt).format('YYYY/MM/DD HH:mm:SS');
      const formattedUpdatedAt = updatedAt
        ? moment(updatedAt).format('YYYY/MM/DD HH:mm:SS')
        : '-';

      this.setState({
        student,
        studentNames: (studentNames || ''),
        lastNames,
        birthdate,
        tutors,
        emergencyContact,
        notes,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
      });
    } catch (e) {
      alert(e);
    }
  }

  getStudentId() {
    const {
      id: studentId,
    } = this.props.match.params;
    return studentId;
  }

  getStudent() {
    const studentId = this.getStudentId();
    return API
      .get(
        'students',
        `/students/${studentId}`
        );
  }

  saveStudent(student) {
    const studentId = this.getStudentId();
    return API
      .put(
        'students',
        `/students/${studentId}`,
        {
          body: student,
        },
      );
  }

  deleteStudent() {
    const studentId = this.getStudentId();
    return API
      .del(
        'students',
        `/students/${studentId}`,
      );
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

    try {
      await this.saveStudent({
        studentNames,
        lastNames,
        birthdate,
        tutors,
        emergencyContact,
        notes,
      });
      this.props.history.push('/students');
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      'Are you sure you want to delete this student?',
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteStudent();
      this.props.history.push('/students');
    } catch(e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      <React.Fragment>
				<h1 className='mb-4 mt-4'>Student Detail</h1>
        {this.state.student && 
          <React.Fragment>
            <p>
              Created at: {this.state.createdAt}
              <br />
              Updated at: {this.state.updatedAt}
            </p>
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
              submitText='Update'
              submitLoadingText='Updating...'
            />
            <LoaderButton
              className='mt-4'
              block
              variant='danger'
              size='lg'
              isLoading={ this.state.isDeleting }
              onClick={this.handleDelete}
              text='Delete'
              loadingText='Deleting...'
            />
          </React.Fragment>
        }
      </React.Fragment>
    );
  }

}
