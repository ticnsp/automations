import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { API } from 'aws-amplify';

export default function Coordinators(props) {
  const [coordinators, setCoordinators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return null;
      }
      try {
        const coordinators = await loadCoordinators();
        setCoordinators(coordinators);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [props.isAuthenticated]);

  async function loadCoordinators() {
    return API.get('coordinators', '');
  }

  function renderCoordinatorList(coordinators) {
    return [{}].concat(coordinators).map((coordinator, idx) =>
      idx !== 0 ? (
        <LinkContainer key={coordinator.coordinatorId} to={`/coordinators/${coordinator.coordinatorId}`}>
          <ListGroup.Item>
            <div className="d-flex justify-content-between">
              <h5>{coordinator.coordinatorNames}</h5>
            </div>
            <small>{`Created: ${coordinator.createdAt}`}</small>
          </ListGroup.Item>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/coordinators/new">
          <ListGroup.Item>
            <h4>
                <b>{"\uFF0B"}</b> Create new coordinator
            </h4>
          </ListGroup.Item>
        </LinkContainer>
      )
    );
  }
 
  return (
    <div className="pt-2">
      <h1 className="py-2">Coordinators</h1>
      <ListGroup>
        {!isLoading && renderCoordinatorList(coordinators)}
      </ListGroup>
    </div>
  );
}