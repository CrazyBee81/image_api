
# Image API
This project is a part of the Udacity course [Fullstack JavaScript Developer](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd0044?utm_source=gsem_brand&utm_medium=ads_r&utm_campaign=12906460312_c&utm_term=121838875139&utm_keyword=udacity%20full%20stack_e&gclid=CjwKCAiA6Y2QBhAtEiwAGHybPUmccrsABtsCa7uMT0xMnVqqCSdzpsdC1W7hfHn8T-qz8iIGznUmbhoCLPUQAvD_BwE). It shows the student's capability to put up an express server and to develop a simple API service. The image API allows you to place images into your frontend with the size set via URL parameter. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size 

# Installation
To clone the project locally and to install all dependencies on your computer, type or copy the following commands into your terminal. 

```
git clone https://github.com/CrazyBee81/image_api.git
npm install
```

# Usage 
In order to start the project, there have been scripts set up to build and start the project

```
npm run build
npm run start
```

After that, the project runs on localhost:3000 and the image endpoint can be reached. Just add a query string with parameters for filename, width, and height to process an image.

E.g.
(http://localhost:3000/api/images?filename=friends&width=300&height=250)

After the image has been processed, it will be saved in the backend folder and cached in your browser to reduce page load.

# Contribution
For the purpose of training, this project is showing a still easy but highly scalable professional environment. As such, industry best practices for safe coding have been applied to keep the code easily readable, maintainable, and less error-prone. 

There are still some opportunities left to contribute to this project.  For example, sharp offers to add additional styling to images, usage for other formats, or a logger middleware could be implemented. When doing this, please make sure to use

*   TypeScript: To reduce developer errors
* 	Prettier: To make sure all contributors will format the code in a consistent way. 
* 	Eslint: To help find coding errors
* 	Unit testing: For automated testing in order to find issues in an early stage and to make sure, that new and refactored code does not affect the core functionality of the app.  

# License
This code has been developed by Reinhold Beny after the instruction of Udacity´s nano degree "Fullstack JS Developer". It is free software, and maybe redistributed under the terms specified in the LICENSE file.
