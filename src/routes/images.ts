// Import Express to run index and routes
import express from 'express';
import * as path from 'path';
import sharp from 'sharp';
import {type} from "os";

// Setup the router
const images = express.Router();

// Get rout for image url
images.get('/', (req, res) => {
    const fileDirectory = path.resolve('../image_api/src/images/');

    async function processing() {
        try {
            // get query params
            let height: (number | string) = typeof req.query.height === "string" && req.query.height !== ""? parseInt(req.query.height) : 0;
            let width: (number | string) = typeof req.query.width === "string" && req.query.width !== ""? parseInt(req.query.width) : 0;
            let filename: (string) = typeof req.query.filename === "string" && req.query.filename !== "" ? req.query.filename : "no filename";

            const image = await sharp(`${fileDirectory}/${filename}.jpg`);

            if (filename !== "no filename" && width > 0 && height > 0) {
                let newImageName = `${filename}_${width}_${height}`
                // resize
                await image.resize(width, height)
                    .toFile(`${fileDirectory}/${newImageName}.jpg`
                    ) // containing a scaled and cropped version of input.jpg

                res.status(200)
                    .set('Cache-Control', 'public, max-age=900000')
                    .cookie('cookie_name', newImageName, {maxAge: 900000})
                    .sendFile(`${newImageName}.jpg`, {root: fileDirectory}, (err) => {
                        res.status(500)
                        res.end();
                        if (err) throw(err);
                    });
            } else if (filename === "no filename") {
                res.status(404).send("404 - file not found");
            } else {
                res.status(400).send("400 - Bad Request");
            }

        } catch (e) {
            res.status(400).send("400 - Bad Request")
        }
    }

    processing();

});

export default images;
