const classes = ["Nathan"];

function getFaceImageUri(className, idx) {
    return `${className}/${className}${idx}.png`
};

function renderFaceImageSelectList(selectListId, onChange, initialValue) {
    const indices = [1, 2, 3, 4, 5];
    function renderChildren(select){
        classes.forEach(className => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = className;
            select.appendChild(optgroup);
            indices.forEach(imageIdx =>{
                renderOption(
                    optgroup,
                    `${className} ${imageIdx}`,
                    getFaceImageUri(className, imageIdx)
                )
            })
        })
    }

    renderFaceImageSelectList(
        selectListId,
        onChange,
        getFaceImageUri(initialValue.className, initialValue.imageIdx),
        renderChildren
    )
}

async function createFaceMatcher(numImagesForTraining = 1) {
    const maxAvailableImagesPerClass = 5
    numImagesForTraining = Math.min(numImagesForTraining, maxAvailableImagesPerClass);

    const labeledFaceDescriptors = await Promise.all(classes.map(
        async className => {
            const descriptors = [];
            for(let i = 1; i < (numImagesForTraining + 1); i++){
                const img = await faceapi.fetchImage(getFaceImageUri(className, i))
                descriptors.push(await faceapi.computeFaceDescriptor(img))
            }

            return new faceapi.LabeledFaceDescriptors(
                className,
                descriptors
            )
        }
    ))

    return new faceapi.FaceMatcher(labeledFaceDescriptors);
}

// ! *******************************************************************

// ! Disabling old code for testing
// * On document load, run the "Run" function
// $(document).ready(function(){
//     console.log("On load");
//     run();
// });

// async function run(){
//     // * Once the program is running, we must load the models for recognition
//         // ? For recognition, we'll be using 2 models
//         // ? MTCNN (Multi-task Cascaded Convolutional Neural Network)
//         // ? Face Recognition Model
//         // ? Both of the models will load from the static files hosted on the server
//     await faceapi.loadMtcnnModel("/");                  // ? Loading MTCNN
//     await faceapi.loadFaceRecognitionModel("/");        // ? Loading recognition

//     // * Now we need access to the webcam
//     const videoElement = document.getElementById("inputVideo");     // ? Grab the video input
//     navigator.getUserMedia(
//         {video: {} },
//         stream => videoElement.srcObject = stream,
//         err => console.error(err)
//     );

//     const mtcnnForwardParams = {
//         // * The max scales
//             // ? The number of images for the input
//             // ? The more you have, the more accurate
//             // ? But the more you have, the slower it'll be
//         maxNumScales: 10,
//         //* Scaling the images
//         scaleFactor: 0.709,
//         // * Various score thresholds to be used during the detection scaling
//         scoreThresholds: [0.6, 0.7, 0.7],
//         // * Minimum face size
//             // ? This won't be able to detect smaller faces
//             // ? But this will not be able to detect smaller faces
//         minFaceSize: 200
//     };

//     const mtcnnResults = await faceapi.mtcnn(document.getElementById('inputVideo'), mtcnnForwardParams)

//     console.log("Testing");
//     console.log("mtcnn:" + mtcnnResults);
//     console.log(mtcnnResults)

//     console.log(Object.keys(faceapi));
//     console.log("Draw obj keys");
//     console.log(Object.keys(faceapi.draw));

//     faceapi.draw.drawDetections();

//      // * Drawing the detections
//      faceapi.drawDetection('overlay', mtcnnResults.map(res => res.faceDetection), { withScore: false })
//      faceapi.drawLandmarks('overlay', mtcnnResults.map(res => res.faceLandmarks), { lineWidth: 4, color: 'red' })
// };