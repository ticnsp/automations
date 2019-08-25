import React, { Component } from 'react';
import { API } from 'aws-amplify';
import moment from 'moment';
import LoaderButton from '../../components/LoaderButton';

import SemestersForm from '../../components/semesters/form';

export default class SemesterPage extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);

    this.state = {
      isLoading: null,
      isDeleting: null,
      semester: null,
      semesterName: '',
      startDate: null,
      endDate: null,
      createdAt: null,
      updatedAt: null,
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
            <SemestersForm
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              semesterName={this.state.semesterName}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              handleStartDateChange={this.handleDateChange('start')}
              handleEndDateChange={this.handleDateChange('end')}
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
