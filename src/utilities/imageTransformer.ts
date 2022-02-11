import express from 'express';
import * as path from 'path';
import sharp from 'sharp';


// Get rout for image url

const transformeImage = async (height: number, width: number, directory: string, inputFile: string, outputFile: string): Promise<boolean> => {
    try {
        // get image
        const image = await sharp(`${directory}/${inputFile}`);
        // resize
        await image.resize(width, height)
            .toFile(`${directory}/${outputFile}`) // containing a scaled and cropped version of input.jpg
        // containing a scaled and cropped version of input.jpg
        return true

    } catch (error) {
        return false
    }
};

export {transformeImage};