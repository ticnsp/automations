import React, { Component } from 'react';
import { API } from 'aws-amplify';

import SemestersForm from '../../components/semesters/form'

export default class SemesterNewPage extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);

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
          submitText='Create'
          submitLoadingText='Creating...'
        />
      </React.Fragment>
    );
  }
}
