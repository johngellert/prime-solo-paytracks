import React, { Component } from "react";
import { connect } from "react-redux";
import "./RegisterPage.css";

import Grid from "@material-ui/core/Grid";

import PropTypes from "prop-types";

import {
  TextField,
  withStyles,
  Button
} from "@material-ui/core";

const styles = theme => ({
  textField: {
    // marginLeft: theme.spacing(6),
    // marginRight: theme.spacing(),
    // marginBottom: theme.spacing(2),
    // width: "fill"
  },
  button: {
    // marginLeft: theme.spacing(),
    // marginRight: theme.spacing(),
    // marginBottom: theme.spacing(2),
    // minWidth: 300
  },
  logo: {
    height: 80,
    marginTop: 10,
    marginBottom: 20
  }
});

class RegisterPage extends Component {
  state = {
    username: "",
    password: ""
  };

  registerUser = event => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "REGISTER",
        payload: {
          username: this.state.username,
          password: this.state.password
        }
      });
    } else {
      this.props.dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  }; // end registerUser

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid
        className="register-main-container"
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
      >
        {this.props.errors.registrationMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Grid
          className="login-form"
          container
          item
          spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
          xs={11} sm={6} md={4} lg={3} xl={3}
        >
          <Grid item>
            <h1>Register User</h1>
          </Grid>

          <Grid item>
            <TextField
              className={classes.textField}
              type="text"
              name="username"
              label="username"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleInputChangeFor("username")}
            ></TextField>
          </Grid>

          <Grid item>
            <TextField
              className={classes.textField}
              type="password"
              name="password"
              label="password"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
            ></TextField>
          </Grid>                    

          <Grid item>
            <Button
              onClick={this.registerUser}
              type="submit"
              name="submit"
              value="Register"
              color="secondary"
              variant="contained"
              fullWidth
            >
              Register
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                this.props.dispatch({ type: "SET_TO_LOGIN_MODE" });
              }}
              variant="outlined"
              fullWidth
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(withStyles(styles)(RegisterPage));
