const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const authRouter = require('./routes/auth');

app.use('/auth', authRouter);

app.listen(3005, () => console.log('Server is running on port 3005'));
