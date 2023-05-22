import nc from 'next-connect';
import { onError, onNoMatch } from '../../libs/middlewares.mjs';
import { createScope } from '../../core.js';
import HeartbeatUsecases from '../../src/usecases/HeartbeatUsecases.mjs';

export default nc({ onError, onNoMatch, attachParams: true }).get(async (req, res) => {
    const scope = await createScope(req);
    const usecase = new HeartbeatUsecases(scope.cradle);
    try {
        await usecase.process();
        res.status(200).send('OK');
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    }
})