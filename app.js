require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});