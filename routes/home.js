const express = require("express");
const router = express.Router();

// Define a route that returns JSON content
router.get("/", (req, res) => {
  const jsonResponse = {
    message: "Welcome to the home route!",
    description: "This route returns JSON content.",
  };
  res.json(jsonResponse);
});

module.exports = router;
