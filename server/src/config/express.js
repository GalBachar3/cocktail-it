import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import ErrorHandler, { notFoundError } from '../middlewares/error.middleware.js';
import routes from '../routes.js';
import multer from 'multer';
import path from 'path';
import { configSwagger } from './swagger.js';

const dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3000;
  
export const expressApp = () => {
    app.use(cors({
      origin: 'https://node17.cs.colman.ac.il', // Allow only requests from this origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Allow sending cookies and HTTP authentication
      allowedHeaders: 'Content-Type,Authorization',
      optionsSuccessStatus: 200
    }));

    // app.use(express.static('public'));
    app.use(express.static(path.join(dirname, 'dist')));

    app.get('/*', (req, res) => {
      res.sendFile(path.join(dirname, 'dist', 'index.html'));
    });
    app.use(express.urlencoded({ extended: false }));
    app.set('view engine', 'ejs');
    
    // app.get('/', (req, res) => {
    //   res.render('index');
    // });
  
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/', routes);
    
    configSwagger(app);

    app.get('*', notFoundError);
    app.use(ErrorHandler);

    return app;
}