import 'dotenv/config';
import { connectToDatabase } from './config/db.js';
import { expressApp } from './config/express.js';
import http from 'http'
import https from "https";
import fs from "fs";
import path from "path";

const port = process.env.PORT || 3000;
const dirname = path.resolve();

connectToDatabase()
    .then(()=> {
        const app = expressApp();

        if (process.env.NODE_ENV !== "production") {
            console.log("development mode");
        } else {
            console.log("production mode");
          const options = {
            key: fs.readFileSync(path.join(dirname, "./cert/client-key.pem")),
            cert: fs.readFileSync(path.join(dirname, "./cert/client-cert.pem")),
          };
          https.createServer(options, app).listen(process.env.HTTPS_PORT, () => {
            console.log(`server listening on port ${process.env.HTTPS_PORT}`);
          });
        }

        
    })
    .catch(error => {
        console.log(error);
    });