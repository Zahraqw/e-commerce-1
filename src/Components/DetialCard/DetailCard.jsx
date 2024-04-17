import {
  FontAwesomeIcon,
  useDispatch,
  addToCart,
  Link,
  Alert,
  openLoginModal,
  setDescribe,
} from "../../Constants";
import { addToPos } from "../../store/posSlice";
import "./DetailCard.css";
const DetailCard = ({ product }) => {
  const dispatch = useDispatch();
  const handleOpenLoginModal = () => {
    dispatch(
      setDescribe(
        "In order to be notified when this item becomes available, you need to log in to your account."
      )
    );
    dispatch(openLoginModal());
  };
  return (
    <div className="details ">
      <h1 className="title">{product.name}</h1>
      <div className="Category">
        <strong>Category: </strong> {product.subcategories[0].category}
      </div>
      <div className="price">
        <h6 className="d-inline-block mb-0 text-primary">
          {product.onSale ? (
            <span>
              <del style={{ color: "gray" }}>{product.price0.toFixed(2)}₪</del>
              <span className="p-3" style={{ color: "#000", fontSize: "20px" }}>
                {product.discountPrice.toFixed(2)}₪
              </span>
            </span>
          ) : (
            <span style={{ color: "#000", fontSize: "18px" }}>
              {product.price0.toFixed(2)}₪
            </span>
          )}
        </h6>
      </div>
      <div className="productQuantityDiscounts">
        <table className="quantityDiscount">
          <tbody>
            <tr>
              <th className="discount-header">Qty</th>
              <th className="discount-header">Price</th>
            </tr>
            <tr className="discount-row">
              <td>1-4</td>
              <td>{product.price0}$</td>
            </tr>
            <tr className="discount-row">
              <td>5-9</td>
              <td>{product.price1}$</td>
            </tr>
            <tr className="discount-row">
              <td>10-20</td>
              <td>{product.price2}$</td>
            </tr>
            <tr className="discount-row">
              <td>20+</td>
              <td>{product.price3}$</td>
            </tr>
          </tbody>
        </table>
      </div>
      {product.retire ? (
        <Alert variant="danger">
          <Alert.Heading>
            <FontAwesomeIcon
              className="mx-2"
              icon="fa-solid fa-circle-exclamation"
            />
            Retired Product
          </Alert.Heading>
          <p className="mb-0">
            This product has been retired from our catalog and is no longer for
            sale. This page is made available for those looking for datasheets
            and the simply curious.
          </p>
        </Alert>
      ) : product.totalQuantity === 0 ? (
        <Alert variant="warning">
          <FontAwesomeIcon className="mx-2" icon="fa-clock" />
          <span className="mb-0">
            We expect this product will be available on{" "}
            {product.availabilityDate + "  "}
            <Link
              onClick={handleOpenLoginModal}
              title="Receive an email when this product returns to stock."
              className="notify-link"
            >
              Notify Me
            </Link>
          </span>
        </Alert>
      ) : (
        <div className="buttons">
          <button
            className="add-to-cart"
            onClick={
              true
                ? () => dispatch(addToPos(product))
                : () => dispatch(addToCart(product))
            }
          >
            <FontAwesomeIcon icon="fa fa-shopping-cart" />
            add to cart
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailCard;
