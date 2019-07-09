import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './HomePage.css';

// Material-UI
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CurrencyInput from 'react-currency-input';
import DatePickers from '../DatePickers/DatePickers';

import paymentCalculator from '../NetPayCalculation/NetPayCalculation';

class HomePage extends Component {

  state = {
    selectedEmployee: {},
    grossWages: 0, // pass as parameter to stateWithholdingCalculation
    stateWithholding: 0, // set by return of stateWithholdingCalculation
    federalWithholding: 0, // need to build function in NetPayCalculation
    employeesSocialSecurityMedicare: 0,
    employersSocialSecurityMedicare: 0,
    netPay: 0,
    isCash: false,
    checkNumber: null,
    periodStart: '',
    periodEnd: '',
    paymentDate: '',
    // 7.65% (6.2% for social security tax and 1.45% for Medicare tax) 
  }

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

  // switch between cash and check payment
  handleChangeSwitchCash = () => {
    this.setState({
      isCash: !this.state.isCash,
    });
  }

  // payment changes
  handleChangeGrossWages = (event) => {
    this.setState({
      ...this.state,
      grossWages: Number(event.target.value.replace(/[^0-9.-]+/g, "")),
    });
  }

  handleGrossWagesSubmit = () => {
    if (this.state.selectedEmployee.isTaxable) {
      this.setState({
        stateWithholding: paymentCalculator.stateWithholding(
          this.state.grossWages,
          this.state.selectedEmployee.payPeriodFrequency,
          this.state.selectedEmployee.stateAllowances,
          this.state.selectedEmployee.maritalStatus
        ), // end set stateWithholding
        employeesSocialSecurityMedicare: paymentCalculator.socialSecurityMedicare(
          this.state.grossWages,
        ), // end set employeesSocialSecurityMedicare
        employersSocialSecurityMedicare: paymentCalculator.socialSecurityMedicare(
          this.state.grossWages,
        ), // end set employersSocialSecurityMedicare
      }, 
        () => {
          // calculate the employees net pay
          return this.setState({
            netPay: paymentCalculator.netPay(
              this.state.grossWages,
              this.state.stateWithholding,
              this.state.federalWithholding,
              this.state.employeesSocialSecurityMedicare,
              this.state.selectedEmployee.employerPaysEmployeesFica,
            )
          });
        }
      );
    }
  }

  handleExpansion = (employee) => {
    this.setState({
      ...this.state,
      selectedEmployee: employee,

    })
  }

  render() {
    return (
      <div id="home-page">
        <div id="welcome-container">
          <div id="welcome">
            <strong>Welcome, {this.props.user.username}! </strong>
          </div>
          <div id="your-id">
            Your ID is: {this.props.user.id} <></>
          </div>
          {/* <LogOutButton className="log-in" /> */}
        </div >
        <div id="business-select-container">
          <div id="business-title">
            <h2>{this.props.singleBusiness.businessName && this.props.singleBusiness.businessName || `Add a business to get started!`}</h2>
          </div>
          <div id="select-business">
            {/* <form id="form-select-business"> */}
            {/* <FormControl> */}
            <InputLabel>Change Business</InputLabel>
            <Select
              // value={this.props.singleBusiness.businessName}
              value=""
              onChange={(this.handleChangeInput)}
              // onChange={() => handleChangeInput()}
              autoWidth
            >
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
            {/* </FormControl> */}
            {/* </form> */}
          </div>
        </div>
        <br />
        <br />
        <div id="employees-container">
          <h2>Your Employees</h2>
          {this.props.employees.length !== 0 &&
            this.props.employees.map(eachEmployee => {
              if (eachEmployee.business_id === this.props.singleBusiness.id) {
                return <ExpansionPanel
                  className="each-employee"
                  key={eachEmployee.employee_id}
                  value={eachEmployee.employee_id}
                  onChange={() => this.handleExpansion(eachEmployee)}
                // onChange={this.handleExpand}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className="each-employee-title">
                      <div>
                        <h3>{eachEmployee.firstName} {eachEmployee.lastName}</h3>
                      </div>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="each-employee-payment">
                    <div className="each-payment-input">
                      <form
                        className="gross-wage-form"
                        onSubmit={this.handleGrossWagesSubmit}>
                        <label>
                          Gross Wage
                                <br />
                          {/* <input> */}
                          <CurrencyInput
                            id="required-field"
                            thousandSeparator=","
                            decimalSeparator="."
                            precision="2"
                            prefix="$"
                            allowNegative={false}
                            allowEmpty={false}
                            value={this.state.grossWages}
                            onChangeEvent={this.handleChangeGrossWages}
                          />
                          {/* </input>     */}
                        </label>
                      </form>
                      <br />
                      <label>
                        Net Pay: {this.state.netPay > 0 ?
                          '$' + this.state.netPay.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') :
                          '$0.00'}
                      </label>
                      <br />
                      <label>
                        <Switch onChange={this.handleChangeSwitchCash} />
                        {this.state.isCash && 'Cash' || 'Check'}
                      </label>
                      <br />
                      <label>
                        <input
                          disabled={this.state.isCash && true || false}
                          className={this.state.isCash && "cash-payment" || "check-payment"}
                          placeholder="Check #"
                        >
                        </input>
                      </label>
                      <br />
                      <label>
                        <br />
                        <div>
                          <DatePickers customLabel="Period Start" />
                        </div>
                        <br />
                        <div>
                          <DatePickers customLabel="Period End" />
                        </div>
                        <br />
                        <div>
                          <DatePickers customLabel="Payment Date" />
                        </div>
                        <br />
                      </label>
                      <div className="each-employee-button-container">
                        <br />
                        <div>
                          <Button variant="contained" color="secondary">Pay</Button>
                        </div>
                        <br />
                        <div>
                          <Button variant="outlined" color="primary">Cancel</Button>
                        </div>
                        <br />
                      </div>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
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
