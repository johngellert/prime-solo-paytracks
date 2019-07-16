import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

// Expansion panel 
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import classNames from 'classnames';


// From inputs
import CurrencyInput from 'react-currency-input';
import DatePickers from '../DatePickers/DatePickers';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

import paymentCalculator from '../NetPayCalculation/NetPayCalculation';

import './PaymentForm.css';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing(2)}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

class PaymentFrom extends Component {

    state = {
        selectedEmployee: {},
        grossWages: 0, // pass as parameter to stateWithholdingCalculation
        stateWithholding: 0, // set by return of stateWithholdingCalculation
        federalWithholding: 0, // need to build function in NetPayCalculation
        employeesSocialSecurityMedicare: 0,
        employersSocialSecurityMedicare: 0,
        netPay: 0,
        isCash: false,
        checkNumber: '',
        periodStart: '',
        periodEnd: '',
        paymentDate: '',
        currentDate: '',
    }

    componentWillMount() {
        this.getCurrentDate();
    }

    handleExpansion = (employee) => {
        this.setState({
            ...this.state,
            selectedEmployee: employee,
        })
    }

    // payment changes
    handleChangeGrossWages = (event) => {
        this.setState({
            ...this.state,
            grossWages: Number(event.target.value.replace(/[^0-9.-]+/g, "")),
        });
    }

    handleGrossWagesSubmit = () => {
        if (this.state.selectedEmployee.isTaxable) {
            this.setState({
                stateWithholding: paymentCalculator.stateWithholding(
                    this.state.grossWages,
                    this.state.selectedEmployee.payPeriodFrequency,
                    this.state.selectedEmployee.stateAllowances,
                    this.state.selectedEmployee.maritalStatus
                ), // end set stateWithholding
                employeesSocialSecurityMedicare: paymentCalculator.socialSecurityMedicare(
                    this.state.grossWages,
                ), // end set employeesSocialSecurityMedicare
                employersSocialSecurityMedicare: paymentCalculator.socialSecurityMedicare(
                    this.state.grossWages,
                ), // end set employersSocialSecurityMedicare
            },
                () => {
                    // calculate the employees net pay
                    return this.setState({
                        netPay: paymentCalculator.netPay(
                            this.state.grossWages,
                            this.state.stateWithholding,
                            this.state.federalWithholding,
                            this.state.employeesSocialSecurityMedicare,
                            this.state.selectedEmployee.employerPaysEmployeesFica,
                        )
                    });
                }
            );
        } else {
            this.setState({
                netPay: this.state.grossWages,
            })
        }
    }

    // switch between cash and check payment
    handleChangeSwitchCash = () => {
        this.setState({
            isCash: !this.state.isCash,
        });
    }

    handleChangeCheckNumberInput = (event) => {
        this.setState({
            checkNumber: event.target.value,
        });
    }

    handleClickPay = () => {
        console.log(this.state);
        // dispatch to payment saga
        this.props.dispatch({ type: 'POST_PAYMENT_RECORD', payload: this.state });
        this.handleClickCancel(); // clears state and input values
        Swal.fire({
            type: 'success',
            title: 'Payment Recorded!',
        });
    }

    handleClickCancel = () => {
        this.setState({
            ...this.state,
            grossWages: 0, // pass as parameter to stateWithholdingCalculation
            stateWithholding: 0, // set by return of stateWithholdingCalculation
            federalWithholding: 0, // need to build function in NetPayCalculation
            employeesSocialSecurityMedicare: 0,
            employersSocialSecurityMedicare: 0,
            netPay: 0,
            isCash: false,
            checkNumber: '',
            periodStart: '',
            periodEnd: '',
            paymentDate: '',
            currentDate: '',
        });
    }

