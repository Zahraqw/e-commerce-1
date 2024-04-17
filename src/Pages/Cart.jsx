import { Breadcrumb } from "../Constants";
import JsonFile from "../Components/CartComponents/JsonFile";
import PngFile from "../Components/CartComponents/PngFile";
import TableCart from "../Components/CartComponents/TableCart";
import OrderSummary from "../Components/CartComponents/OrderSummary";
import FormCart from "../Components/CartComponents/FormCart";
import "../Components/CartComponents/cart.css";
import ShippingMethod from "../Components/CartComponents/ShippingMethod";

const Cart = () => {
  return (
    <div className="container">
      <div className="pt-4 cart-head">
        <Breadcrumb
          Category="Home"
          CategoryLink="/"
          SubCategory="Shop"
          SubCategoryLink="/products"
          Data="Cart"
        />
        <div>
          <PngFile />
          <JsonFile />
        </div>
      </div>
      <section id="capture" className="cart row ">
        <div className="col-lg-9 my-4">
          <TableCart />
        </div>
        <div className=" col-lg-3 my-4">
          <OrderSummary />
        </div>
      </section>
      <section
        className="row mb-5 mt-2"
        style={{ border: "solid 1px #e6e6e6" }}
      >
        <br />
        <div dir="rtl" className="col-md-6 ">
          <h4 className="head">وسيلة الشحن :</h4>
          <ShippingMethod />
        </div>
        <div dir="rtl" className="col-md-6 form-cart">
          <h4 className="head"> المعلومات الشخصية :</h4>
          <FormCart />
        </div>
      </section>
    </div>
  );
};

export default Cart;
