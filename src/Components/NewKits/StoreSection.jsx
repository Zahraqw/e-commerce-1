import {
  useSelector,
  useDispatch,
  Link,
  ChangeQuantityCart,
  removeFromCart,
  products,
  Stores,
  FontAwesomeIcon,
  OverlayTrigger,
  Tooltip,
  useState,
  priceQuantityRange,
} from "../../Constants";
import StateQuantity from "../ProductCard/stateQuantity";
import ConfirmModal from "../../Components/PointOfSale/Cart/ConfirmModal";

import {
  ChangeOrderPriceKit,
  ChangeQuantityKit,
  ChangeStoreKit,
  removeFromKit,
} from "../../store/kitSlice";
import { useEffect } from "react";

const StoreSection = ({
  register,
  errors,
  setValue,
  handleKeyPress,
  isUpdatepage,
  control,
  watch,
  id,
  reset,
}) => {
  const [totalKit, setTotalKit] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const kit = useSelector((state) => state.kit);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleConfirmOperation = () => {
    dispatch(removeFromKit(itemToDelete));
    setShowModal(false);
  };

  const handleDelete = (index) => {
    setItemToDelete(index);
    setShowModal(true);
  };

  useEffect(() => {
    let total = 0;
    if (kit.kitItems) {
      kit.kitItems.forEach((item) => {
        total += item.subtotal;
      });
      setTotalPrice(total?.toFixed(2));

      // Assuming kit.kitItems is an array of items
      const newTotal = Math.min(
        ...kit.kitItems.map((item) => Math.floor(item.store.qty / item.qty))
      );
      setTotalKit(newTotal);
    } else {
      setTotalKit(0);
    }
  }, [kit]);

  return (
    <div className="storeDetails">
      <div className="headline">
        <h2>Quantity Details</h2>
      </div>
      <div className="table-responsive mb-4">
        <table
          style={{ textAlign: "center", fontWeight: "500" }}
          className=" table-bordered "
        >
          <thead>
            <tr>
              <td colSpan="2">Products</td>
              <td>Store</td>
              <td>Price/ Discount</td>
              <td>Order Price</td>
              <td>Quantity per kit </td>
              <td>SubTotal</td>
              <td>Availabe kit</td>
              <td></td>
            </tr>
          </thead>

          <tbody>
            {kit.kitItems?.map((item, index) => (
              <tr key={index}>
                <td style={{ borderRight: "1px solid #fff" }}>
                  <img
                    style={{ width: "60px" }}
                    src={item.image}
                    alt={item.name}
                  />
                </td>
                <td>
                  <div style={{ textAlign: "left" }} className="productsTd">
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">{item.name}</Tooltip>
                      }
                    >
                      <h6 className="product-name p-0 m-0">{item.name}</h6>
                    </OverlayTrigger>
                    <p className="d-flex" style={{ color: "#777" }}>
                      Total Quantity:
                      {item?.storeDetails?.reduce(
                        (totalQty, store) => totalQty + (store?.qty || 0),
                        0
                      )}
                    </p>
                    <StateQuantity product={item} />
                    <div className="features ">
                      {item?.onSale && <div className=" sale">SALE</div>}
                      {item?.onNew && <div className=" new">New</div>}
                      {item.status?.restricted && (
                        <div className=" restricted">Restricted</div>
                      )}
                      {item?.totalQuantity === 0 && (
                        <div className="label oos">Out of stock</div>
                      )}
                      {item?.retire && (
                        <div className="label retired">Retired</div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="my-2">
                    <select
                      dir="rtl"
                      style={{ fontSize: "13px", fontWeight: "bold" }}
                      className="custom-select p-1"
                      value={item.store.name}
                      onChange={(e) =>
                        dispatch(
                          ChangeStoreKit({ index, newStatus: e.target.value })
                        )
                      }
                    >
                      {item.storeDetails?.map((option, index) => (
                        <option value={option.name} key={index}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p style={{ color: "#888" }}>Quantity: {item.store.qty} </p>
                  {item.store.qty > 0 ? (
                    <p style={{ color: "#888" }}>
                      position: {item.store.unit + item.store.x + item.store.y}
                    </p>
                  ) : (
                    <p style={{ color: "#888" }}>position:null</p>
                  )}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2 mt-2">
                    {item.topPrice > item.discountPrice ? (
                      <>
                        {item.topPrice && (
                          <span
                            className={`price-text me-2 ${
                              item.discountPrice
                                ? "discount-price"
                                : "original-price"
                            }`}
                          >
                            {item.topPrice}₪
                          </span>
                        )}
                        {item.discountPrice && (
                          <span className="original-price ">
                            {item.discountPrice}₪
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        {item.discountPrice && (
                          <span
                            className={`price-text me-2 ${
                              item.discountPrice ? "discount-price" : ""
                            }`}
                          >
                            {item.discountPrice}₪
                          </span>
                        )}
                        {item.topPrice && (
                          <span className="original-price ">
                            {item.topPrice}₪
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div
                    className="mt-2"
                    style={{ fontSize: "13px", borderTop: "1px solid #eee" }}
                  >
                    {priceQuantityRange.map((qty, index) => (
                      <p key={index}>
                        {qty} : {item[`price${index}`]}₪
                      </p>
                    ))}
                  </div>
                </td>

                <td>
                  <input
                    className="quantity-group"
                    type="number"
                    style={{ width: "70px" }}
                    value={item?.orderPrice}
                    onChange={(e) =>
                      dispatch(
                        ChangeOrderPriceKit({
                          index,
                          newOrderPrice: +e.target.value,
                        })
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    style={{ width: "70px" }}
                    className="quantity-group "
                    type="number"
                    min={0}
                    value={item?.qty}
                    onChange={(e) =>
                      dispatch(
                        ChangeQuantityKit({
                          index,
                          newQty: +e.target.value,
                          item,
                        })
                      )
                    }
                  />
                </td>

                <td>{item.subtotal.toFixed(2)}₪</td>
                <td>{Math.floor(item.store.qty / item.qty)}</td>
                <td>
                  <FontAwesomeIcon
                    style={{ fontSize: "larger" }}
                    className="btn btn-danger p-2"
                    icon="fa-solid fa-trash"
                    onClick={() => handleDelete(index)}
                  />
                </td>
              </tr>
            ))}

            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  color: "#198754",
                  fontSize: "larger",
                }}
                colSpan={6}
              >
                Total Kit we can have = {totalKit}
              </td>
              <td
                style={{
                  fontWeight: "bold",
                  color: "#198754",
                  fontSize: "larger",
                }}
                colSpan={3}
              >
                Total = {totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
        <ConfirmModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={() => handleConfirmOperation()}
          operation="delete"
        />
      </div>
    </div>
  );
};

export default StoreSection;
