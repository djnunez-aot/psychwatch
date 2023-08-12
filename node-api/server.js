const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Sample API Endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
