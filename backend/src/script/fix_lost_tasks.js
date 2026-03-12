const db = require('../config/database');

async function fixLostTasks() {
    try {
        const [boards] = await db.query('SELECT id, titulo FROM quadro');
        if (boards.length === 0) {
            console.log('NO_BOARDS_FOUND');
            return;
        }

        const bId = boards[0].id; // Re-assign to the first board found
        const [res] = await db.query('UPDATE tarefa SET quadro_id = ? WHERE quadro_id IS NULL', [bId]);
        console.log(`FIXED_${res.affectedRows}_TASKS_INTO_BOARD_${bId}`);
    } catch (error) {
        console.error('ERROR:' + error.message);
    } finally {
        process.exit();
    }
}

fixLostTasks();
