const path = require("path");
const fs = require("fs");

const sourcePath = path.join(__dirname, "../src/contracts/build/ToDoList.json");
const destinationPath = path.join(
  __dirname,
  "../src/contracts/ToDoList.min.json"
);
const rawdata = fs.readFileSync(sourcePath);
const input = JSON.parse(rawdata);
const {networks, abi} = input;

const output = JSON.stringify({networks, abi}, null, 2);
fs.writeFileSync(destinationPath, output);

console.log("Contract JSON was minified");
