
// React
import React, { Component } from 'react';

// Material-UI
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// Redux
import { connect } from 'react-redux';

// Stylesheet
import './AddEmployee.css'

// Function that checks for empty strings or null values
// Accepts an array of values
// Returns true if all fields are not empty
// Returns false if any fields are empty
import checkRequiredFields from '../CheckRequiredFields/CheckRequiredFields';

class AddEmployee extends Component {

    state = {
        firstName: '', // employee table, not null
        lastName: '', // employee table, not null
        streetAddress: null, // address table
        city: null, // address table
        state: null, // address table
        zipCode: null, // address table
        mobilePhone: '', // contact table, not null
        alternatePhone: null, // contact table
        emailAddress: '', // contact table, not null
        assignedBusiness: '', // select current business id from redux state, insert into the employee_business table
        payPeriodFrequency: '', // employee_business table, not null
        isTaxable: false, // employee_business table, not null
        federalAllowances: '', // withholding table, not null
        stateAllowances: '', // withholding table, not null
        maritalStatus: '', // withholding table, not null (select with options)
        employerPaysEmployeesFica: false, // withholding table, not null
    }

    handleChangeInput = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleChangeSwitchTaxable = () => {
        // if condition is true, set isTaxable to false and the employerPaysEmployeeFica to false
        // else, only set the isTaxable to the opposite value of its current value
        if (this.state.isTaxable) {
            this.setState({
                isTaxable: !this.state.isTaxable,
                employerPaysEmployeesFica: false,  // when isTaxable is toggled off, set back to original state
                federalAllowances: '', // when isTaxable is toggled off, set back to original state
                stateAllowances: '',  // when isTaxable is toggled off, set back to original state
                maritalStatus: '',  // when isTaxable is toggled off, set back to original state
            });
        } else {
            this.setState({
                isTaxable: !this.state.isTaxable,
            });
        }
    }

    handleChangeSwitchFica = () => {
        this.setState({
            employerPaysEmployeesFica: !this.state.employerPaysEmployeesFica,
        });
    }

    // skip adding employee and go to home
    handleClickSkip = () => {
        this.setState({
            firstName: '', // employee table, not null
            lastName: '', // employee table, not null
            streetAddress: null, // address table
            city: null, // address table
            state: null, // address table
            zipCode: null, // address table
            mobilePhone: '', // contact table, not null
            alternatePhone: null, // contact table
            emailAddress: '', // contact table, not null
            assignedBusiness: '', // select current business id from redux state, insert into the employee_business table, not null
            payPeriodFrequency: '', // employee_business table, not null
            isTaxable: false, // employee_business table, not null
            federalAllowances: '', // withholding table, not null
            stateAllowances: '', // withholding table, not null
            maritalStatus: '', // withholding table, not null (select with options)
            employerPaysEmployeesFica: false, // withholding table, not null
        })
        this.props.history.push('/home');
    }

    handleClickNext = () => {
        if(this.state.isTaxable) {
            if (checkRequiredFields([
                this.state.firstName, 
                this.state.lastName, 
                this.state.mobilePhone,
                this.state.emailAddress,
                this.state.assignedBusiness,
                this.state.payPeriodFrequency,
                this.state.federalAllowances,
                this.state.stateAllowances,
                this.state.maritalStatus,
            ])) {
                // will send all fields to saga
                this.props.dispatch({type: 'POST_REGISTER_EMPLOYEE', payload: {...this.state, userId: this.props.user.id}});
                //this.props.history.push('/home');
            } else {
                alert('Please complete all required fields OR select "Skip" to cancel adding an employee!');
            }
        } else {
            // do not check withholding for required fields
            if (checkRequiredFields([
                this.state.firstName, 
                this.state.lastName, 
                this.state.mobilePhone,
                this.state.emailAddress,
                this.state.assignedBusiness,
                this.state.payPeriodFrequency,
            ])) {
                // will not send withholding information to saga
                this.props.dispatch({type: 'POST_REGISTER_EMPLOYEE', payload: {...this.state, userId: this.props.user.id}});
                //this.props.history.push('/home');
            } else {
                alert('Please complete all required fields OR select "Skip" to cancel adding an employee!');
            }
        }
    }

