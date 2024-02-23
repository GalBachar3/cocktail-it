import { CocktailModel } from '../../models/cocktail.model.js';

export const getCocktails = async (req, res, next) => {
    try {
        const cocktails = await CocktailModel.find({});

        return res.json(cocktails);
    } catch (error) {
        next(error)
    }
};

export const createCocktail = async ({ body }, res, next) => {
    try {
        const newCocktail = new CocktailModel(body);
        console.log(newCocktail)
        await newCocktail.save();

        return res.status(200).json(newCocktail);
    } catch (error) {
        next(error)
    }
};

export const deleteCocktail = async (req, res) => {
    const cocktailId = req.params.id;
  
    try {
      const deletedCocktail = await CocktailModel.findByIdAndDelete(
        cocktailId,
        req.body,
        { new: true }
      );
  
      if (!deletedCocktail) {
        return res.status(404).json({ error: 'Cocktail not found' });
      }
  
      res.status(200).json(deletedCocktail);
    } catch (error) {
      console.error('Error deleting cocktail:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const updateCocktail = async (req, res) => {
    const cocktailId = req.params.id;
  
    try {
      const updatedCocktail = await CocktailModel.findByIdAndUpdate(
        cocktailId,
        req.body,
        { new: true }
      );
  
      if (!updatedCocktail) {
        return res.status(404).json({ error: 'Cocktail not found' });
      }
  
      res.status(200).json(updatedCocktail);
    } catch (error) {
      console.error('Error updating cocktail:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };