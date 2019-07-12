const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const getEmployeesQuery = `SELECT 
    "firstName",
    "lastName",
    "employee_business"."employee_id",
    "business_id",
    "business"."businessName",
    "employee_business"."id" AS "employeeBusinessID",
    "employee_business"."payPeriodFrequency",
    "isTaxable",
    "address"."streetAddress",
    "address"."city",
    "address"."state",
    "address"."zipCode",
    "contact_info"."mobilePhone",
    "contact_info"."alternatePhone",
    "emailAddress",
    "federalAllowances",
    "stateAllowances",
    "maritalStatus",
    "employerPaysEmployeesFica"
    FROM "employee" 
    JOIN "employee_business" ON "employee"."id"="employee_business"."employee_id"
    JOIN "business" ON "business"."id"="employee_business"."business_id"
    LEFT OUTER JOIN "address" ON "address"."employee_id"="employee_business"."employee_id"
    LEFT OUTER JOIN "contact_info" ON "contact_info"."employee_id"="employee_business"."employee_id"
    LEFT OUTER JOIN "withholding" ON "withholding"."employee_id"="employee_business"."employee_id"
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
router.post('/', rejectUnauthenticated, async (req, res) => {
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

/**
 * PUT route template
 */
router.put('/', rejectUnauthenticated, async (req, res) => {
    console.log(req.body);
    const client = await pool.connect();
    try {
        const {
            employee_id,
            business_id,
            firstName,
            lastName,
            streetAddress,
            city,
            state,
            zipCode,
            mobilePhone,
            alternatePhone,
            emailAddress,
            payPeriodFrequency,
            isTaxable,
            federalAllowances,
            stateAllowances,
            maritalStatus,
            employerPaysEmployeesFica
        } = req.body;

        const updateEmployeeQuery = `UPDATE "employee"
            SET "firstName"=$1, 
            "lastName"=$2
            WHERE "id"=$3;`;

        const updateEmployeeAddress = `UPDATE "address" 
            SET
            "streetAddress"=$1,
            "city"=$2,
            "state"=$3,
            "zipCode"=$4
            WHERE "employee_id"=$5;`;

        const updateEmployeeContactInfo = `UPDATE "contact_info" SET
            "mobilePhone"=$1, 
            "alternatePhone"=$2, 
            "emailAddress"=$3
            WHERE "employee_id"=$4;`;

        const updateEmployeeBusinessJoin = `UPDATE "employee_business" SET 
            "payPeriodFrequency"=$1, 
            "isTaxable"=$2
            WHERE "employee_id"=$3 AND "business_id"=$4;`;

        const updateEmployeeWithholding = `UPDATE "withholding" SET
            "federalAllowances"=$1, 
            "stateAllowances"=$2, 
            "maritalStatus"=$3, 
            "employerPaysEmployeesFica"=$4
            WHERE "employee_id"=$5;`;    

        await client.query('BEGIN');

        await client.query(updateEmployeeQuery, [
            firstName,
            lastName,
            employee_id
        ]);

        await client.query(updateEmployeeAddress, [
            streetAddress,
            city,
            state,
            zipCode,
            employee_id
        ]);

        await client.query(updateEmployeeContactInfo, [
            mobilePhone,
            alternatePhone,
            emailAddress,
            employee_id
        ]);

        await client.query(updateEmployeeBusinessJoin, [
            payPeriodFrequency, 
            isTaxable,
            employee_id,
            business_id,
        ]);

        await client.query(updateEmployeeWithholding, [
            federalAllowances,
            stateAllowances,
            maritalStatus,
            employerPaysEmployeesFica,
            employee_id
        ]);

        await client.query('COMMIT')
        res.sendStatus(200);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error with UPDATE employee query', error);
        res.sendStatus(500); // Internal Server Error
    } finally {
        client.release();
    }
});



module.exports = router;