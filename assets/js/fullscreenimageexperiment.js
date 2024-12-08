function viewImageFullscreen(imageUrl) {
  console.log('viewImageFullscreen called with', imageUrl);
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

function offerFullScreen(imageUrl, containerId) {
  console.log('offerFullScreen called with', imageUrl, containerId);
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container with id "${containerId}" not found.`);
    return;
  }

  // Create the HTML for the fullscreen link
  const link = document.createElement('a');
  link.href = 'javascript:void(0);';
  link.onclick = () => {
    console.log('Link clicked, calling viewImageFullscreen...');
    viewImageFullscreen(imageUrl);
  };
  link.innerHTML = 'here';

  // Create the surrounding text
  const message = document.createElement('small');
  message.style.color = 'magenta';
  message.innerHTML =
    '(Click ';
  message.appendChild(link);
  message.innerHTML +=
    ' to show image in full screen mode, press ESC to return. Not recommended on phone or small tablet.)';

  // Append to the container
  const wrapper = document.createElement('i');
  wrapper.appendChild(message);
  container.appendChild(wrapper);
}
