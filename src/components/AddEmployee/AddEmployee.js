import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';

import { connect } from 'react-redux';

import './AddEmployee.css'

class RegisterAddEmployee extends Component {

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
        federalAllowances: 0, // withholding table, not null
        stateAllowances: 0, // withholding table, not null
        maritalStatus: 'Single', // withholding table, not null (select with options)
        employerPaysEmployeesFica: false, // withholding table, not null
    }

    handleChangeInput = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    handleChangeSwitchTaxable = () => {
        // if condition is true, set the taxableEmployee to false and the employerPaysEmployeeFica to false
        // else, only set the taxableEmployee to the opposite value of its current value
        if (this.state.taxableEmployee) {
            this.setState({
                isTaxable: !this.state.taxableEmployee,
                employerPaysEmployeesFica: false,
            });
        } else {
            this.setState({
                isTaxable: !this.state.taxableEmployee,
            });
        }
    }

    handleChangeSwitchFica = () => {
        this.setState({
            employerPaysEmployeesFica: !this.state.employerPaysEmployeesFica,
        });
    }

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
            assignedBusiness: '', // select current business id from redux state, insert into the employee_business table
            payPeriodFrequency: '', // employee_business table, not null
            isTaxable: false, // employee_business table, not null
            federalAllowances: 0, // withholding table, not null
            stateAllowances: 0, // withholding table, not null
            maritalStatus: 'Single', // withholding table, not null (select with options)
            employerPaysEmployeesFica: false, // withholding table, not null
        })
        this.props.history.push('/home');
    }

    handleClickNext = () => {
        this.props.history.push('/home');
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
                    <input onChange={this.handleChangeInput('assignedBusiness')}></input>
                    </label>
                    <br />
                    <label className="required-field">
                        Pay Period Frequency
                        <Select onChange={this.handleChangeInput('payPeriodFrequency')}/>
                    </label>
                    <br />
                    <label className="required-field">
                        Is Taxable
                    <Switch onChange={this.handleChangeSwitchTaxable} />
                    </label>
                    {this.state.taxableEmployee &&
                        <>
                            <br />
                            <label className="required-field">
                                Federal Allowances
                        <input onChange={this.handleChangeInput('federalAllowances')}></input>
                            </label>
                            <br />
                            <label className="required-field">
                                State Allowances
                        <input onChange={this.handleChangeInput('stateAllowances')}></input>
                            </label>
                            <br />
                            <label className="required-field">
                                Marital Status
                        <input onChange={this.handleChangeInput('maritalStatus')}></input>
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
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(RegisterAddEmployee);
