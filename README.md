# 🏥 Hospital Admin Dashboard - GenGuard

A comprehensive hospital administration system for managing patient records and genetic mutation data with MongoDB integration.

## 🚀 Features

- **Admin Authentication**: Secure login system for hospital administrators
- **Patient Management**: Add, view, and delete patient records
- **CSV Upload**: Upload and analyze genetic mutation CSV files
- **MongoDB Integration**: Persistent storage of patient data and file paths
- **Real-time Analysis**: Parse and display mutation data in interactive tables
- **File Management**: Automatic file upload handling and storage

## 📋 Database Schema

The system stores only 3 essential pieces of information per patient:
- **Name**: Patient's full name
- **Patient ID**: Unique identifier for each patient
- **CSV File**: Path to the uploaded mutation data file

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn package manager

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd CIH-Hackthon-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start MongoDB:**
   Make sure MongoDB is running on your local machine:
   ```bash
   # On Windows
   mongod
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Access the application:**
   - Main Portal: http://localhost:5000
   - Admin Login: http://localhost:5000/login.html
   - Admin Dashboard: http://localhost:5000/dashboard.html

## 🔐 Admin Access

**Default Credentials:**
- Email: `admin@genlab.com`
- Password: `admin123`

## 📊 How to Use

### 1. Admin Login
- Navigate to the admin login page
- Enter the credentials above
- You'll be redirected to the dashboard

### 2. Add Patient Record
- Fill in the patient name and ID
- Upload a CSV file with mutation data
- Click "Add Patient" to save to MongoDB

### 3. View Patient Records
- All saved patients are displayed in a table
- Click "Refresh Records" to update the list
- Delete patients using the delete button

### 4. Upload Multi-Patient CSV
- Upload a CSV file with multiple patient mutations
- The system will parse and analyze the data
- View results in an interactive table format

### 5. Generate Reports
- Click "Show Report" for any patient to view detailed mutation analysis
- Reports open in a new tab with comprehensive genetic data

## 📁 Project Structure

```
CIH-Hackthon-main/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── main/
│   ├── admin/
│   │   ├── login.html     # Admin login page
│   │   └── dashboard.html # Admin dashboard
│   └── user_site/
│       ├── index.html     # Main portal
│       └── html.html      # Patient report viewer
├── uploads/               # CSV file storage
└── data/                  # Sample data files
```

## 🔧 API Endpoints

- `POST /api/patient` - Add new patient with CSV file
- `GET /api/patients` - Retrieve all patients
- `DELETE /api/patient/:id` - Delete a patient record

## 🧬 CSV Format

The system expects CSV files with the following columns:
- `UserID` - Patient identifier
- `Gene` - Gene name
- `Mutation` - Mutation details

## 🚨 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running on port 27017
- Check if the `hospitalDB` database is accessible

### File Upload Issues
- Verify the `uploads` directory exists
- Check file permissions
- Ensure CSV files are properly formatted

### Server Issues
- Check if port 5000 is available
- Verify all dependencies are installed
- Check console for error messages

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

