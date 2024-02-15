import 'dotenv/config';
import { connectToDatabase } from './config/db.js';
import { expressApp } from './config/express.js';

connectToDatabase()
    .then(expressApp)
    .catch(error => {
        console.log(error);
    });