const express = require('express');
const router = express.Router();
const {
    respondsWithJson,
    respondsWithStatus
} = require('@ownhealthil/middleware');
const {
    userInputValidator,
} = require('./userValidation');
const authorize = require('../middlewares/authorize');
const {
    getAll,
    getByEmail,
    deleteByEmail,
    updateByEmail,
    register,
    authenticate,
} = require('./userController');


router.get('/', authorize(), respondsWithJson(getAll));
router.get('/:email', authorize(), respondsWithJson(getByEmail));
router.post('/authenticate', respondsWithJson(authenticate));
router.post('/', userInputValidator, respondsWithJson(register));
router.delete('/:email', authorize(), respondsWithStatus(deleteByEmail, 204, true));
router.put('/:email', authorize(), respondsWithStatus(updateByEmail, 204, true));


module.exports = router;