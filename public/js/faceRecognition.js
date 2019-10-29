// * Notes before use:
    // ? In order to use the facial recognition, it requires that there is a reference image to draw detections from
        // ! For best results, use 3 reference images
    // ? The name of the reference image MUST match the name in the "labels" array

// * Document ready function
$(document).ready(function(){
    faceapi.onload = function() { loadModels() }
    loadModels().then(function(){
        var inVid = document.getElementById("inputVideo");
        onPlay(inVid);
    })
});

var ssdLoaded = false;
var landMarkLoaded = false;
var recognitionLoaded = false;

// * Grabbing the video element
var videoEl = document.getElementById("inputVideo");

// * Need a function to load our models
async function loadModels(){
    const models = "./webCamFaceRecog/weights";
    console.log("Loading models from " + models);

    await faceapi.loadSsdMobilenetv1Model(models).then(function(){
        ssdLoaded = true;
        console.log("SSD Loaded");
    })
    await faceapi.loadFaceLandmarkModel(models).then(function(){
        landMarkLoaded = true;
        console.log("Landmark model loaded")
    })
    await faceapi.loadFaceRecognitionModel(models).then(function(){
        recognitionLoaded = true;
        console.log("Recognition model loaded")
    })

    navigator.getUserMedia(
        { video:{} },
        stream => videoEl.srcObject = stream,
        err => console.error(err)
    );
};

// * Function for facial recognition
async function run() {
    const mtcnnResults = await faceapi.ssdMobilenetv1(videoEl);
    overlay.width = 680;
    overlay.height = 480;
    const detectionsForSize = mtcnnResults.map(det => det.forSize(680, 480));

    const fullFaceDescriptions = await faceapi
        .detectAllFaces(videoEl)
        .withFaceLandmarks()
        .withFaceDescriptors();

    // * This is an array of labels for detection
        // ? The label name(s) must match those in the ../images dir
        // ? If the name doesn't match, or isn't in the arr, the detection will come back unknown()
    const labels = ["Nathan1", "Rick1"];

    const labeledFaceDescriptors = await Promise.all(
        labels.map(async label => {
            // * This is the location of images for detection
            const imgUrl = `images/Nathan/${label}.png`;
            const img = await faceapi.fetchImage(imgUrl);

            // * Now we detect the facial features of the img
            const fullFaceDescription = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if(!fullFaceDescription) {
                throw new Error(`no faces detected for ${label}`);
            }

            const faceDescriptors = [fullFaceDescription.descriptor];
            return new faceapi.LabeledFaceDescriptors(label, faceDescriptors);
        })
    )

    const maxDescriptorDistance = 0.6;
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance);
    const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor));

    const boxesWithText = results.map((bestMatch, i) =>{
        const box = fullFaceDescriptions[i].detection.box;
        const text = bestMatch.toString();
        console.log(text);
        const boxWithText = new faceapi.boxWithText(box, text);
        return boxWithText;
    })
    faceapi.drawDetection(overlay, boxesWithText);
}

async function onPlay(videoEl){
    run();
    setTimeout(() => onPlay(videoEl));
};