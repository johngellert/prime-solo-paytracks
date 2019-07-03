import React, { Component } from 'react';

import { connect } from 'react-redux';

import './RegisterAddEmployee.css'

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

    handleChangeInput = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        })
    }

    handleClickCancel = () => {
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
    }

    render() {
        return (
            <div>
                <form className="register-form">
                    <h1>Add Employee</h1>
                    <label>
                        First Name
                    <input onChange={this.handleChangeInput('firstName')}></input>
                    </label>
                    <br />
                    <label>
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
                    <label>
                        Email Address
                    <input onChange={this.handleChangeInput('emailAddress')}></input>
                    </label>
                    <br />
                    <label>
                        Assign Business
                    <input onChange={this.handleChangeInput('assignedBusiness')}></input>
                    </label>
                    <br />
                    <label>
                        Is Taxable
                    <input onChange={this.handleChangeInput('taxableEmployee')}></input>
                    </label>
                    <br />
                    <label>
                        Social Security
                    <input onChange={this.handleChangeInput('socialSecurity')}></input>
                    </label>
                    <br />
                    <label>
                        Date of Birth
                    <input onChange={this.handleChangeInput('dob')}></input>
                    </label>
                    <br />
                    <label>
                        Federal Allowances
                    <input onChange={this.handleChangeInput('federalAllowances')}></input>
                    </label>
                    <br />
                    <label>
                        State Allowances
                    <input onChange={this.handleChangeInput('stateAllowances')}></input>
                    </label>
                    <br />
                    <label>
                        Marital Status
                    <input onChange={this.handleChangeInput('maritalStatus')}></input>
                    </label>
                    <br />
                    <label>
                        Employer Pays Employees Portion of FICA
                    <input onChange={this.handleChangeInput('employerPaysEmployeesFica')}></input>
                    </label>
                    <br />
                    <button onClick={this.handleClickCancel}>Cancel</button>
                    <button>Next</button>
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
