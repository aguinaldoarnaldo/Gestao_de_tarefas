const db = require('../config/database');
const bcrypt = require('bcryptjs');

async function resetUserPassword() {
    try {
        const email = 'aguinaldoarnaldo5@gmail.com';
        const newPassword = '123456';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        const [result] = await db.query(
            'UPDATE utilizador SET senha = ? WHERE email = ?',
            [hashedPassword, email]
        );
        
        if (result.affectedRows > 0) {
            console.log(`SUCCESS: Senha do usuário ${email} atualizada para "${newPassword}"`);
        } else {
            console.log(`FAILURE: Usuário ${email} não encontrado.`);
        }
    } catch (error) {
        console.error('ERROR:' + error.message);
    } finally {
        process.exit();
    }
}

resetUserPassword();
