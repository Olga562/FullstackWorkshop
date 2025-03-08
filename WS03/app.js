const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;

//Logs the request method and URL
function logRequest(req, res, next){
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    next();
};

app.use(logRequest);

//Checks for the "X-Custom-Header" in the request
function checkCustomerHeader(req, res, next){
    if(!req.headers['x-custom-header']){
        return res.status(400).json({error: 'X-Custom-Header vaaditaan'});
    }
    next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//reads data from a text file and returns it to the browser
app.get('/list', (req, res) =>{
    fs.readFile(path.join(__dirname, 'public', 'text.txt'), 'utf-8', (err, data)=>{
        if(err){
            return res.status(500).send('Error reading file');
        }
        res.send(`<pre>${data}</pre>`);
    });
});

//reads JSON data from a file
app.get('/json', (req, res) =>{
    fs.readFile(path.join(__dirname, 'public', 'data.json'), 'utf-8', (err, data)=>{
        if(err){
            return res.status(500).send('Error reading file');
        }
        const jsonData = JSON.parse(data);
        let table = '<table border="1"><tr><th>ID</th><th>Name</th><th>Email</th></tr>';
        jsonData.forEach(item => {
            table += `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.email}</td></tr>`;
        });
        table += '</table>';
        res.send(table);
    });
});

//reads new user data from the request body and adds it to the JSON file.
app.post('/add', (req, res)=>{
    const newUser = req.body;

    fs.readFile(path.join(__dirname, 'public', 'data.json'), 'utf-8', (err, data)=>{
        if(err){
            return res.status(500).send('Error reading file');
        }
        let jsonData;
        try{
        jsonData = JSON.parse(data);
        } catch (e){
            return res.status(500).send('Error parsing JSON');
        }    
        jsonData.push(newUser);

        fs.writeFile(path.join(__dirname,'public', 'data.json'), JSON.stringify(jsonData, null, 2), (err)=>{
            if(err){
                return res.status(500).send('Error saving data');
            }
            res.json({message: 'User added succssesfully', user: newUser});
        });
    });
});


//Serving Static Files
app.use(express.static('public'));

//Creating Basic Routes
app.get('/', (req, res) =>{
    res.send('Hello World!');
});

app.get('/about', checkCustomerHeader, (req, res) =>{
    res.send('About Page');
});

app.get('/contact', (req, res) =>{
    res.send('Contact Page');
});

app.get('/services', (req, res) =>{
    res.send('Services Page');
});

app.get('*', (req, res) =>{
    res.status(404).send('Cant find the requested page');
});

//Handling POST Requests
app.post('/submit', (req, res) => {
    const requestData = req.body;
    console.log('Received data:', requestData);
    res.json({ message: 'Data received successfully', data: requestData });
});


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});



    
    