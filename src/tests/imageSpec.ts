import supertest from 'supertest';
import app from '../server';
import {promises as fsPromises} from 'fs';
import sharp from 'sharp';
import * as path from 'path';

const request = supertest(app);

describe('Test endpoint response status', () => {

    const fileDirectory: string = path.join(process.cwd(), `/images/`);

    it('gets the api endpoint', async () => {
            const response = await request.get('/api');
            expect(response.status).toBe(200);
        }
    )

    it('sends an response and a file in jpg format', async () => {
            const response = await request.get('/api/images?filename=friends&width=1&height=1');
            expect(response.get('Content-Type')).toBe("image/jpeg");
        }
    )
});

describe('Test of error handling', () => {

    it('returns an error message when query is missing', async () => {
            const response = await request.get('/api/images');
            expect(response.status).toBe(400);
        }
    )

    it('returns an error message filename is missing', async () => {
            const response = await request.get('/api/images?filename=');
            console.log(response.body)
            expect(response.status).toBe(400);
        }
    )

});