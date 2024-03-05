import mongoose, { Schema, model } from 'mongoose';

const CocktailSchema = new Schema({
    name: { type: String, required: true, length: { min: 1 } },
    category: { type: String, required: true, length: { min: 1 } },
    ingredients: { type: String, required: true, length: { min: 1 } },
    instructions: { type: String, required: true,length: { min: 1 } },
    userId: { type: String, required: true, length: { min: 1 } },
    image: {type:String},
    username: { type: String, required: true, length: { min: 1 } },
    comments: { type: Array }
}, { timestamps: true });

export const CocktailModel = model('Cocktail', CocktailSchema);
