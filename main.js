if (navigator.mediaDevices?.getUserMedia) {
    // getUserMedia is supported
    navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" }})
    .then((localMediaStream) => {
        const video = document.querySelector("video");
        video.onloadedmetadata = (e) => {
            video.play();
        };
        video.srcObject = localMediaStream;

        // Check if the torch constraint is supported
        const track = localMediaStream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        if (capabilities.torch) {
            track.applyConstraints({ advanced: [{ torch: true }] });
        } else {
            console.warn("Torch is not supported on this device/browser.");
        }

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
            video.style.display = "none";
        });
    })
    .catch((error) => {
        if (error.name === "NotReadableError") {
            console.error(`Camera is already in use or permission is denied. (${error})`);
        } else {
            console.error("Rejected!", error);
        }
    });
} else {
    alert("navigator.mediaDevices.getUserMedia() is not supported");
}