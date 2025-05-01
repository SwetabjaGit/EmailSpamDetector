require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { exec } = require('child_process');
//const connectDatabase = require("./database");

// Importing Routes
const emailRoutes = require("./routes/emailRoute.js");

// Database connection
//connectDatabase();


exec('apt install python3-pandas python3-matplotlib python3-seaborn python3-scikit-learn', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Output: ${stdout}`);
});



// Middlewares
app.use(express.json());
app.use(express.raw({ type: 'text/plain' }));
app.use(cors());


// Routes
app.use("/api", emailRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, (error) => {
  if(!error) {
    console.log("Server running on port " + PORT);
  } else {
    console.log("Error: " + error);
  }
});