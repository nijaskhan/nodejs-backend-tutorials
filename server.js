/* built using nodejs only */
// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Hello from nodejs server!");
// });

// server.listen(3000, () => {
//     console.log("server running at http://localhost:3000");
// });


// HTTP methods:
/*
    1. GET
    2. POST
    3. PUT
    4. PATCH
    5. DELETE
*/
const express = require('express');
const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
    res.status(200).send("hello, express!");
});

app.get('/about-us', (req, res)=>{
    res.status(200).send("hello, Now you are on about us page")
});

app.get('/blogs', (req, res)=>{
    res.status(200).send("hello, Now you are on Blogs page")
});

app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
});
