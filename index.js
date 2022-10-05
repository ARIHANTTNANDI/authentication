const express = require("express");
const session = require("express-session");
const sprightly = require("sprightly");

const app = express();

app.engine('spy' , sprightly);
app.set('view engine' , 'spy');
app.set('views', './');

app.use(
    express.urlencoded({
      extended: true,
    })
);

app.use(
    express.json({
      type: ["application/json", "text/plain"],
    })
);

app.use(session({
    secret: "arihant_randi",
    resave: false,
    saveUninitialized: true
}))

app.get("/",(req,res)=>{
    if(req.session.isLoggedIn){
        return res.render('home.spy', { username : req.session.username })
    }
    return res.sendFile(__dirname + "/login.html");
})

app.post("/login",(req,res)=>{
    req.session.isLoggedIn = true;
    const username = req.body.username;
    req.session.username = username;
    return res.render('home.spy', { username })
})

app.post("/logout",(req,res)=>{
    req.session.destroy();
    return res.sendFile(__dirname + "/login.html" );
})

app.listen(3000, () => console.log(`This app is listening on port ${3000}`));