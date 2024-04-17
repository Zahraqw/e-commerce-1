import { products, ElasticCarousel, useParams } from "../Constants";
import CustomPaging from "../Components/CustomPaging/CustomPaging";
import DetailCard from "../Components/DetialCard/DetailCard";
const Detail = () => {
  const { id } = useParams();
  const product = products[id - 1];

  return (
    <div className="container">
      <div className="product-detail mt-4 mb-5">
        <div className="row">
          <div className="col-lg-8 col-sm-12 col-xs-12 ">
            <section className="image-detail">
              <CustomPaging
                secondaryImages={[product.image, ...product.secondaryImages]}
              />
            </section>

            <section className="description mt-5">
              <div className="headline">
                <h2>Description</h2>
              </div>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </section>
            <section className="technicalDetails mt-5">
              <div className="headline">
                <h2>Technical Details</h2>
              </div>
              <p>Product Dimensions: {product.dimensions}</p>
              <p>Product Weight: {product.weight}</p>
            </section>
          </div>
          <div className="col-lg-4 hidden-sm hidden-xs">
            <DetailCard product={product} />
          </div>
        </div>
      </div>
      <section className="relatedProduct">
        <div className="headline">
          <h2>Related Product</h2>
        </div>
        <ElasticCarousel slidesToShow={5} products={products} color="white" />
      </section>
    </div>
  );
};

export default Detail;
