import { useSelector } from "../../Constants";

const OrderSummary = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className=" to-pay">
      <div className="order-summary">
        <h4>ملخص طلباتي</h4>
      </div>
      <div dir="rtl" className="cart-body">
        <div className="col-f">
          <h6>مجموع سعر القطع</h6>
          <h6 id="subtotal">{cart.cartTotalAmount}₪</h6>
        </div>
        <div className="col-f">
          <h6> رسوم الشحن</h6>
          <h6>{cart.cartShipping}₪</h6>
        </div>
        <div className="col-f">
          <h6> خصم</h6>
          <h6>0₪</h6>
        </div>
      </div>
      <div dir="rtl" className="checkout">
        <div className="col-f">
          <h5>المجموع النهائي</h5>
          <h5 id="total">{cart.cartTotalAmount + + cart.cartShipping}₪</h5>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
