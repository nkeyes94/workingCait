// * Ensure the file is being read
console.log("The test file has been loaded.");

// * Document ready
$(document).ready(function(){

    // * Grabbing the webcam video.
    $input = $("#inputVideo");

    // * Grabbing the "run" button from the HTML
        // ? Note: In the future this will likely be replaced with the login function
    $runBtn = $("#btnOne");
    $runBtn.on("click", function(){
        console.log("Run button hit");
        run();
    })

    // * Creating the RUN function
        // ? Once the function has started, this will display the webcam video
    async function run(){
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        const videoEl = document.getElementById("inputVideo");
        videoEl.srcObject = stream;

        const options = getFaceDetectorOptions();
        const ts = Date.now();
        const result = await faceapi.detectSingleFace(videoEl, options);

        if(result){
            const canvas = $("#overlay").get(0);
            const dims = faceapi.matchDimensions(canvas, videoEl, true);
            faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
        }
    }
})