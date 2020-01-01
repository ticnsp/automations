import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { API } from 'aws-amplify';
import * as moment from 'moment';
import config from '../../config';

const { dateTimeFormat } = config.app;

export default function Semesters(props) {
  const [semesters, setSemesters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return null;
      }
      try {
        const semesters = await loadSemesters();
        setSemesters(semesters);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [props.isAuthenticated]);

  async function loadSemesters() {
    return API.get('semesters', '');
  }

  function renderSemesterList(semesters) {
    return [{}].concat(semesters).map((semester, idx) =>
      idx !== 0 ? (
        <LinkContainer key={semester.semesterId} to={`/semesters/${semester.semesterId}`}>
          <ListGroup.Item>
            <div className="d-flex justify-content-between">
              <h5>{semester.semesterName}</h5>
            </div>
            <small>{`Created: ${moment(semester.createdAt).format(dateTimeFormat)}`}</small>
          </ListGroup.Item>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/semesters/new">
          <ListGroup.Item>
            <h4>
                <b>{"\uFF0B"}</b> Create new semester
            </h4>
          </ListGroup.Item>
        </LinkContainer>
      )
    );
  }
 
  return (
    <div className="pt-2">
      <h1 className="py-2">Semesters</h1>
      <ListGroup>
        {!isLoading && renderSemesterList(semesters)}
      </ListGroup>
    </div>
  );
}