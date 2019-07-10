const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const payment =  req.body;
    const postPaymentQuery = `INSERT INTO "payment" (
        "periodStart", 
        "periodEnd", 
        "paymentDate",
        "isCash",
        "checkNumber",
        "grossWages",
        "netPay", 
        "federalWithholding",
        "stateWithholding", 
        "employeesSocialSecurityMedicare", 
        "employersSocialSecurityMedicare",
        "employee_business_id"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

    pool.query(postPaymentQuery, [
        payment.periodStart,
        payment.periodEnd,
        payment.paymentDate,
        payment.isCash,
        payment.checkNumber,
        payment.grossWages,
        payment.netPay,
        payment.federalWithholding,
        payment.stateWithholding,
        payment.employeesSocialSecurityMedicare,
        payment.employersSocialSecurityMedicare,
        payment.selectedEmployee.employeeBusinessID
    ]).catch(error => {
        console.log('Error with INSERT payment:', error);
        res.sendStatus(500);
    })
    
});

module.exports = router;