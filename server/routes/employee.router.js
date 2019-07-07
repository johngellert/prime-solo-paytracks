const express = require('express');
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

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error with INSERT employee query', error);
        res.sendStatus(500); // Internal Server Error
    } finally {
        client.release();
    }

    // const employee = req.body;
    // const addEmployeeQuery = `INSERT INTO "employee" (
    //     "firstName",
    //     "lastName" 
    //     ) VALUES ($1, $2)
    //     RETURNING "employee"."id" AS "employee_id";`;
    // const addEmployeeAddress = `INSERT INTO "address" (
    //     "streetAddress",
    //     "city",
    //     "state",
    //     "zipCode",
    //     "employee_id"
    // ) VALUES ($1, $2, $3, $4, $5);`;
    // pool.query(addEmployeeQuery, [
    //     employee.firstName,
    //     employee.lastName
    // ]).then(result => {
    //     console.log("add employee address");
    //     pool.query(addEmployeeAddress, [
            // employee.streetAddress,
            // employee.city,
            // employee.state,
            // employee.zipCode,
            // result.rows[0].id // the employee ID returning from addEmployeeQuery
    //     ]).then(() => {
    //         res.sendStatus(201);// created
    //     }).catch(error => {
    //         res.sendStatus(500); // Internal Server Error
    //         console.log('Error with INSERT employee address query:', error);
    //     });
    // }
    // ).catch(error => {
    //     res.sendStatus(500);
    //     console.log('Error with INSERT employee query:', error);
    // });

    // ((result) => {
    //     console.log(result.rows)
    //     res.sendStatus(201); // respond with status 201 "Created"
    // }).catch(error => {
    //     res.sendStatus(500);
    //     console.log('Error with INSERT employee query:', error);
    // });
});

module.exports = router;