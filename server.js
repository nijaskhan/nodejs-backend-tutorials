const express = require('express');
const router = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
