const db = require('./backend/src/config/database');
const bcrypt = require('bcryptjs');

async function updateAdminPassword() {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        
        const [result] = await db.query(
            'UPDATE utilizador SET senha = ? WHERE email = ? AND tipo = ?',
            [hashedPassword, 'admin@taskflow.com', 'admin']
        );
        
        if (result.affectedRows > 0) {
            console.log('SUCCESS: Senha do admin atualizada para "admin123"');
        } else {
            console.log('FAILURE: Administrador não encontrado para atualizar.');
        }
    } catch (error) {
        console.error('ERROR:' + error.message);
    } finally {
        process.exit();
    }
}

updateAdminPassword();
