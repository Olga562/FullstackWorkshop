const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('MongoDb is connected'))
.catch(err => console.error('MongoDb connection error', err));

const musicRoutes = require('./routes/musicRoutes');
app.use('/api/music', musicRoutes);

//Implement Error Handling
app.use((err, req, res, next) =>{
    console.error('Error: ', err.stack);
    if(err.name === 'ValidationError') {
        return res.status(400).json({error: err.message});
    }

    if(err.name === 'CastError'){
        return res.status(400).json({error: 'Malformed ID'});
    }

    res.status(500).json({error: 'Internal server error'});
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
