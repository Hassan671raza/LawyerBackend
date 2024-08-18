const express = require('express');
const { clientSignUp, clientLogin, getClientData } = require('../controllers/clients');
const router = express.Router();


router.post('/signup', clientSignUp);

router.post('/login', clientLogin);

router.post('/', getClientData);

module.exports = router;