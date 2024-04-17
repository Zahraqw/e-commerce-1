import Slider from "react-slick";
import "./CustomPaging.css";
const CustomPaging = ({ secondaryImages }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            style={{ borderRadius: "10px" }}
            src={secondaryImages[i]}
            alt="imageDetail"
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        {secondaryImages.map((image, index) => (
          <div className="basic" key={index}>
            <img
              style={{ borderRadius: "10px", border: "2px solid #777" }}
              src={image}
              alt="imageDetail"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomPaging;
