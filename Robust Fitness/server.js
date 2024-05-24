const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect('mongodb+srv://aishahussain13579:a9831122132@adainsta.tfexlrz.mongodb.net/robustfitness', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const port = 9898;

// Middleware to serve static files
app.use(express.static("public"));

// Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a schema for the contact form
const contactSchema = new mongoose.Schema({
    user: String,
    email: String,
    phone: String,
    msg: String
});

// Create a model based on the schema
const Contact = mongoose.model("Contact", contactSchema);

app.get('/', (req, res) => {
    res.sendFile("templates/index.html", { root: __dirname });
});

app.get('/price', (req, res) => {
    res.sendFile("templates/price.html", { root: __dirname });
});

app.get('/contact', (req, res) => {
    res.sendFile('templates/contact.html', { root: __dirname });
});

app.get('/purchase',(req,res)=>{
    res.sendFile("templates/purchase.html", { root: __dirname })
})

app.post('/sendmsg', async (req, res) => {
    const { user, email, phone, msg } = req.body;
    
    const newContact = new Contact({
        user: user,
        email: email,
        phone: phone,
        msg: msg
    });

    try {
        await newContact.save();
        res.status(200).send("Message received successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving message to database.");
    }
});


// Define a schema for the checkout form
const checkoutSchema = new mongoose.Schema({
    email: String,
    fullname: String,
    phonenumber: String,
    plan: String
});

// Create a model based on the schema
const Checkout = mongoose.model("Checkout", checkoutSchema);

app.post('/checkout', async (req, res) => {
    const { email, fullname, phonenumber, plan } = req.body;
    
    const newCheckout = new Checkout({
        email: email,
        fullname: fullname,
        phonenumber: phonenumber,
        plan: plan
    });

    try {
        await newCheckout.save();
        res.status(200).send("Checkout complete!");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving checkout information to database.");
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