    // set the current date
    getCurrentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        this.setState({
            ...this.state,
            currentDate: today,
        })
    }

    handleChangeDate = (property) => (event) => {
        this.setState({
            ...this.state,
            [property]: event.target.value,
        });
    }

    render() {
        const eachEmployee = this.props.eachEmployee;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <ExpansionPanel onChange={() => this.handleExpansion(eachEmployee)}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div className={classes.column}>
                            <Typography className={classes.heading}>{eachEmployee.firstName + " " + eachEmployee.lastName}</Typography>
                        </div>

                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>{eachEmployee.isTaxable && 'Taxable' || 'Non-Taxable'}</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <Divider />
                    <ExpansionPanelDetails className={classes.details}>
                        <div className={classes.column}>
                            <form
                                className="gross-wage-form"
                                onSubmit={this.handleGrossWagesSubmit}>
                                <label>
                                    Gross Wage
                                <br />
                                    {/* <input> */}
                                    <CurrencyInput
                                        id="required-field"
                                        thousandSeparator=","
                                        decimalSeparator="."
                                        precision="2"
                                        prefix="$"
                                        allowNegative={false}
                                        allowEmpty={false}
                                        value={this.state.grossWages}
                                        onChangeEvent={this.handleChangeGrossWages}
                                    />
                                    {/* </input>     */}
                                </label>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="secondary"
                                    onClick={this.handleGrossWagesSubmit}>
                                        Calculate Net
                                </Button>
                            </form>
                            <br />
                            <label>
                                Net Pay: {this.state.netPay > 0 ?
                                    '$' + this.state.netPay.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') :
                                    '$0.00'}
                            </label>
                            <br />
                            <label>
                                <Switch onChange={this.handleChangeSwitchCash} />
                                {this.state.isCash && 'Cash' || 'Check'}
                            </label>
                            <br />
                            <label>
                                <input
                                    disabled={this.state.isCash && true || false}
                                    className={this.state.isCash && "cash-payment" || "check-payment"}
                                    placeholder="Check #"
                                    value={this.state.checkNumber}
                                    onChange={this.handleChangeCheckNumberInput}
                                >
                                </input>
                            </label>
                            <br />
                            <label>
                                <br />
                                <div>
                                    <DatePickers defaultValue={this.state.periodStart} handleChangeDate={this.handleChangeDate('periodStart')} customLabel="Period Start" />
                                </div>
                                <br />
                                <div>
                                    <DatePickers defaultValue={this.state.periodEnd} handleChangeDate={this.handleChangeDate('periodEnd')} customLabel="Period End" />
                                </div>
                                <br />
                                <div>
                                    {/* <DatePickers getCurrentDate="2019-07-04" customLabel="Payment Date" /> */}
                                    <DatePickers defaultValue={this.state.currentDate} handleChangeDate={this.handleChangeDate('paymentDate')} customLabel="Payment Date" />

                                </div>
                                <br />
                            </label>
                        </div>
                        {/* <div className={classNames({classes.column, classes.helper})}> */}
                        <div white-space="pre" className={classes.helper}>
                            <h3>Withholding</h3>
                            <h4>State: ${this.state.stateWithholding !== 0 && this.state.stateWithholding.toFixed(2) || 0.00}</h4>
                            <h4>Federal: ${this.state.federalWithholding !== 0 && this.state.federalWithholding.toFixed(2) || 0.00 }</h4>
                            <h4>Employee FICA: ${this.state.employeesSocialSecurityMedicare !== 0 && this.state.employeesSocialSecurityMedicare.toFixed(2) || 0.00}</h4>
                            <h4>Employer FICA: ${this.state.employersSocialSecurityMedicare !== 0 && this.state.employersSocialSecurityMedicare.toFixed(2) || 0.00}</h4>
                        </div>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
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
                            onClick={this.handleClickPay}
                        >
                            Pay
                        </Button>
                    </ExpansionPanelActions>
                    {/* <pre>
                        Props {JSON.stringify(this.props, null, 2)}
                    </pre>
                    <pre>
                        Local State {JSON.stringify(this.state, null, 2)}
                    </pre> */}
                </ExpansionPanel>
            </div>


        )
    }
}

PaymentFrom.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect()(withStyles(styles)(PaymentFrom));
