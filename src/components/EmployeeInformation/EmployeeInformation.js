
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

// Redux
import { connect } from 'react-redux';

// Function that checks for empty strings or null values
// Accepts an array of values
// Returns true if all fields are not empty
// Returns false if any fields are empty
import checkRequiredFields from '../CheckRequiredFields/CheckRequiredFields';

// Styles
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing(2),
        width: 200,
    },
    selectField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing(2),
        width: 200,
    },
    switch: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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

class EmployeeInformation extends Component {

    state = {
        employee: {
            employee_id: this.props.eachEmployee.employee_id,
            business_id: this.props.eachEmployee.business_id,
            firstName: this.props.eachEmployee.firstName, // employee table, not null
            lastName: this.props.eachEmployee.lastName, // employee table, not null
            streetAddress: this.props.eachEmployee.streetAddress, // address table
            city: this.props.eachEmployee.city, // address table
            state: this.props.eachEmployee.state, // address table
            zipCode: this.props.eachEmployee.zipCode, // address table
            mobilePhone: this.props.eachEmployee.mobilePhone, // contact table, not null
            alternatePhone: this.props.eachEmployee.alternatePhone, // contact table
            emailAddress: this.props.eachEmployee.emailAddress, // contact table, not null
            businessName: this.props.eachEmployee.businessName, // select current business id from redux state, insert into the employee_business table
            payPeriodFrequency: this.props.eachEmployee.payPeriodFrequency, // employee_business table, not null
            isTaxable: this.props.eachEmployee.isTaxable, // employee_business table, not null
            federalAllowances: this.props.eachEmployee.federalAllowances, // withholding table, not null
            stateAllowances: this.props.eachEmployee.stateAllowances, // withholding table, not null
            maritalStatus: this.props.eachEmployee.maritalStatus, // withholding table, not null (select with options)
            employerPaysEmployeesFica: this.props.eachEmployee.employerPaysEmployeesFica, // withholding table, not null

        },
        isEdit: false,
    }

    handleClickEdit = () => {
        this.setState({
            isEdit: true,
        })
    }
    handleChangeInput = (propertyName) => (event) => {
        this.setState({
            employee: {
                ...this.state.employee,
                [propertyName]: event.target.value,
            }
        });
    }

    handleChangeSwitchTaxable = () => {
        // if condition is true, set isTaxable to false and the employerPaysEmployeeFica to false
        // else, only set the isTaxable to the opposite value of its current value
        if (this.state.employee.isTaxable) {
            this.setState({
                employee: {
                    ...this.state.employee,
                    isTaxable: !this.state.employee.isTaxable,
                    employerPaysEmployeesFica: false,  // when isTaxable is toggled off, set back to original state
                    federalAllowances: 0, // when isTaxable is toggled off, set back to original state
                    stateAllowances: 0,  // when isTaxable is toggled off, set back to original state
                    maritalStatus: null,  // when isTaxable is toggled off, set back to original state
                }
            });
        } else {
            this.setState({
                employee: {
                    ...this.state.employee,
                    isTaxable: !this.state.employee.isTaxable,
                }
            });
        }
    }

    handleChangeSwitchFica = () => {
        this.setState({
            employee: {
                ...this.state.employee,
                employerPaysEmployeesFica: !this.state.employee.employerPaysEmployeesFica,
            }
        });
    }

