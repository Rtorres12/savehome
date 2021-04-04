const express = require('express'),
 morgan = require('morgan'),
 path = require('path'),
myConnection = require('express-myconnection'),
 mysql = require('mysql'),
multer= require('multer');
 app = express();
 const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination : path.join(__dirname,'./public/prodImg'),

    filename: (req , file, cb )=>{


        cb(null, uuidv4()+ path.extname(file.originalname));
    }
});


//settings
app.set('port',4000);
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.set('views',path.join(__dirname, 'views'));

//middlewares
app.use(multer({
    storage,
    dest:path.join(__dirname,'public/prodImg')

}).array('prodImg',5));

app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host:   process.env.DATABASE_HOST,
    user: 'savehome',
    password: 'save2Home$',
    database: 'savehomebd',
    port: process.env.PORT
},'single')) ;
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index.js'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'),() =>{
console.log('server on port ',app.get('port'));
})
