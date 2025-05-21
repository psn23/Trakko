import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { expenses } = req.body;

  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.SHEET_ID;

  const values = expenses.map((e) => [e.title, e.amount]);

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });
    res.status(200).json({ message: "Export successful!" });
  } catch (error) {
    console.error("Export failed:", error);
    res.status(500).json({ message: "Export failed", error });
  }
}
