import React from "react";

function FaceVideo(props) {
  return (
    <div id="displayVideo">
      <video className="border border-success" id="inputVideo" autoPlay muted  width={640} height={480}></video>
      <canvas className="border border-success" id="overlay" width={640} height={480} ></canvas>
    </div>
  );
}

export default FaceVideo;


{/* <input type=button value=run id="btnOne"><br><br>

<video onloadedmetadata="onPlay(this)" id="inputVideo" autoplay muted  width="640" height="480" style=" border: 1px solid #ddd;"></video><br>
<canvas id="overlay" width="640" height="480" style="position:relative; top:-487px; border: 1px solid #ddd;" ></canvas><br> */}