const mysql = require('mysql2/promise');
const fs = require('fs');
(async () => {
    try {
        const conn = await mysql.createConnection({host:'localhost', user:'root', password:'491194', database:'smart-navigation'});
        const [users] = await conn.query('SELECT * FROM users WHERE email = ?', ['manojkumar.ec23@bitsathy.ac.in']);
        
        let output = 'USER:\n' + JSON.stringify(users, null, 2) + '\n';
        
        if (users.length > 0) {
            const userId = users[0].userId;
            const [locs] = await conn.query('SELECT * FROM user_locations WHERE userId = ?', [userId]);
            output += 'LOCATIONS:\n' + JSON.stringify(locs, null, 2) + '\n';
        }
        
        fs.writeFileSync('test_output.txt', output);
        conn.end();
    } catch(e) {
        console.error('ERROR:', e.message);
    }
})();
