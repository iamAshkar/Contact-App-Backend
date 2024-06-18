const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/contact-app')

const Contact = mongoose.model('Contact',{
    id:String,
    name:String,
    address:String,
    email:String,
    phone:String,

})

module.exports={
    Contact
}