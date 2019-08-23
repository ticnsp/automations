import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import LoaderButton from '../../components/LoaderButton';

export default class SemesterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      semester: null,
      semesterName: '',
      startDate: null,
      endDate: null,
      createdAt: null,
    };
  }

  async componentDidMount() {
    try {
      const semester = await this.getSemester();

      const {
        semesterName,
        startDate,
        endDate,
        createdAt,
        updatedAt,
      } = semester;

      const formattedCreatedAt = moment(createdAt).format('YYYY/MM/DD HH:mm:SS');
      const formattedUpdatedAt = updatedAt
        ? moment(updatedAt).format('YYYY/MM/DD HH:mm:SS')
        : '-';

      this.setState({
        semester,
        semesterName,
        startDate,
        endDate,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
      });
    } catch (e) {
      alert(e);
    }
  }

  getSemesterId() {
    const {
      id: semesterId,
    } = this.props.match.params;
    return semesterId;
  }

  getSemester() {
    const semesterId = this.getSemesterId();
    return API
      .get(
        'semesters',
        `/semesters/${semesterId}`
        );
  }

  saveSemester(semester) {
    const semesterId = this.getSemesterId();
    return API
      .put(
        'semesters',
        `/semesters/${semesterId}`,
        {
          body: semester,
        },
      );
  }

  deleteSemester() {
    const semesterId = this.getSemesterId();
    return API
      .del(
        'semesters',
        `/semesters/${semesterId}`,
      );
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

    try {
      await this.saveSemester({
        semesterName,
        startDate,
        endDate,
      });
      this.props.history.push('/semesters');
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      'Are you sure you want to delete this semester?',
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteSemester();
      this.props.history.push('/semesters');
    } catch(e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      <React.Fragment>
				<h1 className='mb-4 mt-4'>Semester Detail</h1>
        {this.state.semester && 
          <React.Fragment>
            <p>
              Created at: {this.state.createdAt}
              <br />
              Updated at: {this.state.updatedAt}
            </p>
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
                  selected={new Date(this.state.startDate)}
                  onChange={this.handleDateChange('start')}
                  className='form-control'
                />
              </Form.Group>
              <Form.Group controlId='endDate'>
                <Form.Label>End Date</Form.Label>
                <br />
                <DatePicker
                  selected={new Date(this.state.endDate)}
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
                text='Update'
                loadingText='Updating...'
              />
              <LoaderButton
                block
                variant='danger'
                size='lg'
                isLoading={ this.state.isDeleting }
                onClick={this.handleDelete}
                text='Delete'
                loadingText='Deleting...'
              />
            </Form>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }

}
