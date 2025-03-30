const express = require('express');
const app = express();
const port = 3000;

// exercise 1 

// set the view engine to ejs
app.set('view engine', 'ejs');

//exercise 2
//define the route 
app.get('/', (req, res) =>{
    const message = 'Welcome to EJS page';
    //exercise 5(users list)
    const users = [       
        {name: 'Kati', age: 35},
        {name: 'Juuso', age: 43},
        {name: 'Lotta', age: 28}
    ];
    const isLoggedIn = true; // Boolean value to control content
    res.render('index', {message, users, isLoggedIn})
})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




