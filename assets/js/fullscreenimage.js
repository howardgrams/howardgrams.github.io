function viewImageFullscreen(imageUrl) {
  // Create an image element dynamically
  const img = document.createElement('img');
  img.src = imageUrl;

  // Style the image to fill the screen
  img.style.position = 'absolute';
  img.style.top = 0;
  img.style.left = 0;
  img.style.width = '100vw'; // Make the image span the full width of the viewport
  img.style.height = '100vh'; // Make the image span the full height of the viewport
  img.style.objectFit = 'contain'; // Scales the image proportionally to fit within the screen, leaving blank space if needed.
  img.style.objectPosition = 'center'; // Center the image within the screen

  // Create a container for fullscreen
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.backgroundColor = 'black';
  container.style.zIndex = 1000;
  container.style.overflow = 'hidden';
  container.appendChild(img);

  // Add a persistent exit message
  const exitMessage = document.createElement('div');
  exitMessage.textContent = 'Press ESC to exit fullscreen.';
  exitMessage.style.position = 'absolute';
  exitMessage.style.bottom = '20px';
  exitMessage.style.left = '50%';
  exitMessage.style.transform = 'translateX(-50%)';
  exitMessage.style.color = 'white';
  exitMessage.style.fontSize = '16px';
  exitMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  exitMessage.style.padding = '10px 20px';
  exitMessage.style.borderRadius = '5px';
  exitMessage.style.pointerEvents = 'none';
  container.appendChild(exitMessage);

  // Add the container to the document
  document.body.appendChild(container);

  // Request fullscreen for the container
  if (container.requestFullscreen) {
    container.requestFullscreen();
  } else if (container.webkitRequestFullscreen) {
    container.webkitRequestFullscreen();
  } else if (container.mozRequestFullScreen) {
    container.mozRequestFullScreen();
  } else if (container.msRequestFullscreen) {
    container.msRequestFullscreen();
  }

  // Exit fullscreen and remove the container on ESC
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      document.body.removeChild(container);
    }
  });
}
