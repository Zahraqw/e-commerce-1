import {
  useSelector,
  useDispatch,
  FontAwesomeIcon,
  OverlayTrigger,
  Tooltip,
  useState,
  priceQuantityRange,
} from "../../../Constants";
import {
  ChangeOrderPricePos,
  ChangeQuantityPos,
  ChangeStorePos,
  removeFromPos,
} from "../../../store/posSlice.js";
import StateQuantity from "../../ProductCard/stateQuantity";
import ConfirmModal from "./ConfirmModal";

const TableOfItems = () => {
  const dispatch = useDispatch();
  const pos = useSelector((state) => state.pos);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleConfirmOperation = () => {
    dispatch(removeFromPos(itemToDelete));
    setShowModal(false);
  };

  const handleDelete = (index) => {
    setItemToDelete(index);
    setShowModal(true);
  };

  return (
    <div className="table-responsive mb-4 ">
      <table
        style={{ textAlign: "center", fontWeight: "500" }}
        className=" table-bordered"
      >
        <thead>
          <tr>
            <th colSpan="2">Products</th>
            <th>Store</th>
            <th>Price/ Discount</th>
            <th>Order Price</th>
            <th>Quantity</th>
            <th>SubTotal</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {pos.posItems?.map((item, index) => (
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
                        ChangeStorePos({ index, newStatus: e.target.value })
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
                      ChangeOrderPricePos({
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
                      ChangeQuantityPos({
                        index,
                        newQty: +e.target.value,
                        item,
                      })
                    )
                  }
                />
              </td>
              <td>{item.subtotal.toFixed(2)}₪</td>
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
        </tbody>
      </table>

      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleConfirmOperation()}
        operation="delete"
      />
    </div>
  );
};

export default TableOfItems;
