import { AsyncRouter } from 'express-async-router';
import { createCocktail, getCocktails, deleteCocktail, updateCocktail } from './cocktails.controller.js';

const router = AsyncRouter();

router.get('/', getCocktails);
router.post('/', createCocktail);
router.put('/:id', updateCocktail);
router.delete('/:id', deleteCocktail);

export default router;