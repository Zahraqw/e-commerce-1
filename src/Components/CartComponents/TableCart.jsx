import {
  useSelector,
  useDispatch,
  Link,
  ChangeQuantityCart,
  removeFromCart,
} from "../../Constants";
import StateQuantity from "../ProductCard/stateQuantity";

const TableCart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div id="cart-info" className="cart-info">
      <table>
        <thead>
          <tr>
            <th colSpan="2">Products</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        {cart.cartItems.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan="6" style={{ border: "none", paddingTop: "50px" }}>
                <h2>No Items In The Cart</h2>
                <Link className="empty" to="/Products">
                  Continue Shopping
                </Link>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {cart.cartItems?.map((cartItem) => (
              <tr key={cartItem.id}>
                <td style={{ borderRight: "1px solid #fff" }}>
                  <img
                    style={{ width: "70px" }}
                    src={cartItem.image}
                    alt={cartItem.name}
                  />
                </td>
                <td>
                  <div className="productsTd">
                    <p> {cartItem.name}</p>
                    <StateQuantity product={cartItem} />
                  </div>

                  <div className="features ">
                    {cartItem?.onSale && <div className=" sale">SALE</div>}
                    {cartItem?.onNew && <div className=" new">New</div>}
                    {cartItem?.restricted && (
                      <div className=" restricted">Restricted</div>
                    )}
                    {cartItem?.quantity === 0 && (
                      <div className="label oos">Out of stock</div>
                    )}
                    {cartItem?.isRetired && (
                      <div className="label retired">Retired</div>
                    )}
                  </div>
                </td>
                <td>
                  {(cartItem.price || cartItem.salePrice) && (
                    <div className="d-flex justify-content-center flex-column gap-1">
                      {cartItem.salePrice && (
                        <span className="price-text ">
                          {cartItem.salePrice}₪
                        </span>
                      )}
                      {cartItem.price && (
                        <span
                          className={`price-text me-2 ${
                            cartItem.salePrice ? "discount-price" : ""
                          }`}
                        >
                          {cartItem.price}₪
                        </span>
                      )}
                    </div>
                  )}
                </td>
                <td>
                  <input
                    className="quantity-group"
                    min={1}
                    max={cartItem.quantity}
                    value={cartItem.cartQuantity}
                    onChange={(e) =>
                      dispatch(
                        ChangeQuantityCart({
                          id: cartItem.id,
                          newQuantity: +e.target.value,
                        })
                      )
                    }
                    type="number"
                  />
                </td>
                <td>
                  {(cartItem.topPrice * cartItem.cartQuantity).toFixed(2)}₪
                </td>
                <td>
                  <button
                    className="btn-remove "
                    onClick={() => dispatch(removeFromCart(cartItem))}
                  >
                    REMOVE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableCart;
