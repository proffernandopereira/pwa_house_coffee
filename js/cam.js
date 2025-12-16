const startCameraButton = document.getElementById('startCamera');
const cameraFeed = document.getElementById('cameraFeed');
const photoCanvas = document.getElementById('photoCanvas');
const photoPreview = document.getElementById('photoPreview');
const takePhotoButton = document.getElementById('takePhoto');

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  startCameraButton.addEventListener('click', async () => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraFeed.srcObject = stream;
      cameraFeed.play();
      startCameraButton.style.display = 'none';
      takePhotoButton.style.display = 'block';
    } catch(error){
      console.error('Erro ao acessar a câmera:', error);
    }
  });

  takePhotoButton.addEventListener('click', () => {
    photoCanvas.width = cameraFeed.videoWidth;
    photoCanvas.height = cameraFeed.videoHeight;
    photoCanvas.getContext('2d').drawImage(cameraFeed, 0, 0);
    photoPreview.src = photoCanvas.toDataURL('image/png');
    photoPreview.style.display = 'block';
  });
} else {
  console.error('Seu navegador não suporta a API de mídia.');
}