// * Importing our required packages
const express = require("express");
const path = require("path");
const { get } = require("request");

// * App & port config
var app = express();
var PORT = 8080 || process.env.PORT;

// * Middleware config
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// * We have specific static files we need to server in order for the NNs to work
    // ? When served correctly, on the webpage's console, we'll see..
        // ? src
            // ! This houses most of the weights/models for the CNN
        // ? node_modules
            // ! Has some important modules (TensorFlow, Face-API)
const viewsDirectory = path.join(__dirname, "views");
app.use(express.static(viewsDirectory));

// * Serving our "PUBLIC" directory
    // ! webCamFaceRecog/public
app.use(express.static(path.join(__dirname, "./public")));

// * Serving our "IMAGES" directory
    // ! webcamFaceRecog/images
    // ? This will store images (if images are needed for facial recog)
        // ? If we use images for the facial recognition, we would essentially scan over the images and compare to video
app.use(express.static(path.join(__dirname, "../images")));

// * Serving our weights
    // ! webCamRecog/weights
    // ? The weights are required for the CNN to work
    // ? THEY ARE ***ESSENTIAL*** in the CNN algorithms
    // ? These are essentially:
        // ? Different models for the detection/recognition
        // ? Different functions/algorithms used in detection
app.use(express.static(path.join(__dirname, "./weights")));

// * Serving the "dist" directory
    // ! webCamRecog/dist
    // ? This directory houses the actual neural networks
    // ? All of the algorithms are located here
        // ? Adjustments for the NN
        // ? Detection NN
        // ? ...etc.
app.use(express.static(path.join(__dirname, "./dist")));

// * Router for the facial detection
    // ? The "/" route is the home route, for testing the redirect can be changed to the current to be tested page
app.get('/', (req, res) => res.redirect('/face_detection'));
app.get('/face_detection', (req, res) => res.sendFile(path.join(viewsDirectory, "faceDetection.html")));

// * Server configuration
app.listen(PORT, function(){
    console.log("Application listening on localhost:"+ PORT);
});