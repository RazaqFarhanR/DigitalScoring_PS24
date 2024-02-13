import { useState } from 'react';

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <button onClick={toggleFullscreen}>
      {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </button>
  );
};

export default FullscreenButton;
