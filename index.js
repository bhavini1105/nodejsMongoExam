const  express = require('express');

const db = require('./configs/database');
const bodyParser = require('body-parser');

const port = 8089;


const app = express();
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',require('./routers/index'));

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Start on");
        console.log("http://localhost:"+port);
        db();
    }
})