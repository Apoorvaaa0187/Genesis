# 🧬 GenGuard – Secure DNA Analysis & Forecasting Portal

GenGuard is a powerful, AI-assisted web application designed for secure genetic data management and mutation analysis. The platform supports both personal users and hospital administrators, enabling them to upload, manage, and analyze DNA data to predict disease risks and genetic traits.
---

- **Admin Authentication**: Secure login system for hospital administrators
- **Patient Management**: Add, view, and delete patient records
- **CSV Upload**: Upload and analyze genetic mutation CSV files
- **MongoDB Integration**: Persistent storage of patient data and file paths
- **Real-time Analysis**: Parse and display mutation data in interactive tables
- **File Management**: Automatic file upload handling and storage

## 🚪 Access Levels

- **👤 Personal Access**
  - Upload and view individual genetic analysis reports.
  - Simple UI for non-technical users.
  
- **🏥 Admin Access**
  - Manage multiple patient records.
  - Upload CSV files containing genetic data.
  - Perform large-scale mutation analysis.

---

## 🖼️ UI Preview

### 🔐 Home Portal
Users are prompted to select either:
- **Personal Access**: Upload and view personal DNA reports.
- **Admin Access**: Manage patient genetic records and run mutation analysis tools.

### 📊 Admin Dashboard
- **Add Patient Record**: Input name, ID, age, and upload a genetic data CSV.
- **Patient Records Table**: Displays all uploaded records with file links and delete options.
- **Multi-Patient Mutation Analysis**:
  - Upload a batch CSV.
  - Instantly analyze using the integrated AI pipeline.

---

## ⚙️ Features

- 📁 **CSV Upload & Analysis**  
  Upload single or multi-patient mutation data files for processing.

- 🧬 **Mutation Forecasting**  
  Analyze gene mutations and forecast potential health risks.

- 🗂️ **Patient Record Management**  
  Add, view, and delete patient entries with ease.

- 🤖 **AI-Enhanced Analysis** *(Optional expansion)*  
  Integrate AI models (e.g., Hugging Face, Google Gemini) for advanced gene interpretation.

- 💻 **Responsive UI**  
  Fully responsive and built using Tailwind CSS for seamless performance.

---

## 🛠️ Technologies Used

| Component            | Stack/Tools                       |
|----------------------|-----------------------------------|
| **Frontend**         | HTML, CSS, JavaScript             |
| **Styling**          | Tailwind CSS                      |
| **Icons**            | Font Awesome                     |
| **CSV Parsing**      | JavaScript File APIs              |
| **AI (Planned)**     | Google Gemini API, Hugging Face   |

---

## 🧪 How to Use

### 🧬 For Personal Users
1. Click **Personal Access** on the landing page.
2. Upload your genetic report (CSV).
3. View insights and possible risks.

### 🏥 For Admins
1. Click **Admin Access**.
2. Add new patients with ID, name, and age.
3. Upload each patient's mutation CSV.
4. View or delete from the patient list.
5. For batch uploads, use the **Multi-Patient Mutation Analysis** section.
