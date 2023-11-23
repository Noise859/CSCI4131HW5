const express = require('express');
const path = require('path');
const app = express();
const basicAuth = require('express-basic-auth');
const port = 4131;

app.set("views", "templates");
app.set("view engine", "pug");

app.use(express.json());

app.use("/resources", express.static("/resources"));
app.use(express.urlencoded({ extended: true }))

var contactsList = [{"id": 0, "name": "Brennan N", "email": "neuse021@umn.edu", "preferredMeetingDate": "2021-12-2", "money": "No Styling", "red": "No :("}, {"id": 1, "name": "Fake Name", "email": "test@test.com", "preferredMeetingDate": "2023-6-2", "money": "Full Access", "red": "Yes :)"}]
var saleMessage = "This is a starting test message";

app.use('/admin/contactlog', basicAuth({
    users: { 'admin': 'password' },
    challenge: true,
    unauthorizedResponse: 'Unauthorized',
    unauthorizedStatusCode: 403,
}));

app.post('/api/sale', basicAuth({
    users: { 'admin': 'password' },
    unauthorizedResponse: 'Unauthorized',
    challenge: true,
    unauthorizedStatusCode: 403,
}));

app.use('/api/contact', basicAuth({
    users: { 'admin': 'password' },
    unauthorizedResponse: 'Unauthorized',
    unauthorizedStatusCode: 403,
}));

app.use((req, res, next) => {
    const originalSend = res.send;

    res.send = function (body) {
        console.log(`${req.method} ${req.url} with status ${res.statusCode} \n  - contactsList.length=${contactsList.length} : saleMessage=\"${saleMessage}\"`);

        originalSend.call(this, body);
    };

    next();
});


app.get("/", async (req, res)=> {
    res.status(200).render("mainpage");
});

app.get("/testimonies", async (req, res)=> {
    res.status(200).render("testimonies");
});

app.get("/contact", async (req, res)=> {
    res.status(200).render("contactform");
});

app.get("/main", async (req, res)=> {
    res.status(200).render("mainpage");
});

app.get("/admin/contactlog", async (req, res)=> {
    res.status(200).render("contactlog", {contactsList});
});


app.get("/css/main", async (req, res)=> {
    res.status(200).type("text/css").sendFile(path.join(__dirname, "resources/css/main.css"));
});

app.get("/css/main.dark", async (req, res)=> {
    res.status(200).type("text/css").sendFile(path.join(__dirname, "resources/css/main.dark.css"));
});

app.get("/images/main", async (req, res)=> {
    res.status(200).type("image/png").sendFile(path.join(__dirname, "resources/images/main.png"));
});

app.get("/js/main.js", async (req, res)=> {
    res.status(200).type("text/javascript").sendFile(path.join(__dirname, "resources/js/main.js"));
});

app.get("/js/contact.js", async (req, res)=> {
    res.status(200).type("text/javascript").sendFile(path.join(__dirname, "resources/js/contact.js"));
});

app.get("/js/table.js", async (req, res)=> {
    res.status(200).type("text/javascript").sendFile(path.join(__dirname, "resources/js/table.js"));
});

app.get("/js/confetti.js", async (req, res)=> {
    res.status(200).type("text/javascript").sendFile(path.join(__dirname, "resources/js/confetti.js"));
});

app.get("/js/sale.js", async (req, res) => {
    res.status(200).type("text/javascript").sendFile(path.join(__dirname, "resources/js/sale.js"));
});

app.get("/api/sale", async (req, res) => {
    res.status(200).type('application/json').send(saleMessage);
});

app.post("/contact", async (req, res)=>{
    var contactAdded = false;
    if(req.body) {
        if(req.body.nname != ("" || undefined || null) && req.body.eemail.includes("@") && req.body.eemail != ("" || undefined || null) && req.body.ddate != ("" || undefined || null) & req.body.mmoney != ("" || undefined || null)){
            contactAdded = true;
            var rred = "No :(";
            if(req.body.ccheckbox == "on") {rred = "Yes :)"}
            contactsList.push({
                id: contactsList.length,
                name: req.body.nname,
                email: req.body.eemail,
                preferredMeetingDate: req.body.ddate,
                money: req.body.mmoney,
                red: rred
            });
            res.status(201).render("contactsubmitted");
        }
    }
    else {
        res.status(400).render("contacterror");
    }
    
    if(!contactAdded) {
        res.status(400).render("contacterror");
    }
});

app.post("/api/sale", async (req, res)=> {
    if(req.body.message != (null || undefined)){
        if(req.body.message == ""){
            res.status(400).type("text/plain").send("Message property empty");
        }
        else {
            saleMessage = req.body.message;
            res.status(200).type("text/plain").send(saleMessage);
        }   
    }
    else {
        res.status(400).type("text/plain").send("Message property invalid");
    }
});

app.delete("/api/contact", async (req, res) => {
    var contactFound = false;
    for(contact in contactsList) {
        if(contactsList[contact].id == req.body.id) {
            contactsList.splice(contact, 1)
            contactFound = true;
            res.status(200).send("ok");
            break 
        }
    }
    if(!contactFound) { res.status(404).type("text/plain").send("id not found");}
});

app.delete("/api/sale", async (req, res) => {
    saleMessage = "";
    res.status(200).type("text/plain").send("ok");
});

app.use((req, res, next) => {
    res.status(404).render("404");
});

app.listen(port , () => {
    console.log(`App listening on port ${port}`);
});