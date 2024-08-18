const express = require('express');
const jwt = require('jsonwebtoken');
const bookings = require('../models/bookings');
const lawyer = require('../models/lawyer');
const router = express.Router();
const secretKey = "umerFinalYearProject";


router.post('/get', async (req, res) => {
    console.log(req.body);
    
    
    let token = jwt.verify(req.body.token, secretKey);
    let role = req.body.role;
    let id = token.uId;
    
    let data = (role == 'l') ? await bookings.find({to: id}) : await bookings.find({from: id});
    res.status(200).json(data);
});


router.post('/', async (req, res) => {
    let data = req.body;
    // console.log(data);
    
    const token = jwt.verify(data.from, secretKey);
    const id = token.uId;
    const wa = await lawyer.findById(data.to);
    data = {...data, from: id, lawyerWhatsapp: wa.phone};

    const booking = await bookings.create(data);
    res.status(201).json({msg: "new Booking added"});
});

router.post('/controls', async (req, res) => {
    console.log(req.body);
    
    let id = req.body.id;
    let status = req.body.status;
    let q = await bookings.findByIdAndUpdate(id, {status});
    res.status(200).json("booking updated");
});

router.post('/delete', async (req, res) => {
    let id = req.body.id;
    let del = await bookings.findByIdAndDelete(id);
    res.json({msg: "Item Deleted"});
})

module.exports = router;

// mongodb+srv://umer:<password>@cluster0.9swdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0