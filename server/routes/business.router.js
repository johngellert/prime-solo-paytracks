const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {

    const getBusinessQuery = `SELECT * FROM "business" WHERE "business"."user_id"=$1;`;
    pool.query(getBusinessQuery, [req.query.id]).then((result) => {
        res.send(result.rows);
    }
    ).catch(error => {
        console.log('Error with SELECT business query:', error);
    })
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const business = req.body;
    const addBusinessQuery = `INSERT INTO "business" (
        "businessName",
        "service", 
        "employerIdentificationNumber", 
        "stateTaxId", 
        "streetAddress", 
        "city", 
        "state", 
        "zip",
        "mobilePhone", 
        "alternatePhone", 
        "email",
        "user_id"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7,  $8, $9, $10, $11, $12);`;
    pool.query(addBusinessQuery, [
        business.businessName,
        business.serviceType,
        business.employerIdentificationNumber,
        business.stateTaxId,
        business.streetAddress,
        business.city,
        business.state,
        business.zipCode,
        business.mobilePhone,
        business.alternatePhone,
        business.email,
        business.userId
    ]).then(() => {
        res.sendStatus(201); // respond with status 201 "Created"
    }).catch(error => {
        res.sendStatus(500);
        console.log('Error with INSERT business query:', error);
    });

});

module.exports = router;

