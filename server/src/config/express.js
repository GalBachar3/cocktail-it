import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import ErrorHandler, { notFoundError } from '../middlewares/error.middleware.js';
import routes from '../routes.js';

const app = express();
const port = process.env.PORT || 3000;

export const expressApp = () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', routes);

    app.get('*', notFoundError);
    app.use(ErrorHandler);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}