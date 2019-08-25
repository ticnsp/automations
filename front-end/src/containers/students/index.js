import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { LinkContainer } from 'react-router-bootstrap';
import { ListGroup, ListGroupItem } from "react-bootstrap";
import moment from 'moment';

export default class StudentsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			students: [],
		};
	}

	async componentDidMount() {
		if (!this.props.isAuthenticated) {
			return;
		}

		try {
			const students = await this.students();
			this.setState({ students });
		} catch (e) {
			alert(e);
		}

		this.setState({ isLoading: false });
	}

	students() {
		return API.get('students', '/students');
	}

	singleStudent(student) {
		const {
			studentId,
			studentNames,
			lastNames,
			birthdate,
			tutors,
			emergencyContact,
			notes,
			createdAt,
			updatedAt,
		} = student;
		const formattedBirthdate = moment(birthdate).format('YYYY/MM/DD');
		const lastUpdated = updatedAt
			? moment(updatedAt).format('YYYY/MM/DD HH:mm:SSS')
			: moment(createdAt).format('YYYY/MM/DD HH:mm:SSS');
		const composedName = `${studentNames} ${lastNames}`
		return (
			<LinkContainer
				key={studentId}
				to={`/students/${studentId}`}
			>
				<ListGroupItem>
					<div className='d-flex w-100 justify-content-between'>
						<h5 className='mb-1'>{ composedName }</h5>
						<small>{ lastUpdated }</small>
					</div>
					<p>
						Birthdate: { formattedBirthdate }
						<br />
						Notes: { notes }
					</p>
				</ListGroupItem>
			</LinkContainer>
		);
	}

	newStudent() {
		return (
			<LinkContainer
				key='new'
				to='/students/new'
			>
				<ListGroupItem>
					<h4>
						<b>{'\uFF0B'}</b> Create a new student
          </h4>
				</ListGroupItem>
			</LinkContainer>
		);
	}

	renderStudentsList(students) {
		const studentsList = [{}].concat(students).map((student, i) => {
			if (i !== 0) {
				return this.singleStudent(student);
			}
			return this.newStudent();
		});
		return studentsList;
	}

	renderStudents() {
		const {
			students,
		} = this.state;
		return (
			<React.Fragment>
				<ListGroup>
					{ !this.state.isLoading && this.renderStudentsList(students)}
				</ListGroup>
			</React.Fragment>
		);
	}

	render() {
		return (
			<React.Fragment>
				<h1 className='mb-4 mt-4'>Students</h1>
				{ this.renderStudents() }
			</React.Fragment>
		);
	}
}
