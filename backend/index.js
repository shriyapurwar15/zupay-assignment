const express = require('express')
require("dotenv").config(); 
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./utils/DB');
const userRoutes  = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes")


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json());
var allowlist = ['http://localhost:3000', 'http://localhost:5173', 'https://zupay-assignment-1.onrender.com']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(require('cors')(corsOptionsDelegate));
app.use(cors())

connectDB();

app.use('/api/V1/user',userRoutes);
app.use('/api/V1/posts',postRoutes);

app.listen(process.env.PORT,console.log(`Server Running on Port ${process.env.PORT}`))