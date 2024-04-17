import Carousel from 'react-bootstrap/Carousel';
import { CarouselImages } from "../../Constants.js";
import './Hero.css';
const Hero = () => {
  return (
    <div className='hero '>
      <Carousel>
        {CarouselImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img src={image.src} alt={image.alt} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
