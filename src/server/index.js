const express = require('express')
const cors = require('cors')
const client = require("mongodb").MongoClient;
const objId = require("mongodb").ObjectId;

const app = express();
app.use(express.json());
app.use(express.json());
app.use(cors());

client.connect('mongodb+srv://chetelise:123123123@cluster0.8swehnl.mongodb.net/?retryWrites=true&w=majority').then((database) => {
    dbInstance = database.db("location");
    locationInstance = dbInstance.collection('location');
    console.log("connected")
}).catch(err => {
    console.log('Not Connected')
})

// Mappable database of cities by gettting the data from the MongoDB
app.get('/', async (req, res) => {
    await locationInstance.find().toArray().then((result) => {
        res.send(result) //SENDING TO frontend
    }).catch((err) => {
        console.log(err)
    })
})

//Getting the list of places as an instance
app.get('/:km', async(req, res) => {
    const dis = req.params.km * 1000;
    
    const geo=req.body;
    await locationInstance.createIndex( { "loc" : "2dsphere" })
    
    await locationInstance.find({
            "loc": {
                $near: {
                    $geometry:geo,
                    $maxDistance: dis,
                }
            
            }
        }).toArray().then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err)
        })
})


//Inserting the locations manually
app.post('/add', (req, res) => {
    locationInstance.insertMany(req.body).then((response) => {
        console.log("inserted");
        res.status(200).json(response)
    })
})



app.listen(4000, () => {
    console.log('server is Running at 4000');
})