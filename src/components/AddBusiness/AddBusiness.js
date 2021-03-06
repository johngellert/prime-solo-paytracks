import React, { Component } from 'react';

import { connect } from 'react-redux';
import "./AddBusiness.css";

import Swal from 'sweetalert2';

// Function that checks for empty strings or null values
// Accepts an array of values
// Returns true if all fields are not empty
// Returns false if any fields are empty
import checkRequiredFields from '../CheckRequiredFields/CheckRequiredFields';

class AddBusiness extends Component {

    state = {
        businessName: null, // string, not null
        serviceType: null, // sting, not null
        employerIdentificationNumber: null, // string
        stateTaxId: null, // string
        streetAddress: null, // string
        city: null, // string
        state: null, // string
        zipCode:null, // string
        mobilePhone: null, // string 
        alternatePhone: null, // string
        email: null, // string not null
    }

    handleChangeInput = (propertyName) => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        })
    }

    handleClickCancel = () => {
        this.setState ({
            businessName: '',
            employerIdentificationNumber: '',
            stateTaxId: '',
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
            mobilePhone: '',
            alternatePhone: '',
            serviceType: '',
            email: '',
        })
        this.props.history.push('/home');
    }

    // clean code
    handleClickSave = () => {
        if (checkRequiredFields([this.state.businessName, this.state.serviceType, this.state.email])) {
            this.props.dispatch({type: 'POST_REGISTER_BUSINESS', payload: {...this.state, userId: this.props.user.id}});
            this.props.history.push('/home');
            Swal.fire({
                type: 'success',
                title: 'Business Added!',
            });
        }
        else {
            alert('Please complete all required fields OR select "Skip" to cancel adding a business!');
        }
    }

    render() {
        return (
            <div className="add-business-form">
                <form >
                    <h1>Register Your Business</h1>
                    <label  className="required-field">
                        Business Name
                    <input onChange={this.handleChangeInput('businessName')}></input>
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
                    <label className="required-field">
                        Service Type
                    <input onChange={this.handleChangeInput('serviceType')}></input>
                    </label>
                    <br />
                    <label className="required-field">
                        Email Address
                    <input onChange={this.handleChangeInput('email')}></input>
                    </label>
                    <br />
                    <button onClick={this.handleClickCancel}>Cancel</button>
                    <button onClick={this.handleClickSave}>Save</button>
                </form>
                {/* <pre>Local State{JSON.stringify(this.state, null, 2)}</pre>
                <pre>redux State{JSON.stringify(this.props.state, null, 2)}</pre> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    state
});

export default connect(mapStateToProps)(AddBusiness);
