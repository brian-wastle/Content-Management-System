//connect database to server to CLI
import express from 'express';
// Import and require mysql2

import mysql from 'mysql2';


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//set up queries

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'organization_db'
    },
    console.log(`Connected to the organization_db database.`)
  );




  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });