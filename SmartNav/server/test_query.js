const mysql = require('mysql2/promise');

(async () => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost', 
            user: 'root', 
            password: '491194', 
            database: 'smart-navigation'
        });
        const [rows] = await conn.query(`
           SELECT 
             u.userId, 
             u.name, 
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
           LIMIT 1
        `);
        console.log('RESULT:', JSON.stringify(rows));
        conn.end();
    } catch(e) {
        console.error('ERROR:', e.message);
    }
})();
