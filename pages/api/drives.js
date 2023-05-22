import nc from 'next-connect';
import { onError, onNoMatch } from '../../libs/middlewares.mjs';
import { createScope, processUsecaseApiInstance } from '../../core.js';
import GetDrivesUsecase from '../../src/usecases/GetDrivesUsecase.mjs';

export default nc({ onError, onNoMatch, attachParams: true }).get(async (req, res) => {
    const scope = await createScope(req);
    const usecase = new GetDrivesUsecase(scope.cradle);
    const result = await processUsecaseApiInstance({ query: req.query }, usecase);
    if (!result.error) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ error: result.error });
    }
})