import mongoose, { Schema, model } from 'mongoose';

const CocktailSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: String, required: true },
    instructions: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    comments: { type: Array }
}, { timestamps: true });

export const CocktailModel = model('Cocktail', CocktailSchema);
