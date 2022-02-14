// Import Express to run index and routes
import express from 'express';
import * as path from 'path';
import { transformeImage } from '../utilities/imageTransformer';
import { checkFileExists } from '../utilities/fileChecker';

// Setup the router
const images = express.Router();

// Get rout for image url
images.get('/',async (req:express.Request, res:express.Response):Promise<void> => {
    // get query params
    const height: number | null =
      parseInt(req.query.height as unknown as string) || null;
    const width: number | null =
      parseInt(req.query.width as unknown as string) || null;
    const filename: string = req.query.filename as string;

    // set path and name for files
    const fileDirectory: string = path.join(process.cwd(), `/images/`);
    const inputFile: string = `${filename}.jpg`;
    const outputFile: string = `${filename}_${width}_${height}.jpg`;
    const exists = await checkFileExists(fileDirectory, inputFile);

    // send server response for route
    if (exists) {
      if (width === null || height === null) {
        res
          .status(400)
          .send(
            '400 - Bad Request. Please set query parameters for width and height'
          );
      } else if (width < 0 || height < 0) {
        res
          .status(400)
          .send(
            '400 - Bad Request. Parameters for width and height must be positive'
          );
      } else {
        const transformed = await transformeImage(
          height,
          width,
          fileDirectory,
          inputFile,
          outputFile
        );
        if (transformed) {
          res
            .status(200)
            .set('Cache-Control', 'public, max-age=900000')
            .cookie('cookie_name', `friends`, { maxAge: 900000 })
            .sendFile(outputFile, { root: fileDirectory }, (err) => {
              res.status(500);
              res.end();
              if (err) throw err;
            });
        } else {
          res.status(500).send('500 - Internal Server Error');
        }
      }
    } else {
      res.status(400).send('400 - Bad Request. File not found, check filename');
    }
  }
);

export default images;
