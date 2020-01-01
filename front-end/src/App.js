import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

import './App.css';

import Routes from './Routes';

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push('/login');
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar bg="light" variant="light" collapseOnSelect expand="lg">
        <Link to="/">
          <Navbar.Brand>
            TICNSP.org
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {isAuthenticated &&
              <NavDropdown title="Curso TIC" id="collasible-nav-dropdown">
                <LinkContainer to="/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/coordinators">
                  <NavDropdown.Item>Coordinadores</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/students">
                  <NavDropdown.Item>Catecúmenos</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/lectures">
                  <NavDropdown.Item>Catequesis</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/workshops">
                  <NavDropdown.Item>Talleres</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/semesters">
                  <NavDropdown.Item>Semestres</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            }
          </Nav>
          <Nav>
            {isAuthenticated
              ? <>
                  <LinkContainer to="/profile">
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
                </>
              : <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Sing Up</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Log In</Nav.Link>
                  </LinkContainer>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }}/>
    </div>
  );
}

export default withRouter(App);
