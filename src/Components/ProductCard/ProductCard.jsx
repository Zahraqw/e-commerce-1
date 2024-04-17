import {
  OverlayTrigger,
  Tooltip,
  useSelector,
  isLoginUser,
  user,
  FontAwesomeIcon,
  Link,
  addToCart,
  useDispatch,
  openStateModal,
  openLoginModal,
  setDescribe,
  useState,
  useEffect,
} from "../../Constants";
import CountDown from "./CountDown";
import StateQuantity from "./stateQuantity";
import "./ProductCard.css";
import { addToPos } from "../../store/posSlice";
import { addToKit } from "../../store/kitSlice";
const ProductCard = ({ product, ADD }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => dispatch(addToCart(product));
  const handleOpenLoginModal = () => {
    dispatch(
      setDescribe(
        "In order to be notified when this item becomes available, you need to log in to your account."
      )
    );
    dispatch(openLoginModal());
  };

  const isLogin = useSelector(isLoginUser);
  const userInfo = useSelector(user);
  const {
    id,
    name,
    price0,
    discountPrice,
    restricted,
    image,
    onSale,
    totalQuantity,
    notAva,
    onNew,
    retire,
    saleEndDate,
    availabilityDate,
    storeDetails,
  } = product;
  const [position, setPosition] = useState("null");
  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      if (storeDetails[i].qty > 0) {
        setPosition(
          storeDetails[i].unit + storeDetails[i].x + storeDetails[i].y
        );
        return;
      }
    }
  }, [product]);
  return (
    <div
      key={id}
      className="product-card card h-100 text-center rounded-0"
      style={retire ? { opacity: 0.5 } : {}}
    >
      <Link to={`/detail/${id}`}>
        <div className="product-image d-flex align-items-center">
          <img alt="product" src={image} />
          <div className="labels ">
            {onSale && <div className="label sale">ON SALE</div>}
            {onNew && <div className="label new">New</div>}
            {totalQuantity === 0 && (
              <div className="label oos">Out of stock</div>
            )}
            {retire && <div className="label retired">Retired</div>}
            {restricted && <div className="label restricted">Restricted</div>}
          </div>
        </div>
      </Link>

      <div className="border-top p-0">
        {onSale && (
          <CountDown
            color="#b71540"
            title={`sale end at ${saleEndDate}`}
            futureDate={new Date(saleEndDate) - 2 * 60 * 60 * 1000}
            completionMessage="Sale End!"
          />
        )}
        {notAva ? (
          <CountDown
            color="#A1C542"
            title={`product available at ${availabilityDate}`}
            futureDate={new Date(availabilityDate) - 2 * 60 * 60 * 1000}
            completionMessage="product Now Available"
          />
        ) : (
          <span></span>
        )}
        <div className="py-2">
          <Link to={`/detail/${id}`}>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="button-tooltip-2">{name}</Tooltip>}
            >
              <h6 className="product-name px-1">{name}</h6>
            </OverlayTrigger>
          </Link>
          <StateQuantity product={product} />

          {(price0 || discountPrice) && (
            <div className="d-flex justify-content-center gap-3">
              {price0 && (
                <span
                  className={`price-text me-2 ${
                    discountPrice ? "discount-price" : "original-price"
                  }`}
                >
                  {price0}₪
                </span>
              )}
              {discountPrice && (
                <span className="price-text original-price">
                  {discountPrice}₪
                </span>
              )}
            </div>
          )}
          {isLogin && userInfo.roles[0] !== "ROLE_CUSTOMER" && (
            <div className="border-top mt-2 pt-2">
              <h6 style={{ color: "#777" }}>total quantity: {totalQuantity}</h6>
              <h6 style={{ color: "#888" }}> position: {position} </h6>
            </div>
          )}
        </div>
        <div className="border-top">
          <div className="row m-0 align-items-center">
            {retire ? (
              <strong
                onClick={() => dispatch(openStateModal())}
                className="col border-right icon-card"
              >
                Retired
              </strong>
            ) : totalQuantity === 0 ? (
              <div
                onClick={handleOpenLoginModal}
                title="Receive an email when this product returns to stock."
                className=" col border-right icon-card"
              >
                <div className="ic">
                  <FontAwesomeIcon icon="fa-bell" />
                </div>
                <h6 className="tex">Notify me</h6>
              </div>
            ) : (
              <Link
                className="col border-right icon-card"
                onClick={() => {
                  console.log(ADD);
                  if (ADD === "customer") handleAddToCart(product);
                  else if (ADD === "pos") dispatch(addToPos(product));
                  else if (ADD === "newKit") dispatch(addToKit(product));
                }}
              >
                <div className="ic">
                  <FontAwesomeIcon icon="fa-shopping-cart" />
                </div>
                <h6 className="tex">To cart</h6>
              </Link>
            )}
            {isLogin &&
              (userInfo?.roles[0] === "ROLE_SELLER" ||
                userInfo?.roles[0] === "ROLE_ADMIN") && (
                <Link
                  className=" col border-right icon-card"
                  to={`/updateItem/${id}`}
                >
                  <div className="ic">
                    <FontAwesomeIcon icon="fa-edit" />
                  </div>
                  <h6 className="tex">edit</h6>
                </Link>
              )}
            <Link className=" col border-right icon-card" to={`/detail/${id}`}>
              <div className="ic">
                <FontAwesomeIcon icon="fa-eye" />
              </div>
              <h6 className="tex">View</h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
