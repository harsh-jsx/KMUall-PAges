const DEFAULT_GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxnCPRUQCpvrlpmGyqZI3kh3w8DP47n120zNSdIASGXqtcGqSrlyGUmD0Hl1J0ylH3nXg/exec';

function escapeHtml(value) {
  return String(value || '').replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[character]));
}

function validLead(body) {
  const lead = {
    name: String(body.name || '').trim(),
    mobile: String(body.mobile || '').trim(),
    email: String(body.email || '').trim(),
    course: String(body.course || '').trim(),
    city: String(body.city || '').trim(),
    formId: String(body.formId || '').trim(),
    source: String(body.source || '').trim(),
    submittedAt: String(body.submittedAt || new Date().toISOString())
  };

  if (!lead.name || !lead.mobile || !lead.course || !/^\d{10}$/.test(lead.mobile)) return null;
  if (lead.email && !/^\S+@\S+\.\S+$/.test(lead.email)) return null;
  return lead;
}

async function forwardToGoogleAppsScript(lead) {
  const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL || DEFAULT_GOOGLE_APPS_SCRIPT_URL;
  const response = await fetch(endpoint, {
    method: 'POST',
    // text/plain avoids a browser-style preflight and is readily available as e.postData in Apps Script.
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(lead),
    redirect: 'follow'
  });

  if (!response.ok) throw new Error(`Google Apps Script returned ${response.status}`);
  const responseBody = await response.text();
  if (/script function not found|<title>Error<\/title>/i.test(responseBody)) {
    throw new Error('Google Apps Script is missing a doPost handler');
  }
}

async function sendNotification(lead) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.NOTIFICATION_TO) return;

  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  const rows = Object.entries(lead)
    .map(([key, value]) => `<tr><th align="left">${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`)
    .join('');
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.NOTIFICATION_TO,
    subject: `New KMU enquiry: ${lead.course}`,
    html: `<h2>New KMU enquiry</h2><table>${rows}</table>`
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const lead = validLead(req.body || {});
  if (!lead) return res.status(400).json({ success: false, message: 'Please provide valid enquiry details.' });

  try {
    await forwardToGoogleAppsScript(lead);
  } catch (error) {
    console.error('Lead forwarding failed:', error.message);
    return res.status(502).json({ success: false, message: 'Unable to save your enquiry. Please try again.' });
  }

  try {
    await sendNotification(lead);
  } catch (error) {
    // The lead was already stored in Apps Script; a notification failure must not lose it.
    console.error('Lead notification failed:', error.message);
  }

  return res.status(201).json({ success: true });
};
