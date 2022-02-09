import supertest from 'supertest';
import app from '../server';
import {promises as fsPromises} from 'fs';
import sharp from 'sharp';
import * as path from 'path';

const request = supertest(app);

describe('Test endpoint response status', () => {
    it('gets the api endpoint', async () => {
            const response = await request.get('/api');
            expect(response.status).toBe(200);
        }
    )
    it('gets the api/images endpoint', async () => {
            const response = await request.get('/api/images');
            expect(response.status).toBe(404);
        }
    )


});

describe('Test if files are been processed and delivered', () => {
    // Setup test image
    let fileDirectory = path.resolve('../image_api/src/images/');
    beforeAll(async () => {
        let image = await sharp(`${fileDirectory}/friends.jpg`);
        await image.resize(1, 1)
            .toFile(`${fileDirectory}/friends_1_1.jpg`
            )
    });

    it('an image gets processed and safed', async () => {
            const myFile = await fsPromises.open(`${fileDirectory}/friends_1_1.jpg`, 'a+');
            expect(myFile).toBeTruthy();
        }
    )
    it('comes in the expacted format', async () => {
            const response = await request.get('/api/images?filename=friends&width=1&height=1');
            expect(response.get('Content-Type')).toBe("image/jpeg");
        }
    )
    // Teardown test image
    afterAll(async () => {
            await fsPromises.unlink(`${fileDirectory}/friends_1_1.jpg`);
        }
    );
});


describe('Test of error handling', () => {
    // Setup test image
    let fileDirectory = path.resolve('../image_api/src/images/');

    it('returns an error message file not found', async () => {
            const response = await request.get('/api/images?filename=');
            expect(response.status).toBe(404);
        }
    )
    it('shoud return an error message file not found', async () => {
            const response = await request.get('/api/images?filename=');
            expect(response.status).toBe(404);
        }
    )

});