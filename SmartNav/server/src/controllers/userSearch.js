// controllers/userController.js
const pool = require("../config/db");

// Search user by name, email, phone, or userId
const searchUser = async (req, res) => {
  try {
    const { q } = req.query; // search query

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Query database with last seen location
    const [rows] = await pool.query(
      `SELECT 
         u.userId, 
         u.name, 
         u.email, 
         u.mobile AS phone, 
         u.emergency_contact AS emergency_number, 
         u.bloodGroup AS blood_group, 
         u.gender, 
         u.dob, 
         u.address,
         u.role,
         loc.latitude AS last_lat,
         loc.longitude AS last_lng,
         loc.recorded_at AS last_seen
       FROM users u
       LEFT JOIN (
         SELECT userId, latitude, longitude, recorded_at
         FROM user_locations
         WHERE (userId, recorded_at) IN (
           SELECT userId, MAX(recorded_at)
           FROM user_locations
           GROUP BY userId
         )
       ) loc ON u.userId = loc.userId
       WHERE u.name LIKE ? OR u.email LIKE ? OR u.mobile LIKE ? OR u.userId = ? 
       LIMIT 1`,
      [`%${q}%`, `%${q}%`, `%${q}%`, q]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Search User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { searchUser };
