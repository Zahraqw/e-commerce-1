import {
  out,
  inn,
  retired,
  few,
  useDispatch,
  openStateModal,
} from "../../Constants";
const StateQuantity = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="state"
      title={
        product.retire
          ? "retired"
          : product.totalQuantity === 0
          ? "out of stock"
          : product.totalQuantity <= product.totalThreshold
          ? `few in stock`
          : "in stock"
      }
    >
      <div
        onClick={() => dispatch(openStateModal())}
        className={`stock ${
          product.retire
            ? "retired"
            : product.totalQuantity === 0
            ? "outStock"
            : product.totalQuantity <= product.totalThreshold
            ? "fewInStock"
            : "inStock"
        }`}
      >
        <img
          className="quantity"
          src={
            product.retire
              ? retired
              : product.totalQuantity === 0
              ? out
              : product.totalQuantity <= product.totalThreshold
              ? few
              : inn
          }
          alt="quantity"
        />
      </div>
      <span>{product?.subcategories[0].category}</span>
    </div>
  );
};

export default StateQuantity;
