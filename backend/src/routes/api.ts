import { Router } from 'express';
import pool from '../config/db';

const router = Router();

// =======================
// SETTINGS API
// =======================

// GET site settings
router.get('/settings', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    
    // Transform array of rows into a single key-value object
    const settingsMap: Record<string, string> = {};
    (rows as any[]).forEach(row => {
      settingsMap[row.setting_key] = row.setting_value;
    });

    res.json(settingsMap);
  } catch (error) {
    console.error("GET /settings error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT (Update) multiple settings (Admin)
router.put('/settings', async (req, res) => {
  try {
    const { updates } = req.body; 
    // Expects updates to be: { "silver_price": "12999", "hero_video_url": "..." }
    
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ error: 'Invalid updates payload. Object expected.' });
    }

    const connection = await pool.getConnection();
    for (const [key, value] of Object.entries(updates)) {
      await connection.execute(
        'UPDATE site_settings SET setting_value = ? WHERE setting_key = ?',
        [String(value), key]
      );
    }
    connection.release();

    res.json({ success: true, message: 'Settings successfully updated across database' });
  } catch (error) {
    console.error("PUT /settings error:", error);
    res.status(500).json({ error: 'Internal Server Error processing updates' });
  }
});

// =======================
// LEADS API
// =======================

// POST new lead (Public form submission)
router.post('/leads', async (req, res) => {
  try {
    const { name, phone, area, propertyType, expectedPrice, packageName, packagePrice } = req.body;

    if (!name || !phone || !area || !packageName) {
      return res.status(400).json({ error: 'Missing required lead fields' });
    }

    const [result] = await pool.execute(
      `INSERT INTO leads (name, phone, area, property_type, expected_price, package_name, package_price) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, phone, area, propertyType || null, expectedPrice || null, packageName, packagePrice]
    );

    res.json({ success: true, leadId: (result as any).insertId });
  } catch (error) {
    console.error("POST /leads error:", error);
    res.status(500).json({ error: 'Internal Server Error writing lead' });
  }
});

// GET all leads (Admin)
router.get('/leads', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error("GET /leads error:", error);
    res.status(500).json({ error: 'Internal Server Error fetching leads' });
  }
});

export default router;
