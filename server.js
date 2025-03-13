const express = require('express');
const router = require('./routes');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());

const dbConfig = require('./dbConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
