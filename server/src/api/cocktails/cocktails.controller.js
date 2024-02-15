import { CocktailModel } from '../../models/cocktail.model.js';

export const getCocktails = async (req, res, next) => {
    try {
        const cocktails = await CocktailModel.find({});

        return res.json(cocktails);
    } catch (error) {
        next(error)
    }
};