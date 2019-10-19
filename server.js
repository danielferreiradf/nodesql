const express = require("express");
const routes = require("./routes");

// Load .env file
require("dotenv").config();

// Database
require("./database/index");

const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
