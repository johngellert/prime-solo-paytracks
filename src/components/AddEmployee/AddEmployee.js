
// React
import React, { Component } from 'react';

// Material-UI
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Swal from 'sweetalert2';

// Redux
import { connect } from 'react-redux';

// Stylesheet
import './AddEmployee.css'

// Function that checks for empty strings or null values
// Accepts an array of values
// Returns true if all fields are not empty
// Returns false if any fields are empty
import checkRequiredFields from '../CheckRequiredFields/CheckRequiredFields';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        marginBottom: theme.spacing(2),
        width: 200,
    },
    selectField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        marginBottom: theme.spacing(2),
        width: 200,
    },
    switch: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        marginBottom: theme.spacing(2),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

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
    handleClickCancel = () => {
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
        // this.props.history.push('/my/employees');
    }

    handleClickSave = () => {
        if (this.state.isTaxable) {
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
                this.props.dispatch({ type: 'POST_REGISTER_EMPLOYEE', payload: { ...this.state, userId: this.props.user.id } });
                this.props.history.push('/home');
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
                this.props.dispatch({ type: 'POST_REGISTER_EMPLOYEE', payload: { ...this.state, userId: this.props.user.id } });
                this.props.history.push('/home');
            } else {
                alert('Please complete all required fields OR select "Skip" to cancel adding an employee!');
            }
        }
 
        Swal.fire({
            type: 'success',
            title: 'Employee Added!',
        });
    }

    handleClickAddSampleEmployee = () => {
        this.setState({
            firstName: 'Kathy', // employee table, not null
            lastName: 'Peterson', // employee table, not null
            streetAddress: '9891 42nd St SE', // address table
            city: 'Minneapolis', // address table
            state: 'MN', // address table
            zipCode: '55403', // address table
            mobilePhone: '2182323326', // contact table, not null
            alternatePhone: null, // contact table
            emailAddress: 'kathy.peterson@gmail.com', // contact table, not null
            assignedBusiness: '', // select current business id from redux state, insert into the employee_business table
            payPeriodFrequency: 52, // employee_business table, not null
            isTaxable: false, // employee_business table, not null
            federalAllowances: '', // withholding table, not null
            stateAllowances: '', // withholding table, not null
            maritalStatus: '', // withholding table, not null (select with options)
            employerPaysEmployeesFica: false, // withholding table, not null
        });

        
    }

    render() {

        const { classes } = this.props;

        return (
            <div id="add-employee-form">
                {/* <form className="register-employee-form"> */}
                <form>
                    <h3 onClick={this.handleClickAddSampleEmployee}>Employee Name</h3>
                    {/* <h4><em>Business / Service: {this.state.employee.businessName}</em></h4> */}
                    <br />
                    <TextField required value={this.state.firstName} className={classes.textField} label="First Name" onChange={this.handleChangeInput('firstName')}></TextField>
                    <TextField required value={this.state.lastName} className={classes.textField} label="Last Name" onChange={this.handleChangeInput('lastName')}></TextField>
                    <h3>Mailing Address</h3>
                    <TextField value={this.state.streetAddress} className={classes.textField} label="Street Address" onChange={this.handleChangeInput('streetAddress')}></TextField>
                    <TextField value={this.state.city} className={classes.textField} label="City" onChange={this.handleChangeInput('city')}></TextField>
                    <TextField value={this.state.state} className={classes.textField} label="State" onChange={this.handleChangeInput('state')}></TextField>
                    <TextField value={this.state.zipCode} className={classes.textField} label="Zip Code" onChange={this.handleChangeInput('zipCode')}></TextField>
                    <h3>Contact Information</h3>
                    <TextField required value={this.state.mobilePhone} className={classes.textField} label="Mobile Phone" onChange={this.handleChangeInput('mobilePhone')}></TextField>
                    <TextField value={this.state.alternatePhone} className={classes.textField} label="Alternate Phone" onChange={this.handleChangeInput('alternatePhone')}></TextField>
                    <TextField required value={this.state.emailAddress} className={classes.textField} label="Email Address" onChange={this.handleChangeInput('emailAddress')}></TextField>
                    <br />
                    <h3>Employment Information</h3>
                    <FormControl className={classes.selectField}>
                        <InputLabel required shrink htmlFor="business-service-label">
                            Business / Service
                        </InputLabel>
                        <Select
                            required
                            input={<Input name="business-service" id="business-service-label" />}
                            value={this.state.assignedBusiness}
                            onChange={this.handleChangeInput('assignedBusiness')}
                            name={"business-service"}
                        >
                            {this.props.business.length !== 0 &&
                                this.props.business.map(eachBusiness => {
                                    return <MenuItem
                                        key={eachBusiness.id}
                                        value={eachBusiness.id}
                                        className={classes.menu}
                                    >
                                        {eachBusiness.businessName}
                                    </MenuItem>
                                })}
                        </Select>
                    </FormControl >
                    <FormControl className={classes.selectField}>
                        <InputLabel required shrink htmlFor="pay-period-frequency-label">
                            Pay Period Frequency
                        </InputLabel>
                        <Select
                            disabled={this.state.isEdit === false && true}
                            input={<Input name="pay-period-frequency" id="pay-period-frequency-label" />}
                            value={this.state.payPeriodFrequency}
                            onChange={this.handleChangeInput('payPeriodFrequency')}
                            name="pay-period-frequency"
                        >
                            <MenuItem value={360} className={classes.menu}>360 - Paid Daily</MenuItem>
                            <MenuItem value={52} className={classes.menu}>52 - Paid Weekly</MenuItem>
                            <MenuItem value={26} className={classes.menu}>26 - Paid Every Two Weeks</MenuItem>
                            <MenuItem value={24} className={classes.menu}>24 - Paid Twice a Month</MenuItem>
                            <MenuItem value={12} className={classes.menu}>12 - Paid Once a Month</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl className={classes.switch} >
                        <InputLabel required shrink htmlFor="is-taxable-label">
                            Is Taxable?
                        </InputLabel>
                        <br />
                        {this.state.isTaxable ?
                            <span>
                                <Switch
                                    onChange={this.handleChangeSwitchTaxable}
                                    color="secondary"
                                    input={<Input name="is-taxable" id="is-taxable-label" />}
                                    checked
                                /> {'Yes'}
                            </span>
                            :
                            <span>
                                <Switch
                                    disabled={this.state.isEdit === false && true}
                                    onChange={this.handleChangeSwitchTaxable}
                                    color="secondary"
                                    input={<Input name="is-taxable" id="is-taxable-label" />}
                                />{'No'}
                            </span>
                        }
                    </FormControl>
                    <br />
                    <br />
                    {this.state.isTaxable &&
                        <>
                            <h3>Employee Withholding Information</h3>
                            <TextField required={this.state.isTaxable} defaultValue={this.state.federalAllowances} className={classes.textField} label="Federal Allowances" onChange={this.handleChangeInput('federalAllowances')}></TextField>
                            <TextField required={this.state.isTaxable} defaultValue={this.state.stateAllowances} className={classes.textField} label="State Allowances" onChange={this.handleChangeInput('stateAllowances')}></TextField>
                            <FormControl className={classes.selectField}>
                                <InputLabel required shrink htmlFor="marital-status-label">
                                    Marital Status
                                </InputLabel>
                                <Select
                                    input={<Input name="marital-status" id="marital-status-label" />}
                                    disabled={this.state.isEdit === false && true}
                                    required={this.state.isTaxable}
                                    value={''}
                                    onChange={this.handleChangeInput('maritalStatus')}
                                >
                                    <MenuItem value='Single'>Single</MenuItem>
                                    <MenuItem value='Married'>Married</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.switch}>
                                <InputLabel required shrink htmlFor="fica-label">
                                    Employer Pays Employees Portion of FICA?
                                </InputLabel>
                                <br />
                                {this.state.employerPaysEmployeesFica ?
                                    <span>
                                        <Switch
                                            checked
                                            disabled={this.state.isEdit === false && true}
                                            required={this.state.isTaxable}
                                            onChange={this.handleChangeSwitchFica}
                                            input={<Input name="fica" id="fica-label" />}
                                        /> {'Yes'}
                                    </span>
                                    :
                                    <span>
                                        <Switch
                                            disabled={this.state.isEdit === false && true}
                                            required={this.state.isTaxable}
                                            onChange={this.handleChangeSwitchFica}
                                            input={<Input name="fica" id="fica-label" />}
                                        /> {'No'}
                                    </span>
                                }
                            </FormControl>
                        </>
                    }
                    <br />
                    <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={this.handleClickCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={this.handleClickSave}
                    >
                        Save
                    </Button>
                </form>
                <pre>Local State{JSON.stringify(this.state, null, 2)}</pre>
                <pre>Redux State{JSON.stringify(this.props, null, 2)}</pre>
            </div>

            // <div id="add-employee-form">
            //     <form className="register-employee-form">
            //         <h1>Add Employee</h1>
            //         <label className="required-field">
            //             First Name
            //         <input onChange={this.handleChangeInput('firstName')}></input>
            //         </label>
            //         <br />
            //         <label className="required-field">
            //             Last Name
            //         <input onChange={this.handleChangeInput('lastName')}></input>
            //         </label>
            //         <br />
            //         <label>
            //             Street Address
            //         <input onChange={this.handleChangeInput('streetAddress')}></input>
            //         </label>
            //         <br />
            //         <label>
            //             City
            //         <input onChange={this.handleChangeInput('city')}></input>
            //         </label>
            //         <br />
            //         <label>
            //             State
            //         <input onChange={this.handleChangeInput('state')}></input>
            //         </label>
            //         <br />
            //         <label>
            //             Zip Code
            //         <input onChange={this.handleChangeInput('zipCode')}></input>
            //         </label>
            //         <br />
            //         <label className="required-field">
            //             Mobile Phone
            //         <input onChange={this.handleChangeInput('mobilePhone')}></input>
            //         </label>
            //         <br />
            //         <label>
            //             Alternate Phone
            //         <input onChange={this.handleChangeInput('alternatePhone')}></input>
            //         </label>
            //         <br />
            //         <label className="required-field">
            //             Email Address
            //         <input onChange={this.handleChangeInput('emailAddress')}></input>
            //         </label>
            //         <br />
            //         <label className="required-field">
            //             Assign Business
            //         <Select
            //             value={this.state.assignedBusiness}
            //             onChange={this.handleChangeInput('assignedBusiness')}
            //         >
            //             {this.props.business.length !== 0 &&
            //                 this.props.business.map(eachBusiness => {
            //                     return <MenuItem  
            //                     key={eachBusiness.id}
            //                     value={eachBusiness.id}
            //                     >
            //                     {eachBusiness.businessName}
            //                     </MenuItem>
            //                 })}
            //         </Select>
            //         </label>
            //         <br />
            //         <label className="required-field">
            //             Pay Period Frequency
            //             <Select
            //                 value={this.state.payPeriodFrequency}
            //                 onChange={this.handleChangeInput('payPeriodFrequency')}
            //             >
            //                 <MenuItem value={360}>360 - Paid Daily</MenuItem>
            //                 <MenuItem value={52}>52 - Paid Weekly</MenuItem>
            //                 <MenuItem value={26}>26 - Paid Every Two Weeks</MenuItem>
            //                 <MenuItem value={24}>24 - Paid Twice a Month</MenuItem>
            //                 <MenuItem value={12}>12 - Paid Once a Month</MenuItem>
            //             </Select>
            //         </label>
            //         <br />
            //         <label className="required-field">
            //             Is Taxable
            //         <Switch onChange={this.handleChangeSwitchTaxable} color="secondary" />
            //         </label>
            //         {this.state.isTaxable &&
            //             <>
            //             <h2>Employee Withholding Information</h2>
            //                 <label className="required-field">
            //                     Federal Allowances
            //             <input type="number" onChange={this.handleChangeInput('federalAllowances')}></input>
            //                 </label>
            //                 <br />
            //                 <label className="required-field">
            //                     State Allowances
            //             <input type="number" onChange={this.handleChangeInput('stateAllowances')}></input>
            //                 </label>
            //                 <br />
            //                 <label className="required-field">
            //                     Marital Status
            //                     <Select
            //                         value={this.state.maritalStatus}
            //                         onChange={this.handleChangeInput('maritalStatus')}
            //                     >   
            //                         <MenuItem value='Single'>Single</MenuItem>
            //                         <MenuItem value='Married'>Married</MenuItem> 
            //                     </Select>
            //                 </label>
            //                 <br />
            //                 <label className="required-field">
            //                     Employer Pays Employees Portion of FICA
            //                     <Switch onChange={this.handleChangeSwitchFica} />
            //                 </label>
            //             </>
            //         }
            //         <br />
            //         <button onClick={this.handleClickSkip}>Skip</button>
            //         <button onClick={this.handleClickNext}>Next</button>
            //     </form>
            //     {/* <pre>Local State{JSON.stringify(this.state, null, 2)}</pre>
            //     <pre>Redux State{JSON.stringify(this.props, null, 2)}</pre> */}
            // </div>
        )
    }
}

AddEmployee.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    business: state.business.businessReducer,
});

export default connect(mapStateToProps)(withStyles(styles)(AddEmployee));
