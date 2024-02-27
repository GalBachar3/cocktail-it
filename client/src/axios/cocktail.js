import axios from "axios"

export const getRandomCocktail = async () => {
    const {data} = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktail = data.drinks[0];
    const {strDrink: name, strCategory: category, strInstructions: instructions } = cocktail;
    const ingredients = getIngredientsString(cocktail);
    const imageResponse = await axios.get(`${cocktail.strDrinkThumb}/preview`,{
        responseType: 'arraybuffer'
      });

    const blob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
    
    return {
        name,
        category,
        ingredients,
        instructions, 
        image : blob
    }
}

const getIngredientsString = (cocktail) => {
    let ingredientNumber = 1;
    let str = ''

    while (cocktail[`strIngredient${ingredientNumber}`]) {
        str = `${str}${cocktail[`strIngredient${ingredientNumber}`]}, `;
        ingredientNumber++;
    }

    return str.slice(0, -2);
}