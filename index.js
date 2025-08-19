const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('School Management API is running');
});


app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
