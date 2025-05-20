# Trakko

Trakko is a personal expense tracker that lets you add, manage, and export expenses directly into Google Sheets.

## 🚀 Features
- Add and view expenses
- Export to Google Sheets
- Simple UI, responsive layout

## 🛠️ Setup

### 1. Clone this repo & install dependencies
```bash
npm install
```

### 2. Configure environment
Create `.env.local`:
```
SHEET_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT='your_service_account_json_stringified'
```

### 3. Google Setup
- Create a Google Sheet and share it with your service account.
- Enable Google Sheets API.
- Download service account credentials.

### 4. Run Locally
```bash
npm run dev
```

### 5. Deploy to Vercel
Add env variables `SHEET_ID` and `GOOGLE_SERVICE_ACCOUNT`

