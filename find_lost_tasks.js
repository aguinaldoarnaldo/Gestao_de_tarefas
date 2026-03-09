const db = require('./backend/src/config/database');

async function findLostTasks() {
    try {
        const [rows] = await db.query('SELECT t.id, t.titulo, t.quadro_id, u.nome as dono FROM tarefa t JOIN utilizador u ON t.utilizador_id = u.id WHERE t.quadro_id IS NULL');
        console.log('LOST_TASKS:' + JSON.stringify(rows));
        
        const [boards] = await db.query('SELECT id, titulo FROM quadro');
        console.log('AVAILABLE_BOARDS:' + JSON.stringify(boards));
    } catch (error) {
        console.error('ERROR:' + error.message);
    } finally {
        process.exit();
    }
}

findLostTasks();
