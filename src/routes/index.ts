// Import Express to run index and routes
import express from 'express';
import images from './images';

// Setup the router
const routes = express.Router();

// Get main route
routes.get('/', (req, res) => {
    res.send('main route');
});

routes.use('/images', images)


export default routes;