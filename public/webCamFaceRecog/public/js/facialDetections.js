// * Pulling in our different face detection models

    // * SSD_MOBILENET
    // ? SSD Mobile net seems to be the quickest and most accurate thus far
const SSD_MOBILENETV1 = "ssd_mobilenetv1";

    // * Tiny face detector
    // ? This net is fast, but not as accurate as SSD
const TINY_FACE_DETECTOR = "tiny_face_detector";

    // * MTCNN
    // ? Multi-Tasking Convolutional Neural Network
const MTCNN = "mtcnn";

// * Configuration for the SSD Mobile Net
// ? Setting the minimum confidence for the net
    // ? Anything below 50% won't be rendered
    // ? This can be adjusted as needed
        // ! For our project an 80% confidence perhaps would be best
let minConfidence = 0.5;

// * Tiny Face Options
// ? Setting the input size and the confidence
    // ? The input size is for scaling of the image, 512 is pretty standard for this net
    // ? Score threshhold is the net confidence, can be adjusted if needed
        // ! For our project an 80% confidence perhaps would be best
let inputSize = 512;
let scoreThreshold = 0.5;

// * MTCNN Options
// ? Since most of the confidences/inputs/etc are baked into the NN, it just needs a size
    // ? Setting the minimum size to 20.
let minFaceSize = 20;

// * Pulling our options and creating new facial detetors with them
    // ? If the currently selected face detector is SSD MBNV1
        // ? Create a new face detector with the SSD options from above
        // ? Otherwise detect which net to use and apply the options
function getFaceDetectorOptions(){
    return selectedFaceDetector == SSD_MOBILENETV1
        ? new faceapi.SsdMobilenetv1Options({ minConfidence })
        :(
            selectedFaceDetector == TINY_FACE_DETECTOR
                ? new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
                : new faceapi.MtcnnOptions({ minFaceSize })
        )
}

// * Function for rounding the confidence on increase.
    // ? This function will take the confidence and round it up to the nearest tenth
    // ? After rounding, it will return the updated results
function onIncreaseMinConfidence(){
    minConfidence = Math.min(faceapi.round(minConfidence + 0.1), 1.0);
    updateResults();
};

// * Function for rounding the confidence on decrease
    // ? This function will take the confidence and round it down to the nearest tenth
    // ? After rounding it will return the updated results
function onDecreaseMinConfidence() {
    minConfidence = Math.max(faceapi.round(minConfidence - 0.1), 0.1);
    updateResults();
};

// * Function for updating the input size
function onInputSizeChanged(e){
    changeInputSize(e.target.value);
    updateResults();
};

// * Function for changing the input size
function changeInputSize(size){
    inputSize = parseInt(size);

    const inputSizeSelect = $("#inputSize");
    inputSizeSelect.val(inputSize);
    inputSizeSelect.material_select();
};

// * Function for rounding the threshhold (confidence for Tiny Face) upon increase
    // ? This function will take the confidence and round it up to the nearest tenth
    // ? After rounding, it will return the updated results
function onIncreaseScoreThreshold(){
    scoreThreshold = Math.min(faceapi.round(scoreThreshold + 0.1), 1.0);
    $("#scoreThreshold").val(scoreThreshold);
    updateResults();
}

// * Function for rounding the threshold (confidence or Tiny Face) down upon decrease
    // ? This function will take the confidence and round it down to then earest tenth
    // ? After rounding, it will return the updated results
function onDecreaseScoreThreshold(){
    scoreThreshold = Math.max(faceapi.round(scoreThreshold - 0.1), 0.1);
    $("#scoreThreshold").val(scoreThreshold);
    updateResults();
};

// * Function for rounding the min face size (for MTCNN)
    // ? This function will take the face size and round it up
    // ? After rounding, it will return the updated results
function onIncreaseMinFaceSize(){
    minFaceSize = Math.min(faceapi.round(minFaceSize + 20), 300);
    $("#minFaceSize").val(minFaceSize);
};

// * Function for rounding the min face size down (for MTCNN)
    // ? This function will round the min face size down
    // ? After rounding, it will return the updated results
function onDecreaseMinFaceSize() {
    minFaceSize = Math.max(faceapi.round(minFaceSize - 20), 50);
    $("#minFaceDize").val(minFaceSize);
};

// *********************************************************************
// TODO:                Scripts for the actual recognition
// *********************************************************************

async function loadRecognition() {
    const videoEl = $("#videoInput");
    const canvas = $("#overlay");

    const fullFaceDescriptors = await faceapi
        .detectAllFaced(videoEl, getFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors()

    if(!fullFaceDescriptors.length){
        return
    };

    // * Creating a FaceMatcher
        // ? The face matcher will load labels (if a ref image is used)
    faceMatcher = new faceapi.faceMatcher(fullFaceDescriptors);

    faceapi.matchDimensions(canvas, videoEl);

    // * Resizing the images to match landmarks
        // ! This is necessary.
        // ? If the original image doesn't match the detected size, it will resize to match
    const resizedResults = faceapi.resizeResults(fullFaceDescriptors, videoEl);

    // * This will draw detection boxes with label (if image used)
    const labels = faceMatcher.labledDescriptors
        .map(ld => ld.label);
    resizedResults.forEach(({ detection, descriptor }) =>  {
        const label = faceMatcher.findBestMatch(descriptor).toString()
        const options = { label }
        const drawBox = new faceapi.draw.DrawBox(detection.box, options);
        drawBox.draw(canvas);
    })
}