    render() {
        return (
            <div>
                <form className="register-employee-form">
                    <h1>Add Employee</h1>
                    <label className="required-field">
                        First Name
                    <input onChange={this.handleChangeInput('firstName')}></input>
                    </label>
                    <br />
                    <label className="required-field">
                        Last Name
                    <input onChange={this.handleChangeInput('lastName')}></input>
                    </label>
                    <br />
                    <label>
                        Street Address
                    <input onChange={this.handleChangeInput('streetAddress')}></input>
                    </label>
                    <br />
                    <label>
                        City
                    <input onChange={this.handleChangeInput('city')}></input>
                    </label>
                    <br />
                    <label>
                        State
                    <input onChange={this.handleChangeInput('state')}></input>
                    </label>
                    <br />
                    <label>
                        Zip Code
                    <input onChange={this.handleChangeInput('zipCode')}></input>
                    </label>
                    <br />
                    <label className="required-field">
                        Mobile Phone
                    <input onChange={this.handleChangeInput('mobilePhone')}></input>
                    </label>
                    <br />
                    <label>
                        Alternate Phone
                    <input onChange={this.handleChangeInput('alternatePhone')}></input>
                    </label>
                    <br />
                    <label className="required-field">
                        Email Address
                    <input onChange={this.handleChangeInput('emailAddress')}></input>
                    </label>
                    <br />
                    <label className="required-field">
                        Assign Business
                    <Select
                        value={this.state.assignedBusiness}
                        onChange={this.handleChangeInput('assignedBusiness')}
                    >
                        {this.props.business.length !== 0 &&
                            this.props.business.map(eachBusiness => {
                                return <MenuItem  
                                key={eachBusiness.id}
                                value={eachBusiness.id}
                                >
                                {eachBusiness.businessName}
                                </MenuItem>
                            })}
                    </Select>
                    </label>
                    <br />
                    <label className="required-field">
                        Pay Period Frequency
                        <Select
                            value={this.state.payPeriodFrequency}
                            onChange={this.handleChangeInput('payPeriodFrequency')}
                        >
                            <MenuItem value={360}>360 - Paid Daily</MenuItem>
                            <MenuItem value={52}>52 - Paid Weekly</MenuItem>
                            <MenuItem value={26}>26 - Paid Every Two Weeks</MenuItem>
                            <MenuItem value={24}>24 - Paid Twice a Month</MenuItem>
                            <MenuItem value={12}>12 - Paid Once a Month</MenuItem>
                        </Select>
                    </label>
                    <br />
                    <label className="required-field">
                        Is Taxable
                    <Switch onChange={this.handleChangeSwitchTaxable} color="secondary" />
                    </label>
                    {this.state.isTaxable &&
                        <>
                        <h2>Employee Withholding Information</h2>
                            <label className="required-field">
                                Federal Allowances
                        <input type="number" onChange={this.handleChangeInput('federalAllowances')}></input>
                            </label>
                            <br />
                            <label className="required-field">
                                State Allowances
                        <input type="number" onChange={this.handleChangeInput('stateAllowances')}></input>
                            </label>
                            <br />
                            <label className="required-field">
                                Marital Status
                                <Select
                                    value={this.state.maritalStatus}
                                    onChange={this.handleChangeInput('maritalStatus')}
                                >   
                                    <MenuItem value='Single'>Single</MenuItem>
                                    <MenuItem value='Married'>Married</MenuItem> 
                                </Select>
                            </label>
                            <br />
                            <label className="required-field">
                                Employer Pays Employees Portion of FICA
                        <Switch onChange={this.handleChangeSwitchFica} />
                            </label>
                        </>
                    }
                    <br />
                    <button onClick={this.handleClickSkip}>Skip</button>
                    <button onClick={this.handleClickNext}>Next</button>
                </form>
                <pre>Local State{JSON.stringify(this.state, null, 2)}</pre>
                <pre>Redux State{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    business: state.business.businessReducer,
});

export default connect(mapStateToProps)(AddEmployee);
