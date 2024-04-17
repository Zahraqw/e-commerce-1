import { FontAwesomeIcon, Link } from '../../Constants';
import domtoimage from 'dom-to-image';
import { useNavigate } from "react-router-dom";
const PngFile = () => {
  const navigate = useNavigate();
  const takeImage = () => {
    const captureElement = document.querySelector("#capture");
    if (!captureElement) {
      console.error("Element with ID 'capture' not found");
      return;
    }
    const scale = 4    
    const style = {
        transform: 'scale('+scale+')',
        transformOrigin: 'top left',
        width: captureElement.offsetWidth + "px",
         height: captureElement.offsetHeight + "px"
    }
    
    const param = {
         height: captureElement.offsetHeight * scale,
         width: captureElement.offsetWidth * scale,
          quality: 1,
         style
    }
    
    domtoimage.toPng(captureElement,param)
      .then((dataUrl) => {
        navigate(`/myCartImage/${encodeURIComponent(dataUrl)}`);
      })
      .catch(error => {
        console.error("Error capturing image:", error);
      });
  };

  return (

    <FontAwesomeIcon className="csv" onClick={takeImage} title="Take a screenshot of my cart information." icon="fa-solid fa-camera-retro" />

  );
};

export default PngFile;
