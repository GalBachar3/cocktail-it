import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ imageUrl: `/images/${req.file.filename}` });
  } else {
    res.status(500).json({ error: 'Error uploading image' });
  }
});
