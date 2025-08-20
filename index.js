const express = require('express');
const cors = require('cors');
const db = require('./db'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running!');
});



app.post('/addSchool', (req, res) => {
  const { name, address, latitude, longitude } = req.body;


  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

   
    db.query('SELECT * FROM schools WHERE id = ?', [result.insertId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.status(201).json({ message: 'School added successfully', school: rows[0] });
    });
  });
});


app.get('/listSchools', (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'You have to provide latitude and longitude' });
  }

  
  db.query('SELECT * FROM schools', (err, schools) => {
    if (err) return res.status(500).json({ error: err.message });

    const Lat = parseFloat(latitude);
    const Long = parseFloat(longitude);

    
    const schoolsWithDistance = schools.map(school => {
      const dLat = (school.latitude - Lat) * (Math.PI / 180);
      const dLng = (school.longitude - Long) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(Lat * (Math.PI / 180)) *
        Math.cos(school.latitude * (Math.PI / 180)) *
        Math.sin(dLng / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = 6371 * c; 
      return { ...school, distance: parseFloat(distance.toFixed(2)) };
    });

   
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
