const express = require('express');

const app = express();
app.use(express.json());

const createUserRoute = require('./routes/createUser');

app.listen(3005, () => console.log('Server is running on port 3005'));
