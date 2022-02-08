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
            let height: (number) = typeof req.query.height === "string" && req.query.height !== "" && typeof req.query.height !== "undefined" ? parseInt(req.query.height) : 400;
            let width: (number) = typeof req.query.width === "string" && req.query.width !== "" && typeof req.query.width !== "undefined" ? parseInt(req.query.width) : 400;
            let filename: (string) = typeof req.query.filename === "string" && req.query.filename !== "" ? req.query.filename : "warning";

            const image = await sharp(`${fileDirectory}/${filename}.jpg`);

            if (filename !== "warning") {
                let newImageName = `${filename}_${width}_${height}`
                // resize
                await image.resize(width, height)
                    .toFile(`${fileDirectory}/${newImageName}.jpg`,
                        function (err) {
                            if (err) throw err;
                        }); // containing a scaled and cropped version of input.jpg

                res.status(200)
                    .set('Cache-Control', 'public, max-age=900000')
                    .cookie('cookie_name', newImageName, {maxAge: 900000})
                    .sendFile(`${newImageName}.jpg`, {root: fileDirectory}, (err) => {
                        res.status(500)
                        res.end();
                        if (err) throw(err);
                    });
            } else {
                res.status(400).sendFile(`warning.jpg`, {root: fileDirectory}, (err) => {
                    res.status(500).end();
                    if (err) throw(err);
                });
            }

        } catch (e) {
            res.status(400).send("could not process query")
        }
    }

    processing();

});

export default images;
