const express = require('express')
const path = require('path')
const app = express()
const port = 4131

app.engine('pug', require('pug').__express)
app.set("views", "templates");
app.set("view engine", "pug")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/resources", express.static("/resources"))

app.get("/", async (req, res)=> {
    res.status(200).render("mainpage")
});

app.get("/testimonies", async (req, res)=> {
    res.status(200).render("testimonies")
});

app.get("/contact", async (req, res)=> {
    res.status(200).render("contactlog")
});

app.get("/main", async (req, res)=> {
    res.status(200).render("mainpage")
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

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

app.listen(port , () => {
    console.log(`App listening on port ${port}`)
})