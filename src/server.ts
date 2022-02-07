// Import Express to run index and routes
import express from 'express';
import routes from './routes/index';

// Start up an instance of app
const app = express();

// Setup a port for the server
const port = 3000;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
});

// GET route
app.use('/api', routes)

const myFunc = (num: number): number => {
    return num * num;
};

export default myFunc;