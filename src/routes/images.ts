// Import Express to run index and routes
import express from 'express';
import * as path from 'path';
import Jimp from 'jimp';
import {type} from "os";

// Setup the router
const images = express.Router();

// Get rout for image url
images.get('/', (req, res) => {
    const fileDirectory = path.resolve('../image_api/src/images/');

    async function processing() {
        try {
            const image = await Jimp.read(`${fileDirectory}/${req.query.filename}.jpg`)
            // get query params
            let height: (number) = typeof req.query.height === "string" && typeof req.query.height !== "undefined" ? parseInt(req.query.height) : 400;
            let width: (number) = typeof req.query.width === "string" && typeof req.query.height !== "undefined" ? parseInt(req.query.width) : 400;
            let filename: (string) = typeof req.query.filename === "string" ? req.query.filename : "warning";

            // resize
            image.resize(width, height, function (err) {
                if (err) throw err;
            })
                .quality(60) // change quality
                .write(`${fileDirectory}/${filename}_thumb.jpg`); // write new file

            res.sendFile(`${filename}_thumb.jpg`, {root: fileDirectory}, (err) => {
                res.end();
                if (err) throw(err);
            });
        } catch (e) {
            res.send("could not process query")
        }
    }

    processing();

});

export default images;
