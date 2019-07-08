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

class HomePage extends Component {

  state = {
    grossWages: 0,
    netPay: 0,
    isCash: false,
    checkNumber: null,
    // 7.65% (6.2% for social security tax and 1.45% for Medicare tax) 
}

  componentDidMount() {
    // fetch businesses for the new user
    this.props.dispatch({ type: 'FETCH_BUSINESSES', payload: this.props.user.id });
  }

  handleChangeInput = (event) => {

    // Payload is a single business object
    this.props.dispatch({ type: 'FETCH_SINGLE_BUSINESS', payload: event.target.value });
  }

  handleChangeSwitchCash = () => {
    this.setState({
      isCash: !this.state.isCash,
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
          {/* {this.props.employees.length !== 0 &&
            this.props.employees.map(eachEmployee => {
              return <div
                white-space="pre"
                key={eachEmployee.employee_id}
                value={eachEmployee.employee_id}
              >
                {eachEmployee.firstName}<></>{eachEmployee.lastName}
              </div>
            })} */}
          <h2>Your Employees</h2>
          {/* {this.props.employees.length !== 0 &&
            this.props.employees.map(eachEmployee => {
              if (eachEmployee.business_id === this.props.singleBusiness.id) {
                return <Card
                  className="each-employee"
                  key={eachEmployee.employee_id}
                  value={eachEmployee.employee_id}
                  >
                  <CardContent>
                    <Typography>
                      {eachEmployee.firstName}
                    </Typography>
                    <Typography>
                      {eachEmployee.lastName}
                    </Typography>
                  </CardContent>
                </Card>
              }
            })
          } */}
          {this.props.employees.length !== 0 &&
            this.props.employees.map(eachEmployee => {
              if (eachEmployee.business_id === this.props.singleBusiness.id) {
                return <ExpansionPanel
                  className="each-employee"
                  key={eachEmployee.employee_id}
                  value={eachEmployee.employee_id}
                >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <div className="each-employee-title">
                        <div>
                          {eachEmployee.firstName} {eachEmployee.lastName}
                        </div>
                      </div>
                    </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="each-employee-payment">
                          <div className="each-payment-input">
                            <label>
                              Gross Wage
                              <br />
                              <CurrencyInput
                                  thousandSeparator=","
                                  decimalSeparator="."
                                  precision="2"
                                  prefix="$"
                                  allowNegative={false}
                                  allowEmpty={false}
                                  // value={0}
                                  value={this.state.grossWages}
                                  onChangeEvent={this.handleChangeGrossWages} 
                              />
                            </label>
                            <br />
                            <label>
                              Net Pay: {this.state.netPay > 0 ?
                              '$' + this.state.netPay.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') :
                              '$0.00'} <button onClick={this.handleClickCalculateNetPay}>Calculate Net Pay</button>
                            </label>
                            <br />
                            <label>
                              {this.state.isCash && 'Cash' || 'Check'}
                              <Switch onChange={this.handleChangeSwitchCash} />
                            </label>
                            <br />
                            <label>
                                <input 
                                  disabled={this.state.isCash && true || false} 
                                  className={this.state.isCash && 'cash-payment' || 'check-payment'}
                                  placeholder="Check #"
                                >
                                </input>
                            </label>
                            <br />
                            <label>
                              <DatePickers />
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
          {JSON.stringify(this.props.state, null, 2)}
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
