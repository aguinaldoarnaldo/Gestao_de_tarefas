const db = require('../config/database');

async function checkAdmin() {
    try {
        const [rows] = await db.query('SELECT nome, email, tipo FROM utilizador WHERE tipo = "admin"');
        if (rows.length > 0) {
            console.log('ADMIN_USERS:' + JSON.stringify(rows));
        } else {
            console.log('ADMIN_USERS:none');
        }
    } catch (error) {
        console.error('ERROR:' + error.message);
    } finally {
        process.exit();
    }
}

checkAdmin();
