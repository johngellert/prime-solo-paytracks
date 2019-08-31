import React, { Component } from 'react';
import { connect } from 'react-redux';
import './EmployeesPage.css';

// Material-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import Button from '@material-ui/core/Button';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import EmployeeInformation from '../EmployeeInformation/EmployeeInformation';
import AddEmployee from '../AddEmployee/AddEmployee';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
});


class EmployeesPage extends Component {
  
  state = {
    addEmployee: false,
  }

  handleClickAddEmployee = () => {
    console.log('new taco');
    // this.setState({
    //   addEmployee: true,
    // });
    this.props.history.push('/register/employee/')
  }

  handleSaveEmployee = () => {
    console.log('save taco');
  }

  render() {
    const { classes } = this.props;

    

    return (
      <div className="employees-page">
        <div id="employees-container">
          <h2>Your Employees</h2>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={this.handleClickAddEmployee}
          >
            Add Employee
          </Button>
          {/* <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.addEmployee}
          onClose={this.handleSaveEmployee}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <AddEmployee />
          </div>
            <AddEmployee />
        </Modal> */}

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
                        <h3>{eachEmployee.firstName} {eachEmployee.lastName}</h3>
                      </div>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="each-employee-details">
                    <div className="each-employee-button-container">
                      {/* <Edit className="employee-edit-icon" /><br />
                      <div>
                        <Button variant="contained" color="secondary">Edit</Button>
                      </div>
                      <br />
                      <div>
                        <Button variant="outlined" color="primary">Delete</Button>
                      </div>
                      <br /> */}
                      <EmployeeInformation eachEmployee={eachEmployee} />

                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              }
            })
          }
        </div>
        {/* <pre>
          {JSON.stringify(this.props.state, null, 2)}
        </pre> */}
      </div>
    )
  }
}

EmployeesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
export default connect(mapStateToProps)(withStyles(styles)(EmployeesPage));
