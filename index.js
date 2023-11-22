const express = require('express');
const path = require('path');
const app = express();
const port = 4131

app.set("views", "templates");
app.set("view engine", "pug");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/resources", express.static("/resources"));

var contactsList = [{"id": 0, "name": "Brennan N", "email": "neuse021@umn.edu", "preferredMeetingDate": "2021-12-2", "money": "No Styling", "red": "No :("}]

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
    var entries = "";
    //entries = entries + "<tr id='contact-" + str(contactsList["id"][i]) + "'><td>" + contactsList["names"][i] + "</td><td>" + contactsList["emails"][i] + "</td><td class='times'>" + contactsList["preferredMeetingDates"][i] + "</td><td>" + contactsList["money"][i] + "</td><td>" + contactsList["red"][i] + "</td><td><button onclick='removeEntry(" + str(contactsList["id"][i]) + ")'>Delete</button></td></tr>"
    res.status(200).render("contactlog", {contactsList});
});


app.get("/css/main", async (req, res)=> {
    res.status(200).sendFile(path.join(__dirname, "resources/css/main.css"));
});

app.get("/css/main.dark", async (req, res)=> {
    res.status(200).sendFile(path.join(__dirname, "resources/css/main.dark.css"));
});

app.get("/images/main", async (req, res)=> {
    res.status(200).sendFile(path.join(__dirname, "resources/main.png"));
});

app.get("/images/main", async (req, res)=> {
    res.status(200).sendFile(path.join(__dirname, "resources/main.png"));
});

app.get("/js/main.js", async (req, res)=> {
    res.status(200).sendFile(path.join(__dirname, "resources/js/main.js"));
});

app.get("/js/contact.js", async (req, res)=> {
    res.status(200).sendFile(path.join(__dirname, "resources/js/contact.js"));
});

app.get("/js/table.js", async (req, res)=> {
    res.status(200).sendFile(path.join(__dirname, "resources/js/table.js"));
});

app.get("/js/confetti.js", async (req, res)=> {
    res.status(200).sendFile(path.join(__dirname, "resources/js/confetti.js"));
});

app.post("/contact", async (req, res)=>{
    console.log(req.body)
    res.status(201).render("contactsubmitted");
});

app.use((req, res, next) => {
    res.status(404).render("404");
});

app.listen(port , () => {
    console.log(`App listening on port ${port}`);
});