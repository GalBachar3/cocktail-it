import { AsyncRouter } from 'express-async-router';
import { getCocktails } from './cocktails.controller.js';

const router = AsyncRouter();

router.get('/', getCocktails);

export default router;