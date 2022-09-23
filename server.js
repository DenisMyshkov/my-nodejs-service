const shell = require('shelljs');
const express = require('express');
const app = express();

let status = "open";

app.get('/run', (req, res) => {
  // res.send('Hello from App Engine!');
  if (status == "closed") {
    res.send('Tests are already in progress.');
  }
  else {
    status = "closed";
    shell.exec('cd ../webdriver-e2e-automation; ./script', () => {status = "open"});
    res.send('Tests are running. You can find the result at http://34.168.199.237/');
  };  
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});