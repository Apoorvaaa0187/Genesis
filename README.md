# GenGuard: Advanced DNA Mutation Analyzer

GenGuard is a full-stack web application for advanced DNA mutation analysis and personalized disease risk forecasting. It is designed for hospitals, clinics, and research labs to upload, analyze, and visualize genetic data for individual patients or multiple patients at once.

---

## Features

- **User Portal**
  - Personal login for patients/users
  - Upload mutation and clinical variant CSV files
  - View detailed mutation analysis results
  - Disease Forecast Timeline: Personalized risk predictions by age (like 23andMe)
  - Downloadable reports (PDF)

- **Admin Portal**
  - Secure admin login
  - Dashboard to add/view/delete patient records
  - Upload and analyze multi-patient mutation CSVs
  - View and manage all uploaded patient data

- **Mutation Analysis**
  - Matches user-uploaded mutations with clinical variant data (ClinVar)
  - Calculates risk scores and clinical significance
  - Visualizes results with tables and charts
  - AI-powered insights and recommendations

- **Multi-Patient Analysis**
  - Upload a CSV with multiple patients and mutations
  - See a matrix of which patients have which mutations
  - Generate individual patient reports

- **Modern UI/UX**
  - Responsive design with Tailwind CSS
  - Interactive charts (Chart.js)
  - AI chat assistant for genetic queries

---

## Technologies Used
- **Frontend:** HTML, CSS (Tailwind), JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local, via Mongoose ODM)
- **CSV Parsing:** PapaParse
- **Charts:** Chart.js
- **PDF Export:** html2pdf.js

---

## Project Structure

```
CIH-Hackthon-main/
├── main/
│   ├── admin/           # Admin dashboard, login, and scripts
│   ├── user/            # User login page
│   └── user_site/       # User portal, results, and UI
├── data/                # All CSV data files (mutations, clinvar, forecast, etc.)
├── uploads/             # Uploaded patient CSVs
├── server.js            # Main backend server
├── package.json         # Node.js dependencies
└── README.md            # This file
```

---

## Setup & Usage

### 1. Prerequisites
- Node.js and npm installed
- MongoDB installed and running locally (default port 27017)

### 2. Install Dependencies
```
npm install
```

### 3. Start the Server
```
node server.js
```

### 4. Access the App
- Open [http://localhost:5000/](http://localhost:5000/) in your browser
- Use the **Personal Login** or **Admin Login**

### 5. Demo Credentials
- **Admin:**
  - Email: `admin@genlab.com`
  - Password: `admin123`
- **User:**
  - Email: `user@demo.com`
  - Password: `user123`

---

## Data Files
- Place your CSV files in the `data/` folder:
  - `mutations.csv`, `clinvar_data.csv`, `mutation_disease_forecast.csv`, etc.
- Uploaded files are stored in `uploads/`

---

## How MongoDB is Used
- All patient and user data is stored in a local MongoDB database (`hospitalDB`)
- Mongoose is used for schema modeling and CRUD operations
- Can be switched to MongoDB Atlas by changing the connection string

---

## What's Incorporated
- User and admin authentication
- Patient record management
- File upload and storage
- Mutation and disease risk analysis
- Personalized disease forecast timeline
- Multi-patient CSV analysis
- Interactive charts and AI insights
- Modern, responsive UI

---
