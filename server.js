const express = require('express');
const router = require('./routes');
const app = express();
require('dotenv').config();

const dbConfig = require('./dbConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
