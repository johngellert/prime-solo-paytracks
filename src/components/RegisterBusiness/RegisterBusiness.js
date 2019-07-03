import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./RegisterBusiness.css";

class RegisterBusiness extends Component {

    state = {
        businessName: '',
        owner: '',
        employerIdentificationNumber: '',
        stateTaxId: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        mobilePhone: '',
        alternatePhone: '',
        serviceType: '',
    }

    handleChangeInput = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        })
    }

    handleClickCancel = () => {
        this.setState ({
            businessName: '',
            owner: '',
            employerIdentificationNumber: '',
            stateTaxId: '',
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            mobilePhone: '',
            alternatePhone: '',
            serviceType: '',
        })
        this.props.history.push('/home');
    }

    handleClickNext = () => {
        this.props.history.push('/register/new/employee');
    }

    render() {
        return (
            <div>
                <form className="register-business-form">
                    <h1>Register Your Business</h1>
                    <label>
                        Business Name
                    <input onChange={this.handleChangeInput('businessName')}></input>
                    </label>
                    <br />
                    <label>
                        Owner
                    <input onChange={this.handleChangeInput('owner')}></input>
                    </label>
                    <br />
                    <label>
                        Employer Identification Number (EID)
                    <input onChange={this.handleChangeInput('employerIdentificationNumber')}></input>
                    </label>
                    <br />
                    <label>
                        State Tax ID
                    <input onChange={this.handleChangeInput('stateTaxId')}></input>
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
                        Service Type
                    <input onChange={this.handleChangeInput('serviceType')}></input>
                    </label>
                    <br />
                    <button onClick={this.handleClickCancel}>Cancel</button>
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

export default connect(mapStateToProps)(RegisterBusiness);
