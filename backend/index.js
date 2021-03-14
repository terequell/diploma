const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const registrationRouter = require('./routes/registration');

app.use('/register', registrationRouter);

app.listen(3005, () => console.log('Server is running on port 3005'));
