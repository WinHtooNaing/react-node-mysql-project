const express = require("express")
const mysql = require("mysql")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

app.get('/', (req,res) => {
    return res.json("From Backend side");
})
app.listen(8081, ()=> {
    console.log("listening");
})
const db = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "",
    database : "mydata",
})

app.post('/register', (req,res)=> {
    const sentEmail = req.body.Email;
    const sentUserName = req.body.UserName;
    const sentPassword = req.body.Password;

    const SQL = 'INSERT INTO users (email,name,password) VALUES(?,?,?) ';
    const Value = [sentEmail,sentUserName,sentPassword];

    db.query(SQL,Value ,(err,results) => {
        if(err){
            res.send(err);
        }else{
            console.log('User inserted successfully');
            res.send({message : 'User added'})
        }
    })
})

app.post('/login', (req,res)=> {
    
    const sentloginUserName = req.body.LoginUserName;
    const sentloginPassword = req.body.LoginPassword;

    const SQL = 'SELECT * FROM users WHERE name = ? && password = ? ';
    const Value = [sentloginUserName,sentloginPassword];


    db.query(SQL,Value,(err,results) => {
        if(err){
            res.send({error : err})
        }
        if(results.length > 0){
            res.send(results)
        }else {
            res.send({message : `Credentials Don't match!`})
        }
    })
   
})