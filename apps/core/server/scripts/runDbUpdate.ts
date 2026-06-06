import { updateDbs } from '../../lib/db/updateDbs';

void (async () => {
    try {
        await updateDbs();
        process.exit(0);
    } catch (err) {
        console.error('Task failed:', err);
        process.exit(1);
    }
})();