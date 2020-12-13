import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { validateFields } from '../utils/common';
import { initiateLogin } from '../actions/auth';
import { resetErrors } from '../actions/errors';

class Login extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
      email: '',
      password: '',
      errorMsg: '',
    };

    componentDidUpdate(prevprops) {
      // eslint-disable-next-line react/destructuring-assignment
      if (!_.isEqual(prevprops.errors, this.props.errors)) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ errorMsg: this.props.errors });
      }
    }

    componentWillUnmount() {
      // eslint-disable-next-line react/prop-types
      this.props.dispatch(resetErrors());
    }

  handliLogin = (event) => {
    // eslint-disable-next-line no-console
    event.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    const { email, password } = this.state;
    const fieldsToValidate = [{ email }, { password }];

    const allFieldsEntered = validateFields(fieldsToValidate);
    if (!allFieldsEntered) {
      this.setState({
        errorMsg: {
          signin_error: 'Please enter all the fields.',
        },
      });
    } else {
      // eslint-disable-next-line no-console
      console.log('Success');
      this.setState({
        errorMsg: {
          signin_error: '',
        },
      });
      // login successfull
      // eslint-disable-next-line react/prop-types
      this.props.dispatch(initiateLogin(email, password));
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
    const { errorMsg } = this.state;
    return (
      <div className="login-page">
        <h1>Banking Application</h1>
        <div className="login-form">
          <Form onSubmit={this.handliLogin}>
            {errorMsg && errorMsg.signin_error && (
              <p className="errorMsg centered-message">
                {errorMsg.signin_error}
              </p>
            )}
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
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
            <div className="action-items">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Link to="/register" className="btn btn-secondary">
                Create Account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(Login);
