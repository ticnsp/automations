import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      requiresNewPassword: false,
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      const user = await Auth.signIn(this.state.email, this.state.password);
      const { challengeName } = user;
      if (challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.setState({ requiresNewPassword: true });
        this.setState({ user });
        this.setState({ isLoading: false });
      } else {
        this.props.userHasAuthenticated(true);
      }
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  handleNewPasswordSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.completeNewPassword(this.state.user, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      this.state.requiresNewPassword
        ? <div className="Login">
         <Form onSubmit={this.handleNewPasswordSubmit}>
          <Form.Group controlId="password" bsSize="large">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </Form>
        </div> 
        : <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bsSize="large">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </Form>
      </div>
    );
  }
}
