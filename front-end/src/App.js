import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid='true' collapseOnSelect bg='light' variant='light'>
          <LinkContainer
            to='/'
          >
            <Navbar.Brand>
              TICNSP | Automations
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className='mr-auto'></Nav>
            <Nav>
              {this.state.isAuthenticated
                ? <Fragment>
                    <NavDropdown id='inscripciones-dropdown' title='Inscripciones'>
                      <LinkContainer
                        to='/semesters'
                      >
                        <NavDropdown.Item>Semesters</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                  </Fragment>
                : <Fragment>
                    <LinkContainer to="/signup">
                      <Nav.Link>Signup</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
