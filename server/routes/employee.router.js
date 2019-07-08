const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const getEmployeesQuery = `SELECT * FROM "employee" 
    JOIN "employee_business" ON "employee"."id"="employee_business"."employee_id"
    JOIN "business" ON "business"."id"="employee_business"."business_id"
    WHERE "user_id"=$1 AND "isDeleted"=$2
    ORDER BY "firstName";`;

    pool.query(getEmployeesQuery, [req.query.id, false]).then((result) => {
        res.send(result.rows);
    }).catch(error => {
        res.sendStatus(500); // Internal Server Error
        console.log(`Error with SELECT employee query:`, error);
    });
});

/**
 * POST route template
 */
router.post('/', async (req, res) => {
    console.log(req.body);
    const client = await pool.connect();
    try {
        const {
            firstName,
            lastName,
            streetAddress,
            city,
            state,
            zipCode,
            mobilePhone,
            alternatePhone,
            emailAddress,
            assignedBusiness,
            payPeriodFrequency,
            isTaxable,
            federalAllowances,
            stateAllowances,
            maritalStatus,
            employerPaysEmployeesFica
        } = req.body;

        const addEmployeeQuery = `INSERT INTO "employee" (
            "firstName",
            "lastName" 
            ) VALUES ($1, $2)
            RETURNING "employee"."id" AS "employee_id";`;

        const addEmployeeAddress = `INSERT INTO "address" (
            "streetAddress",
            "city",
            "state",
            "zipCode",
            "employee_id"
        ) VALUES ($1, $2, $3, $4, $5);`;

        const addEmployeeContactInfo = `INSERT INTO "contact_info" (
            "mobilePhone", 
            "alternatePhone", 
            "emailAddress", 
            "employee_id"
            ) VALUES ($1, $2, $3, $4);`;

        const employeeBusinessJoin = `INSERT INTO "employee_business" (
            "employee_id", 
            "business_id",
            "payPeriodFrequency", 
            "isTaxable"
            ) VALUES ($1, $2, $3, $4);`;

        const addEmployeeWithholding = `INSERT INTO "withholding" (
            "federalAllowances", 
            "stateAllowances", 
            "maritalStatus", 
            "employerPaysEmployeesFica", 
            "employee_id"
            ) VALUES ($1, $2, $3, $4, $5);`;    

        await client.query('BEGIN')


        const employeeInsertResults = await client.query(addEmployeeQuery, [
            firstName,
            lastName
        ]);
        const { employee_id } = employeeInsertResults.rows[0];

        await client.query(addEmployeeAddress, [
            streetAddress,
            city,
            state,
            zipCode,
            employee_id // the employee ID returning
        ]);

        await client.query(addEmployeeContactInfo, [
            mobilePhone,
            alternatePhone,
            emailAddress,
            employee_id // the employee ID returning
        ]);

        await client.query(employeeBusinessJoin, [
            employee_id, // the employee ID returning
            assignedBusiness, // business ID
            payPeriodFrequency, 
            isTaxable
        ]);

        if (isTaxable) {
            await client.query(addEmployeeWithholding, [
                federalAllowances,
                stateAllowances,
                maritalStatus,
                employerPaysEmployeesFica,
                employee_id // the employee ID returning
            ]);
        }

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error with INSERT employee query', error);
        res.sendStatus(500); // Internal Server Error
    } finally {
        client.release();
    }
});

module.exports = router;