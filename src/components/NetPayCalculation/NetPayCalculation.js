





// need to store employees withholding information in redux state
// state allowances
// marital status
const stateWithholding = (grossWages, payPeriods, stateAllowances, maritalStatus) => {
    // STEP 1 - Determine gross wages (450)
    // STEP 2 - Determine the number of pay periods in the year, multiply step 1 by step 2
    // 360 if you pay by the day
    // 52 if you pay by the week (52 * 450 = $23,400)
    // 26 if you pay every two weeks
    // 24 if you pay twice a month
    // 12 if you  pay once a month
    // STEP 3 - Multiple employee's withholding allowances by $4,250
    // state allowances (1 * 4,250 = 4,250)
    // STEP 4 - subtract result in step 3 for the result in step 2
    // 23,400 - 4,250 = 19,150
    // STEP 5 - use chart to determine the value for step 5 (need marital status)
    // IF SINGLE (use result from step 4)
    // between 2400 and 28920, subtract 2,400, multiple by 5.35%
    // 19150 - 2400 = 16750
    // 16750 * 0.0535 = 896.125

    // IF MARRIED
    // STEP 6 - divide step 5 by the pay periods in step two
    // 896.125 / 52 = 17.2331730769
    let value = (grossWages * payPeriods - (stateAllowances * 4250));

    if (maritalStatus === 'Single') {
        if (value >= 2400 && value < 28920) {
            value -= 2400;
            value *= 0.0535;
            value /= payPeriods;

            return value;
        }
        else if (value >= 28920 && value < 89510) {
            value -= 28920;
            value *= 0.0705;
            value += 1418.82;
            value /= payPeriods;

            return value;
        }
        else if (value >= 89510 && value < 166290) {
            value -= 89510;
            value *= 0.0785;
            value += 5690.42;
            value /= payPeriods;

            return value;
        }
        else if (value >= 166290) {
            value -= 166290;
            value *= 0.0985;
            value += 11717.65;
            value /= payPeriods;

            return value;
        }

    }
    else if (maritalStatus === 'Married') {
        if (value >= 9050 && value < 47820) {
            value -= 9050;
            value *= 0.0535;
            value /= payPeriods;

            return value;
        }
        else if (value >= 47820 && value < 163070) {
            value -= 47820;
            value *= 0.0705;
            value += 2074.20;
            value /= payPeriods;

            return value;
        }
        else if (value >= 163070 && value < 282200) {
            value -= 163070;
            value *= 0.0785;
            value += 10199.33;
            value /= payPeriods;

            return value;
        }
        else if (value >= 282200) {
            value -= 282200;
            value *= 0.0985;
            value += 19551.04;
            value /= payPeriods;

            return value;
        }

    }

}

// total required social security due to federal is 15.3%
// The employee pays half (7.65% withheld from gross wages) and the employer pays
// the other half (7.65% additional to gross wages).
// The employer can opt to pay the employee portion, which would result in the employer
// paying 15.3% additional to the gross wages and nothing would be withheld form the employees net pay.
// From each portion of the 7.65%, 6.2% is for social security tax and 1.45% for Medicare tax.
const socialSecurityMedicare = (grossWages) => grossWages * 0.0765

const netPay = (grossWages, stateWithholding, federalWithholding, employeesSocialSecurityMedicare, employerPaysEmployeesFica) => {
    if (employerPaysEmployeesFica) {
        return ((grossWages - stateWithholding) - federalWithholding)
    } else {
        return (((grossWages - stateWithholding) - federalWithholding) - employeesSocialSecurityMedicare)
    }
    
}

export default { stateWithholding, socialSecurityMedicare, netPay }