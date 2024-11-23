if (navigator.mediaDevices?.getUserMedia) {
    // getUserMedia is supported
    navigator.mediaDevices
    .getUserMedia({ video: true})
    .then((localMediaStream) => {
      const video = document.querySelector("video");
      video.srcObject = localMediaStream;
    })
    .catch((error) => {
      console.log("No permission for video!", error);
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