const express = require('express');
const path = require('path');
const app = express();

// Serve static files from Angular dist directory
app.use(express.static(path.join(__dirname, 'dist/clink-web')));

// Handle Angular routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/clink-web/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});