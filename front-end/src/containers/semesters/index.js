import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { LinkContainer } from 'react-router-bootstrap';
import { ListGroup, ListGroupItem } from "react-bootstrap";
import moment from 'moment';

export default class SemestersPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			semesters: [],
		};
	}

	async componentDidMount() {
		if (!this.props.isAuthenticated) {
			return;
		}

		try {
			const semesters = await this.semesters();
			this.setState({ semesters });
		} catch (e) {
			alert(e);
		}

		this.setState({ isLoading: false });
	}

	semesters() {
		return API.get('semesters', '/semesters');
	}

	singleSemester(semester) {
		const {
			semesterId,
			semesterName,
			startDate,
			endDate,
			createdAt,
			updatedAt,
		} = semester;
		const formattedStartDate = moment(startDate).format('YYYY/MM/DD');
		const formattedEndDate = moment(endDate).format('YYYY/MM/DD');
		const lastUpdated = updatedAt
			? moment(updatedAt).format('YYYY/MM/DD HH:mm:SSS')
			: moment(createdAt).format('YYYY/MM/DD HH:mm:SSS');
		return (
			<LinkContainer
				key={semesterId}
				to={`/semesters/${semesterId}`}
			>
				<ListGroupItem>
					<div className='d-flex w-100 justify-content-between'>
						<h5 className='mb-1'>{ semesterName }</h5>
						<small>{ lastUpdated }</small>
					</div>
					<p>
						Start Date: { formattedStartDate }
						<br />
						End Date: {formattedEndDate}
					</p>
				</ListGroupItem>
			</LinkContainer>
		);
	}

	newSemester() {
		return (
			<LinkContainer
				key='new'
				to='/semesters/new'
			>
				<ListGroupItem>
					<h4>
						<b>{'\uFF0B'}</b> Create a new semester
          </h4>
				</ListGroupItem>
			</LinkContainer>
		);
	}

	renderSemestersList(semesters) {
		const semestersList = [{}].concat(semesters).map((semester, i) => {
			if (i !== 0) {
				return this.singleSemester(semester);
			}
			return this.newSemester();
		});
		return semestersList;
	}

	renderSemesters() {
		const {
			semesters,
		} = this.state;
		return (
			<React.Fragment>
				<ListGroup>
					{ !this.state.isLoading && this.renderSemestersList(semesters)}
				</ListGroup>
			</React.Fragment>
		);
	}

	render() {
		return (
			<React.Fragment>
				<h1 className='mb-4 mt-4'>Semesters</h1>
				{ this.renderSemesters() }
			</React.Fragment>
		);
	}
}
