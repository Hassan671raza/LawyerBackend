const mongoose = require('mongoose');

const connectDB = async (uri)=>{
    return mongoose.connect(uri)
    .then(() => console.log('Database connected'))
    .catch(e => console.log(e));
}

module.exports = connectDB;