    // skip adding employee and go to home
    handleClickCancel = () => {
        console.log('cancel changes');
        this.setState({
            employee: {
                employee_id: this.props.eachEmployee.employee_id,
                business_id: this.props.eachEmployee.business_id,
                firstName: this.props.eachEmployee.firstName, // employee table, not null
                lastName: this.props.eachEmployee.lastName, // employee table, not null
                streetAddress: this.props.eachEmployee.streetAddress, // address table
                city: this.props.eachEmployee.city, // address table
                state: this.props.eachEmployee.state, // address table
                zipCode: this.props.eachEmployee.zipCode, // address table
                mobilePhone: this.props.eachEmployee.mobilePhone, // contact table, not null
                alternatePhone: this.props.eachEmployee.alternatePhone, // contact table
                emailAddress: this.props.eachEmployee.emailAddress, // contact table, not null
                businessName: this.props.eachEmployee.businessName, // select current business id from redux state, insert into the employee_business table
                payPeriodFrequency: this.props.eachEmployee.payPeriodFrequency, // employee_business table, not null
                isTaxable: this.props.eachEmployee.isTaxable, // employee_business table, not null
                federalAllowances: this.props.eachEmployee.federalAllowances, // withholding table, not null
                stateAllowances: this.props.eachEmployee.stateAllowances, // withholding table, not null
                maritalStatus: this.props.eachEmployee.maritalStatus, // withholding table, not null (select with options)
                employerPaysEmployeesFica: this.props.eachEmployee.employerPaysEmployeesFica, // withholding table, not null
            },
            isEdit: false,
        });
        // this.props.history.push('/home');
    }

    handleClickSave = () => {
        // if (this.state.employee.isTaxable) {
        if (checkRequiredFields([
            this.state.employee.firstName,
            this.state.employee.lastName,
            this.state.employee.mobilePhone,
            this.state.employee.emailAddress,
            this.state.employee.assignedBusiness,
            this.state.employee.payPeriodFrequency,
            this.state.employee.federalAllowances,
            this.state.employee.stateAllowances,
            // this.state.employee.maritalStatus,
        ])) {
            // will send all fields to saga
            this.props.dispatch({ type: 'UPDATE_EMPLOYEE', payload: { ...this.state.employee, userId: this.props.user.id } });
            // this.props.history.push('/home');
            this.setState({ isEdit: false });

        } else {
            alert('Please complete all required fields OR select "Skip" to cancel adding an employee!');
        }
        // } else {
        //     // do not check withholding for required fields
        //     if (checkRequiredFields([
        //         this.state.employee.firstName,
        //         this.state.employee.lastName,
        //         this.state.employee.mobilePhone,
        //         this.state.employee.emailAddress,
        //         this.state.employee.assignedBusiness,
        //         this.state.employee.payPeriodFrequency,
        //     ])) {
        //         // will not send withholding information to saga
        //         this.props.dispatch({ type: 'UPDATE_EMPLOYEE', payload: { ...this.state.employee, userId: this.props.user.id } });
        //         // this.props.history.push('/home');
        //         this.setState({ isEdit: false });
        //     } else {
        //         alert('Please complete all required fields OR select "Skip" to cancel adding an employee!');
        //     }
        // }
    }

