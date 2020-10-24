const db = require('./db/database');
const express = require('express');
const inputCheck = require('./utils/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

//   db.all(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
//   });

// // GET a single candidate
// db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//       console.log(err);
//     }
//     console.log(row);
//   });

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
  });

// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
