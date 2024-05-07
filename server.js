const express=require("express");

const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const mycontroller=require('./Controller/controller');

const app = express();
const http=require('http').Server(app)

let io = require('socket.io')(http);
io.on('connection', (socket) => {
console.log('a user connected');
socket.on('disconnect', () => {
console.log('user disconnected');
});
setInterval(()=>{
socket.emit('number', parseInt(Math.random()*10));
}, 1000);
});


app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://localhost:27017/hotelsystem')
const notesSchema={
    firstName:String,
    email:String,
    message:String

}
app.get('/SumofTwoNumbers/:Number1/:Number2', function(req,res,next){
    var Number1 = parseInt(req.params.firstNumber) 
    var Number2 = parseInt(req.params.secondNumber)
    var Sum = Number1 + Number2 || null
    if(Sum == null) {
      res.json({Sum: Sum, statusCode: 400}).status(400)
    }
    else { res.json({Sum: Sum, statusCode: 200}).status(200) } 
  })
app.use('/form',mycontroller);
const Note =mongoose.model("Note",notesSchema);
app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");
})
app.post("/",function(req,res){
    let newNote=new Note({
        fisrtName:req.body.firstName,
        email:req.body.email,
        message:req.body.message
    });
    newNote.save();
    res.redirect('/');
})
app.listen(5500,function(){
    console.log("server is running on 5500");
})