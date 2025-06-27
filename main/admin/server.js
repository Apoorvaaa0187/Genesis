const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, 'main', 'user_site')));
app.use(express.static(path.join(__dirname, 'main', 'admin')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin123@cluster0.euozim4.mongodb.net/hospitalDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  console.log('📦 Using database:', mongoose.connection.name);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// MongoDB Schema
const PatientSchema = new mongoose.Schema({
  name: String,
  patientId: String,
  age: Number, // ✅ Add this
  csvFile: String,
  createdAt: {
    type: Date,
    default: Date.now // ✅ Timestamp when created
  }
});

// API Route
app.post('/api/patient', upload.single('csv'), async (req, res) => {
  const { name, patientId, age } = req.body;
  const csvFile = req.file ? req.file.path : null;

  console.log('➡️ Incoming form:', req.body);
  console.log('📄 File uploaded:', req.file);

  if (!name || !patientId || !csvFile || !age) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const newPatient = new Patient({ name, patientId, age, csvFile });
    await newPatient.save();
    console.log('✅ Saved:', newPatient);
    res.status(200).json({ message: 'Patient saved', patient: newPatient });
  } catch (err) {
    console.error('❌ Error saving:', err);
    res.status(500).json({ error: 'Database error', details: err });
  }
});

// Start Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'user_site', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

db.once('open', async () => {
  console.log('✅ MongoDB connected');

  // Confirm which DB you are connected to
  console.log('📦 Using database:', db.name);
});
