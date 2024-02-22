import mongoose, { Schema, model } from 'mongoose';

const CocktailSchema = new Schema({
    name: { type: String, require: true },
    category: { type: String, require: true },
    ingredients: { type: String, require: true },
    instructions: { type: String, require: true },
    userId: {type: String, require: true},
    comments: {type: Array},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      }
}, { timestamps: true });

export const CocktailModel = model('Cocktail', CocktailSchema);