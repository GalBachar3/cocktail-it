import { AsyncRouter } from 'express-async-router';
import { createCocktail, getCocktails, deleteCocktail, updateCocktail } from './cocktails.controller.js';
import { protect } from "../../middlewares/auth.middleware.js";

const router = AsyncRouter();

router.get('/', getCocktails);
router.post('/', protect, createCocktail);
router.put('/:id', protect, updateCocktail);
router.delete('/:id', protect, deleteCocktail);

export default router;