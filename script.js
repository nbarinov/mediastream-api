var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var img = document.querySelector('img');
var snapshotButton = document.getElementById('snapshot');
var ctx = null;
var localMediaStream = null;

function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

var onFailSoHard = function (e) {
    console.log('Reeeejected!', e);
};

function snapshot() {
    if (localMediaStream) {
        ctx.drawImage(video, 0, 0, 640, 480);
        img.src = canvas.toDataURL('image/webp');
    }
}

if (hasGetUserMedia()) {
    navigator.getUserMedia({ video: true, audio: false }, function (stream) {
        video.srcObject = stream;
        localMediaStream = stream;

        video.onloadedmetadata = function (e) {
            img.width = e.target.videoWidth;
            img.height = e.target.videoHeight;
            canvas.width = e.target.videoWidth;
            canvas.height = e.target.videoHeight;

            ctx = canvas.getContext('2d');
        };
    }, onFailSoHard);

    snapshotButton.addEventListener('click', snapshot);
} else {
    alert('getUserMedia() is not supported in your browser');
}