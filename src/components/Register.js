/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { validateFields } from '../utils/common';
import { registerNewUser } from '../actions/auth';
import { resetErrors } from '../actions/errors';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      cpassword: '',
      successMsg: '',
      errorMsg: '',
      isSubmitted: false,
    };
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    if (!_.isEqual(prevProps.errors, this.props.errors)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ errorMsg: this.props.errors });
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line react/prop-types
    this.props.dispatch(resetErrors());
  }

  registerUser = (event) => {
    event.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    const {
         first_name, last_name, email, password, cpassword,
        } = this.state;
    const fieldsToValidate = [
      { first_name },
      { last_name },
      { email },
      { password },
      { cpassword },
    ];
    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signup_error: 'Please enter all the fields',
        },
      });
    } else if (password !== cpassword) {
        this.setState({
          errorMsg: {
            signup_error: 'Password and confirm password does not match.',
          },
        });
      } else {
        this.setState({ isSubmitted: true });
        // eslint-disable-next-line react/destructuring-assignment
        this.props
        // eslint-disable-next-line react/prop-types
        .dispatch(registerNewUser({
        first_name, last_name, email, password,
        }))
        .then((response) => {
          if (response.success) {
            this.setState({
              successMsg: 'User registered succseefully',
              errorMsg: '',
            });
          }
        });
      }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { errorMsg, successMsg, isSubmitted } = this.state;
    return (
      <div className="login-page">
        <h2>Register Page</h2>
        <div className="login-form">
          <Form onSubmit={this.registerUser}>
            {errorMsg && errorMsg.signup_error ? (
              <p className="errorMsg centered-message">
                {errorMsg.signup_error}
              </p>
            ) : (
              isSubmitted && (
                <p className="successMsg centered-message">{successMsg}</p>
              )
            )}
            <Form.Group controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Enter first name"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Enter last name"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="cpassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                name="cpassword"
                placeholder="Enter confirm password"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <div className="action-items">
              <Button variant="primary" type="submit">
                Register
              </Button>
              <Link to="/" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(Register);
