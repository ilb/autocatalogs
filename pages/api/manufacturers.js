import nc from 'next-connect';
import { onError, onNoMatch } from '../../libs/middlewares.mjs';
import { createScope, processUsecaseApiInstance } from '../../core.js';
import GetManufacturersUsecase from '../../src/usecases/GetManufacturersUsecase.mjs';

export default nc({ onError, onNoMatch, attachParams: true }).get(async (req, res) => {
    const scope = await createScope(req);
    const usecase = new GetManufacturersUsecase(scope.cradle);
    const result = await processUsecaseApiInstance({ query: req.query }, usecase);
    if (!result.error) {
        res.status(200).json(result);
    } else {
        res.status(400).json({ error: result.error });
    }
})