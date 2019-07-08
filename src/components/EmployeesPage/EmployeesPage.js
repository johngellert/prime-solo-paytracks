import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EmployeesPage.css';

// Material-UI
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Edit from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles'

class EmployeesPage extends Component {


  render() {
    return (
      <div id="employees-page">
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
                        <ExpansionPanelDetails className="each-employee-details">
                          <div className="each-employee-button-container">
                            <Edit className="employee-edit-icon"/><br />
                            <div>
                              <Button variant="contained" color="secondary">Edit</Button>
                            </div>
                            <br />
                            <div>
                              <Button variant="outlined" color="primary">Delete</Button>
                            </div>
                            <br />
                            
                          </div>
                          <div>
                            Employee ID: {eachEmployee.employee_id}
                            <br />
                            Pay Period Frequency: {eachEmployee.payPeriodFrequency}
                            <br />
                            Taxable Employee: {eachEmployee.isTaxable && 'Yes' || 'No'}
                            <br />
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
          singleBusiness: state.business.singleBusiness,
          employees: state.employees.employeesReducer,
          state,
        });
        
// this allows us to use <App /> in index.js
          export default connect(mapStateToProps)(EmployeesPage);