    // action.payload is the employee_business id
    handleClickDelete = (event) => {
        this.props.dispatch({type: `DELETE_EMPLOYEE`, payload: event});
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                {/* <form className="register-employee-form"> */}
                <form>
                    <div>
                        <Grid container spacing={6}>
                            <Grid item xs={6}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    onClick={this.handleClickEdit}
                                >
                                    Edit
                                </Button>
                            </Grid>
                            <Grid item xs ={6}>
                                <Button
                                    // value={this.props.eachEmployee.employeeBusinessID}
                                    variant="outlined"
                                    size="small"
                                    color="primary"
                                    onClick={() => {this.handleClickDelete(this.props.eachEmployee.employeeBusinessID)}}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <h3>Employee Name</h3>
                    <h4><em>Business / Service: {this.state.employee.businessName}</em></h4>
                    <br />
                    <TextField disabled={this.state.isEdit === false && true} required defaultValue={this.state.employee.firstName} className={classes.textField} label="First Name" onChange={this.handleChangeInput('firstName')}></TextField>
                    <TextField disabled={this.state.isEdit === false && true} required defaultValue={this.state.employee.lastName} className={classes.textField} label="Last Name" onChange={this.handleChangeInput('lastName')}></TextField>
                    <h3>Mailing Address</h3>
                    <TextField disabled={this.state.isEdit === false && true} defaultValue={this.state.employee.streetAddress} className={classes.textField} label="Street Address" onChange={this.handleChangeInput('streetAddress')}></TextField>
                    <TextField disabled={this.state.isEdit === false && true} defaultValue={this.state.employee.city} className={classes.textField} label="City" onChange={this.handleChangeInput('city')}></TextField>
                    <TextField disabled={this.state.isEdit === false && true} defaultValue={this.state.employee.state} className={classes.textField} label="State" onChange={this.handleChangeInput('state')}></TextField>
                    <TextField disabled={this.state.isEdit === false && true} defaultValue={this.state.zipCode} className={classes.textField} label="Zip Code" onChange={this.handleChangeInput('zipCode')}></TextField>
                    <h3>Contact Information</h3>
                    <TextField disabled={this.state.isEdit === false && true} required defaultValue={this.state.employee.mobilePhone} className={classes.textField} label="Mobile Phone" onChange={this.handleChangeInput('mobilePhone')}></TextField>
                    <TextField disabled={this.state.isEdit === false && true} defaultValue={this.state.employee.alternatePhone} className={classes.textField} label="Alternate Phone" onChange={this.handleChangeInput('alternatePhone')}></TextField>
                    <TextField disabled={this.state.isEdit === false && true} required defaultValue={this.state.employee.emailAddress} className={classes.textField} label="Email Address" onChange={this.handleChangeInput('emailAddress')}></TextField>
                    <br />
                    <h3>Employment Information</h3>
                    {/* <FormControl className={classes.selectField}>
                        <InputLabel required shrink htmlFor="business-service-label">
                            Business / Service
                        </InputLabel>
                        <Select
                            disabled={this.state.isEdit === false && true}
                            input={<Input name="business-service" id="business-service-label" />}
                            value={this.state.employee.assignedBusiness}
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
                    </FormControl > */}
                    <FormControl className={classes.selectField}>
                        <InputLabel required shrink htmlFor="pay-period-frequency-label">
                            Pay Period Frequency
                        </InputLabel>
                        <Select
                            disabled={this.state.isEdit === false && true}
                            input={<Input name="pay-period-frequency" id="pay-period-frequency-label" />}
                            value={this.state.employee.payPeriodFrequency}
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
                        {this.state.employee.isTaxable ?
                            <span>
                                <Switch
                                    disabled={this.state.isEdit === false && true}
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
                    {this.state.employee.isTaxable &&
                        <>
                            <h3>Employee Withholding Information</h3>
                            <TextField disabled={this.state.isEdit === false && true} required={this.state.employee.isTaxable} defaultValue={this.state.employee.federalAllowances} className={classes.textField} label="Federal Allowances" onChange={this.handleChangeInput('federalAllowances')}></TextField>
                            <TextField disabled={this.state.isEdit === false && true} required={this.state.employee.isTaxable} defaultValue={this.state.employee.stateAllowances} className={classes.textField} label="State Allowances" onChange={this.handleChangeInput('stateAllowances')}></TextField>
                            <FormControl className={classes.selectField}>
                                <InputLabel required shrink htmlFor="marital-status-label">
                                    Marital Status
                                </InputLabel>
                                <Select
                                    input={<Input name="marital-status" id="marital-status-label" />}
                                    disabled={this.state.isEdit === false && true}
                                    required={this.state.employee.isTaxable}
                                    value={this.state.employee.maritalStatus}
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
                                {this.state.employee.employerPaysEmployeesFica ?
                                    <span>
                                        <Switch
                                            checked
                                            disabled={this.state.isEdit === false && true}
                                            required={this.state.employee.isTaxable}
                                            onChange={this.handleChangeSwitchFica}
                                            input={<Input name="fica" id="fica-label" />}
                                        /> {'Yes'}
                                    </span>
                                    :
                                    <span>
                                        <Switch
                                            disabled={this.state.isEdit === false && true}
                                            required={this.state.employee.isTaxable}
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
        )
    }
}

EmployeeInformation.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    business: state.business.businessReducer,
});

export default connect(mapStateToProps)(withStyles(styles)(EmployeeInformation));
