//require mongoose middleware to access mongodb
const mongoose = require('mongoose');
//connect to database named: todo_list_db
mongoose.connect('mongodb://localhost/todo_list_db');
//create connection string
const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log('Successfully connected to database');
})