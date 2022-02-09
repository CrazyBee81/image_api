// Import Express to run index and routes
import express, { Request, Response } from 'express';
import images from './images';

// Setup the router
const routes = express.Router();

// Get main route
routes.get('/', (req:Request, res: Response):void => {
    res.send('main route');
});

routes.use('/images', images)


export default routes;