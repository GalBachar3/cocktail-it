import { AsyncRouter } from 'express-async-router';
import { createCocktail, getCocktails, deleteCocktail, updateCocktail } from './cocktails.controller.js';
import { protect } from "../../middlewares/auth.middleware.js";

const router = AsyncRouter();
/**
 * @swagger
 *components:
 *  schemas:
 *    Cocktail:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the cocktail.
 *        category:
 *          type: string
 *          description: The category of the cocktail.
 *        ingredients:
 *          type: string
 *          description: The ingredients of the cocktail.
 *        instructions:
 *          type: string
 *          description: The instructions for preparing the cocktail.
 *        userId:
 *          type: string
 *          description: The user ID associated with the cocktail.
 *        image:
 *          type: string
 *          description: The URL or path to an image of the cocktail.
 *        username:
 *          type: string
 *          description: The username of the user who created the cocktail.
 *        comments:
 *          type: string
 *          description: Comments or additional notes about the cocktail.
 * api/cocktails:
 *   get:
 *     summary: Get all cocktails
 *     description: Retrieve a list of all cocktails.
 *     tags:
 *       - Cocktails
 *     responses:
 *       200:
 *         description: Successful retrieval of cocktail list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cocktail'
 *       500:
 *         description: Internal Server Error - Error during cocktail retrieval process
 *   post:
 *     summary: Create a new cocktail
 *     description: Create a new cocktail with the provided details.
 *     tags:
 *       - Cocktails
 *     requestBody:
 *       description: Cocktail details for creation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cocktail'
 *     responses:
 *       201:
 *         description: Cocktail successfully created
 *       400:
 *         description: Bad Request - Invalid cocktail data
 *       500:
 *         description: Internal Server Error - Error during cocktail creation process
 * 
 * api/cocktails/{cocktailId}:
 *   parameters:
 *     - in: path
 *       name: cocktailId
 *       required: true
 *       description: The unique identifier of the cocktail.
 *       schema:
 *         type: string
 *   put:
 *     summary: Update a cocktail by ID
 *     description: Update the details of a cocktail by its unique identifier.
 *     tags:
 *       - Cocktails
 *     parameters:
 *       - $ref: '#/components/schemas/Cocktail'
 *     responses:
 *       204:
 *         description: Cocktail successfully updated
 *       404:
 *         description: Cocktail not found
 *       500:
 *         description: Internal Server Error - Error during cocktail update process
 *   delete:
 *     summary: Delete a cocktail by ID
 *     description: Delete a cocktail by its unique identifier.
 *     tags:
 *       - Cocktails
 *     responses:
 *       204:
 *         description: Cocktail successfully deleted
 *       404:
 *         description: Cocktail not found
 *       500:
 *         description: Internal Server Error - Error during cocktail deletion process
 */
router.get('/', getCocktails);
router.post('/', protect, createCocktail);
router.put('/:id', protect, updateCocktail);
router.delete('/:id', protect, deleteCocktail);

export default router;