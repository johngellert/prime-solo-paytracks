import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';

import { connect } from 'react-redux';

import './AddEmployee.css'

class RegisterAddEmployee extends Component {

    state = {
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        mobilePhone: '',
        alternatePhone: '',
        emailAddress: '',
        assignedBusiness: '',
        taxableEmployee: false,
        socialSecurity: '',
        dob: '',
        federalAllowances: 0,
        stateAllowances: 0,
        maritalStatus: 'Single',
        employerPaysEmployeesFica: false,
    }

    // componentDidUpdate() {
    //     this.setState({
    //         employerPaysEmployeesFica: this.state.taxableEmployee && this.state.employerPaysEmployeesFica || false,
    //     });
    // }

    handleChangeInput = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    // handleChangeSwitch = (propertyName) => () => {
    //     this.setState({
    //         [propertyName]: !this.state[propertyName],
    //         employerPaysEmployeesFica: this.state.taxableEmployee ? this.state.employerPaysEmployeesFica : false,
    //     });
    // }

    handleChangeSwitchTaxable = () => {
        
        // if condition is true, set the taxableEmployee to false and the employerPaysEmployeeFica to false
        // else, only set the taxableEmployee to the opposite value of its current value
        if (this.state.taxableEmployee) {
            this.setState({
                taxableEmployee: !this.state.taxableEmployee,
                employerPaysEmployeesFica: false,
            });
        } else {
            this.setState({
                taxableEmployee: !this.state.taxableEmployee,
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
            firstName: '',
            lastName: '',
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            mobilePhone: '',
            alternatePhone: '',
            emailAddress: '',
            assignedBusiness: '',
            taxableEmployee: false,
            socialSecurity: '',
            dob: '',
            federalAllowances: 0,
            stateAllowances: 0,
            maritalStatus: 'Single',
            employerPaysEmployeesFica: false,
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
                    <label>
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
                        Is Taxable
                    <Switch onChange={this.handleChangeSwitchTaxable} />
                    </label>
                    {this.state.taxableEmployee &&
                        <>
                            <br />
                            <label className="required-field">
                                Social Security
                        <input onChange={this.handleChangeInput('socialSecurity')}></input>
                            </label>
                            <br />
                            <label className="required-field">
                                Date of Birth
                        <input onChange={this.handleChangeInput('dob')}></input>
                            </label>
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
