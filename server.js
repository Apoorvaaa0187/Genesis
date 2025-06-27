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
mongoose.connect('mongodb://127.0.0.1:27017/hospitalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB error:'));
db.once('open', () => console.log('✅ MongoDB connected'));

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
  name: { type: String, required: true },
  patientId: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  csvFile: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Patient = mongoose.model('Patient', PatientSchema);

// User Schema for authentication
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'user_site', 'index.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'admin', 'login.html'));
});

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'admin', 'dashboard.html'));
});

// User Authentication Routes
app.post('/api/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // For demo purposes, we'll use a simple check
    // In production, you should use proper password hashing
    const user = await User.findOne({ email });
    
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ 
      success: true,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/user/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      password // In production, hash the password
    });
    
    await user.save();
    
    res.status(201).json({
      success: true,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// API Routes
app.post('/api/patient', upload.single('csv'), async (req, res) => {
  try {
    const { name, patientId, age } = req.body;
    const csvFile = req.file ? req.file.filename : null;

    if (!name || !patientId || !age || !csvFile) {
      return res.status(400).json({ error: 'Missing required fields: name, patientId, age, and CSV file' });
    }

    // Check if patient ID already exists
    const existingPatient = await Patient.findOne({ patientId });
    if (existingPatient) {
      return res.status(400).json({ error: 'Patient ID already exists' });
    }

    const newPatient = new Patient({ 
      name, 
      patientId, 
      age,
      csvFile: `uploads/${csvFile}` 
    });
    
    await newPatient.save();
    res.status(201).json({ 
      message: 'Patient saved successfully', 
      patient: {
        name: newPatient.name,
        patientId: newPatient.patientId,
        age: newPatient.age,
        csvFile: newPatient.csvFile
      }
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find({}).sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

app.delete('/api/patient/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    // Delete the CSV file if it exists
    if (patient.csvFile) {
      const filePath = path.join(__dirname, patient.csvFile);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    console.error('Error deleting patient:', err);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Admin Dashboard: http://localhost:${PORT}/dashboard.html`);
  console.log(`🔐 Admin Login: http://localhost:${PORT}/login.html`);
});
