const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@hobbyhub.puafbbd.mongodb.net/?retryWrites=true&w=majority&appName=HobbyHub`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    const groupCollection = client.db("hobbyhub").collection("groups");

    app.get('/groups', async (req, res) => {
        const cursor = groupCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    });

    app.get('/groups/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const group = await groupCollection.findOne(query);
        res.send(group);
    });

    app.post('/groups', async (req, res) => {
        const group = req.body;
        const result = await groupCollection.insertOne(group);
        res.send(result);
    });

    app.put('/groups/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedGroup = req.body;
        const options = { upsert: true };
        const updateDoc = {
            $set: updatedGroup,
        };
        const result = await groupCollection.updateOne(filter, updateDoc, options);
        res.send(result);
    });

    app.delete('/groups/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await groupCollection.deleteOne(query);
        res.send(result);
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});