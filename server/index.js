const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(authRouter);



app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});