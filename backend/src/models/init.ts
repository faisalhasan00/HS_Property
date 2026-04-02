import pool from '../config/db';

export async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();

    // 1. Leads Table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        area VARCHAR(255) NOT NULL,
        property_type VARCHAR(100),
        expected_price VARCHAR(100),
        package_name VARCHAR(100) NOT NULL,
        package_price VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Site Settings Table (Key-Value paired strategy for extreme flexibility)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS site_settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Bootstrap default settings into the DB if fresh
    await connection.execute(`
      INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES
      ('hero_video_url', 'https://www.youtube.com/embed/UtlM8MzNhAA?autoplay=1&mute=1&loop=1&playlist=UtlM8MzNhAA&controls=0&showinfo=0&rel=0&modestbranding=1&vq=hd1080'),
      ('silver_price', '14999'),
      ('gold_price', '24999'),
      ('diamond_price', '49999'),
      ('hero_view_count', '40.2K+ Views')
    `);

    connection.release();
    console.log("[CMS DB] MySQL Base structure synchronized successfully.");
  } catch (error) {
    console.error("[CMS DB] Error initializing MySQL database tables:", error);
  }
}
