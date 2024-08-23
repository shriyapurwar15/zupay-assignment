const express = require('express')
require("dotenv").config(); 
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./utils/DB');
const userRoutes  = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes")


const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use('/api/V1/user',userRoutes);
app.use('/api/V1/posts',postRoutes);

app.listen(process.env.PORT,console.log(`Server Running on Port ${process.env.PORT}`))