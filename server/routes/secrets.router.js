const express = require('express');
const pool = require('../modules/pool');
// had to import this for step 1
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// implemented rejectUnauthenticated in the get route
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    // changed this query the current where the only the level of secrecy is returned that is
    // less than the the current user clearance level
    pool.query(`SELECT * FROM "secret" WHERE secrecy_level < $1;`, [req.user.clearance_level])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;