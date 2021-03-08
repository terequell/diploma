const express = require('express');

const app = express();
app.use(express.json());

const registrationRouter = require('./routes/registration');

app.use('/register', registrationRouter);

app.listen(3005, () => console.log('Server is running on port 3005'));
