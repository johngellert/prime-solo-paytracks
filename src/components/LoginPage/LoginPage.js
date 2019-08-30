import React, { Component } from "react";
import { connect } from "react-redux";
import "./LoginPage.css";
import {
  TextField,
  withStyles,
  ListItemSecondaryAction
} from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Paper from '@material-ui/core/Paper';

import smallLogo from "./400dpiLogoCropped.png";

import Swal from "sweetalert2";

import Grid from "@material-ui/core/Grid";

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

class LoginPage extends Component {
  state = {
    username: "",
    password: ""
  };

  login = event => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password
        }
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      // <div id="login-main-container">
      <Grid
        container
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
        className="login-main-container"
      >
        {/* {this.props.errors.loginMessage && 
          Swal.fire({
                type: 'error',
                title: this.props.errors.loginMessage,
            }).then(this.forceUpdate())
        } */}

        {this.props.errors.loginMessage && (
          <h2 className="alert" role="alert">
            {this.props.errors.loginMessage}
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
            <img className={classes.logo} src={smallLogo} />
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
              fullWidth
            ></TextField>
          </Grid>

          <Grid item>
            <Button
              className={classes.button}
              onClick={this.login}
              type="submit"
              name="submit"
              value="Log In"
              color="secondary"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </Grid>

          <Grid item>
            <Button
              onClick={() => {
                this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
              }}
              className={classes.button}
              variant="outlined"
              fullWidth
            >
              Register
            </Button>
          </Grid>

          {/* <button
            type="button"
            className="link-button"
          >
            Forgot password
          </button> */}
        </Grid>
      </Grid>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
