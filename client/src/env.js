const metaEnv = import.meta.env;

export const env = {
    serverAddress: metaEnv.VITE_SERVER_ADDRESS,
    randomCocktailApi: metaEnv.VITE_RANDOM_COCKTAIL_API
}