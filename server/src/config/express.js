import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import ErrorHandler, { notFoundError } from '../middlewares/error.middleware.js';
import routes from '../routes.js';
import multer from 'multer';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
    origin: 'http://localhost:5173', // Adjust the client's URL
    optionsSuccessStatus: 200,
  }));


// Set up the storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.set('view engine', 'ejs');
  
  app.get('/', (req, res) => {
    res.render('index');
  });
  
  app.post('/api/upload', upload.single('image'), (req, res) => {
    console.log("asfssag", req.body)
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      res.json({ imageUrl });
    } else {
      res.status(500).json({ error: 'Error uploading image' });
    }
  });

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