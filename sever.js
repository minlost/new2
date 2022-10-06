const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
const uri = "mongodb+srv://minlost:mobilek12044@cluster0.f57hupy.mongodb.net/Cluster0?retryWrites=true&w=majority"

const app = express()
app.use(cors())
app.use(express.json())

// Default
app.get('/', (req, res) => {
    res.json('Hello to my app')
})

app.post('/senddata', async (req, res) => {
    const client = new MongoClient(uri)
    const data = req.body.data

    try {
        await client.connect()
        const database = client.db('restaurant')
        const customer = database.collection('customers')

        const datas = {
            date: data.date,
            time: data.time,
            number: data.number,
            tel: data.tel ,
            name: data.name
            
        }

        const insertedCustomer = await customer.insertOne(datas)
    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})

app.get('/getdata', async (req, res) => {
    const client = new MongoClient(uri)

    try {
        await client.connect()
        const db = client.db('restaurant')
        const coll = db.collection('customers')

        const cursor = await coll.find().toArray()
        cursor.forEach(console.log);
        res.send(cursor)
    } finally {
        await client.close(); 
    }
})




app.listen(PORT, () => console.log('server running on PORT ' + PORT))