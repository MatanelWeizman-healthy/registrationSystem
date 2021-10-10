const express = require('express');
const router = express.Router();
const userRouter = require('./user/userRouter');

router.use('/api/user', userRouter);

module.exports = router;