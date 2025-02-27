const fs = require('fs');
const path = require('path');
const os = require('os');

// write file using fs module
fs.writeFileSync("./test.txt", "Hello, This is a nodejs tutorial video!");

// read file using fs module
const data = fs.readFileSync("./test.txt", "utf-8");
console.log("data: ", data);

// path module example:
const filePath = path.join(__dirname, "text.txt");
console.log("filePath: ", filePath);

// os module examples:
console.log("OS Platform:", os.platform());
console.log("Free Memory:", os.freemem());
console.log("Total Memory:", os.totalmem());
console.log("CPU Info:", os.cpus());