document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const markerDetector = new jsfeat.feature_detector.fast_corners(20);
    const url = "https://o365coloradoedu-my.sharepoint.com/:i:/g/personal/seho9177_colorado_edu/EYqztB_J3v1Hk2HFs5EjIlABBdSvym3J1fNMxpjEJ5jp6w?e=hDxPoc";

    function setupCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
                scanForMarker();
            })
            .catch(function (error) {
                console.error('Error accessing the camera', error);
            });
    }

    function scanForMarker() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Here you would add your custom logic to detect the AR marker
        // For demonstration, this is a placeholder for marker detection logic
        let detected = markerDetector.detect(imageData); // This is pseudo-code

        if (detected) {
            window.location.href = url; // Redirect if marker is detected
        } else {
            requestAnimationFrame(scanForMarker); // Keep scanning
        }
    }

    setupCamera();
});
