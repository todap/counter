// express-server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect( "mongodb+srv://todap:tanmay2406@cluster0.9dms043.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define counter schema and model
const counterSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
    myCount:{ type: Number, default: 0 }
},{ collection: 'counters' });
const Counter = mongoose.model('Counter', counterSchema);

// Routes
app.get('/api/counter', async (req, res) => {
    console.log("Reached GET method")
    try {
        
        const counter = await Counter.findOne();
        console.log(counter);
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/increment', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.count++;
        await counter.save();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/decrement', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.count--;
        await counter.save();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
app.post('/api/counter/MyIncrement', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.myCount++;
        await counter.save();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/MyDecrement', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
            counter = new Counter();
        }
        counter.myCount--;
        await counter.save();
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
