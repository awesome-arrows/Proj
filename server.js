'use stirct';


//#region  Dependencies
const express = require('express');

require('dotenv').config();

const pg = require('pg');

const cors = require('cors');

const superagent = require('superagent');

const override = require('method-override');

//#endregion


//#region Variables Area


//#endregion


//#region  Setup
let app = express();

const PORT = process.env.PORT || 5555;

// const DATABASE_URL = process.env.DATABASE_URL;

// const user = new pg.Client(DATABASE_URL);

//#endregion


//#region Middlewares

// user.connect();

// user.on('error', error => console.error(error));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.use(override('_method'));

app.use(cors());

app.set('view engine', 'ejs');

//#endregion


//#region Routes

// home Page Route
// app.get('/', handle);

// //
// app.get('/', handle);

// //
// app.post('/', handle);

// //
// app.post('/', handle);

// //
// app.get('//:id', handle);

// // Update Route
// app.put('//:', handleUpdate);

// // Posting Update Route
// app.post('//:', handleUpdate);

// // delettion Route
// app.delete('//:', handleDelete);

// Route not found
app.get('*', handleError);

//#endregion


app.listen(PORT, ()=>{
    console.log(`the app is listening to => ${PORT}`);
});

//#region Constructors Area





//#endregion


//#region Functions/Handlers Area





//#endregion


//#region Error Handler

function handleError(error, res){
    res.render('pages/error',{status:404, message:`Sorry something went wrong => ${error}`});
}

//#endregion
