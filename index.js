/* CHOKIDAR_USEPOLLING=true */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Schema = require('./Schema/todoSchema')

const app = express();

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Running on Server ${port}`)
})

app.use(express.json({ limit: '1mb' }));

mongoose.connect(process.env.connectionString)
    .then(() => {
        console.log('Mongoose Connected')
    })
    .catch(() => {
        console.log('Failed');
    })


app.get('/', (req, res) => {
    res.json({message: 'Welcome to Backend of ToDo'})
})

/* Add new ToDo */

app.post('/add', (req, res) => {
    const time = Date().toLocaleString()
    const AddNew = new Schema({
        userName: req.body.userName,
        title: req.body.title,
        field: req.body.field,
        createdAt: time,
        updatedAt: time,
        category: req.body.category
    })

    AddNew.save()
        .then((data) => {
            res.json({message: 'Successfully Saved...', data: data})
        })
        .catch(() => {
            res.json({message: 'Failed...'})
        })
})

/* Get All Todo */
app.get('/get-all', (req, res) => {
    Schema.find({})
        .then((data) => {
            res.json({message: 'Success', data: data})
        })
        .catch((err) => {
            res.json({message: 'Failed'})
        })
})

/* Get ToDo by Id */

app.post('/get-id', (req, res) => {
    Schema.findById(req.body.id)
        .then((data) => {
            res.json({message: 'Success', data: data})
        })
        .catch((err) => {
            res.json({message: 'Failed'})
        })
})

/* Update By Id */

app.post('/update-id', (req, res) => {
    const time = Date().toLocaleString();
    Schema.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        field: req.body.field,
        updatedAt: time,
        category: req.body.category
    })
    .then((data) => {
        res.json({message: 'Success', data: data})
    })
    .catch((err) => {
        res.json({message: 'Failed'})
    })
})