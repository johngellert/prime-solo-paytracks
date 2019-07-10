import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './HomePage.css';

// Material-UI
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Paper from '@material-ui/core/Paper';

import PaymentFrom from '../PaymentForm/PaymentForm';
import Dashboard from '../Dashboard/Dashboard';

class HomePage extends Component {



  // when components mounts, fetch all the business for the current user id
  componentDidMount() {
    // fetch businesses for the new user
    this.props.dispatch({ type: 'FETCH_BUSINESSES', payload: this.props.user.id });
  }

  // when user selects a business from the drop down menu, set that business in singleBusiness reducer
  handleChangeInput = (event) => {
    // Payload is a single business object
    this.props.dispatch({ type: 'FETCH_SINGLE_BUSINESS', payload: event.target.value });
  }

  render() {
    return (
      <div id="home-page">
        <div id="welcome-container">
          <div id="welcome">
            <strong>Welcome, {this.props.user.username}! </strong>
          </div>
          {/* <LogOutButton className="log-in" /> */}
        </div >
        <div id="business-select-container">
          <div id="business-title">
            <h2>{this.props.singleBusiness.businessName && this.props.singleBusiness.businessName}</h2>
          </div>
          <div id="select-business">
            <InputLabel>Change Business
            <Select
              // value={this.props.singleBusiness.businessName}
              value=""
              onChange={(this.handleChangeInput)}
              // onChange={() => handleChangeInput()}
              autoWidth
            >
              {this.props.business.length !== 0 &&
                this.props.business.map(eachBusiness => {
                  return<MenuItem
                    key={eachBusiness.id}
                    value={eachBusiness}
                  >
                    {eachBusiness.businessName}
                  </MenuItem>
                })}
            </Select>
            </InputLabel>
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
                return <PaymentFrom key={eachEmployee.employee_id} eachEmployee={eachEmployee}/>
              }
            })
          }
        </div>
        {/* <pre>
          Local State{JSON.stringify(this.state, null, 2)}
        </pre>
        <pre>
          Redux State{JSON.stringify(this.props.state, null, 2)}
        </pre> */}
      </div>
    )
  }
}
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
export default connect(mapStateToProps)(HomePage);
