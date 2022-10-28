const mongoose = require('mongoose')

const ToDoSchema = new mongoose.Schema({
    userName: String,
    title: String,
    field: Boolean,
    createdAt: String,
    updatedAt: String,
    category: String
});

const Schema = mongoose.model('Data', ToDoSchema)

module.exports = Schema;