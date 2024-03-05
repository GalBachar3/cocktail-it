import { z } from 'zod';

export const addEditCocktailFormSchema = z.object({
    instructions: z.string().min(1),
    name: z.string().min(1),
    category: z.string().min(1),
    ingredients: z.string().min(1),
});