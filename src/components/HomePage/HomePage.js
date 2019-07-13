import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './HomePage.css';

// Material-UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import PaymentFrom from '../PaymentForm/PaymentForm';
import Dashboard from '../Dashboard/Dashboard';

// Styles
const styles = theme => ({
  // container: {
  //     display: 'flex',
  //     flexWrap: 'wrap',
  // },
  // textField: {
  //     marginLeft: theme.spacing.unit,
  //     marginRight: theme.spacing.unit,
  //     width: 200,
  // },
  // selectField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   marginBottom: theme.spacing.unit,
  //   width: 200,
  // },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  // dense: {
  //     marginTop: 19,
  // },
  // menu: {
  //     width: 200,
  // },
});

class HomePage extends Component {

  state = {
    // businessName: (this.props.singleBusiness.businessName && this.props.singleBusiness.businessName),
    businessName: '',
    labelWidth: 0,

  }

  // when components mounts, fetch all the business for the current user id
  componentDidMount() {
    // fetch businesses for the new user
    this.props.dispatch({ type: 'FETCH_BUSINESSES', payload: this.props.user.id });
    // this.props.dispatch({ type: 'FETCH_BUSINESSES', payload: this.props.user.id }, () => {this.setState({businessName: (this.props.singleBusiness.businessName && this.props.singleBusiness.businessName)})});
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  // when user selects a business from the drop down menu, set that business in singleBusiness reducer
  handleChangeInput = (event) => {
    // Payload is a single business object
    this.props.dispatch({ type: 'FETCH_SINGLE_BUSINESS', payload: event.target.value });
    this.setState({
      businessName: event.target.value.businessName,
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div id="home-page">
        <div id="welcome-container">
          <div id="welcome">
            <strong>Welcome, {this.props.user.username}! </strong>
          </div>
          {/* <LogOutButton className="log-in" /> */}
        </div >
        <div id="business-select-container">
          <div id="select-business">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-business-name"
              >Select Business</InputLabel>
              <Select
                value={this.state.businessName}
                onChange={this.handleChangeInput}
                autoWidth
                input={
                  <OutlinedInput
                    labelWidth={this.state.labelWidth}
                    name="business-name"
                    id="outlined-business-name"
                  />}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {this.props.business.length !== 0 &&
                  this.props.business.map(eachBusiness => {
                    return <MenuItem
                      key={eachBusiness.id}
                      value={eachBusiness}
                    >
                      {eachBusiness.businessName}
                    </MenuItem>
                  })}
              </Select>
            </FormControl>
            {/* ADD DELETE HERE */}
            <div id="business-title">
              <h2>{this.state.businessName}</h2>
            </div>
          </div>
        </div>
        <br />
        <Dashboard />
        <br />
        <div id="employees-container">
          <h2>Your Employees</h2>
          {this.props.employees.length !== 0 &&
            this.props.employees.map(eachEmployee => {
              if (eachEmployee.business_id === this.props.singleBusiness.id) {
                return <PaymentFrom key={eachEmployee.employee_id} eachEmployee={eachEmployee} />
              }
            })
          }
        </div>
        <pre>
          Local State{JSON.stringify(this.state, null, 2)}
        </pre>
        <pre>
          Redux State{JSON.stringify(this.props.state, null, 2)}
        </pre>
      </div>
    )
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({user});
const mapStateToProps = state => ({
  user: state.user,
  business: state.business.businessReducer,
  singleBusiness: state.business.singleBusiness,
  employees: state.employees.employeesReducer,
  state,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(HomePage));
