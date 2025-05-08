const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const router = require('./routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// DB connection
db.connect()
  .then(client => { client.release(); console.log('📦 Database connected'); })
  .catch(err => console.error('DB Connection Error:', err));

// Routes
app.use('/api', router);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
module.exports = app;

if (process.env.NODE_ENV === 'test') {
    const server = app.listen(0); 
    
    app.close = async () => {
      return new Promise((resolve) => {
        server.close(() => {
          console.log('Test server closed');
          resolve();
        });
      });
    };
  }