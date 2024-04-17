import ProductCard from "../ProductCard/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ElasticCarousel.css";
const ElasticCarousel = ({
  slidesToShow = 5,
  heading,
  products,
  color,
  rowCount = 1,
  flagSale = true,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: 0,
    rows: rowCount,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="ElasticCarousel" style={{ backgroundColor: color }}>
      <div className="main-heading">
        <h2>{heading}</h2>
      </div>
      <div className="container">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="p-3">
              <ProductCard product={product} flagSale={flagSale} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ElasticCarousel;
