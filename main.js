if (navigator.mediaDevices?.getUserMedia) {
    // getUserMedia is supported
    navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment", torch: true }})
    .then((localMediaStream) => {
        const video = document.querySelector("video");
        video.srcObject = localMediaStream;
        video.onloadedmetadata = (e) => {
            video.play();
        };

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        document.body.appendChild(canvas);

        function processFrame() {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const frame = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = frame.data;

            // Process the frame data to search for arteries
            // This is a placeholder for the actual artery detection algorithm
            // For example, you could use image processing techniques to detect red color regions

            requestAnimationFrame(processFrame);
        }

        video.addEventListener('play', () => {
            processFrame();
        });

        video.style.display = "none";
    })
    .catch((error) => {
        console.log("Rejected!", error);
    });
} else {
    alert("navigator.mediaDevices.getUserMedia() is not supported");
}

/*var camfile = document.getElementById('camfile');
camfile.addEventListener('change', function() {
    var file = camfile.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var img = new Image();
        img.src = e.target.result;
        document.body.appendChild(img);
    };
    reader.readAsDataURL(file);
});*/