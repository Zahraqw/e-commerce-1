import { useEffect, useState, Controller } from "../../Constants.js";
const PriceSection = ({
  register,
  setError,
  errors,
  control,
  setValue,
  watch,
  handleKeyPress,
}) => {
  const saleEndDate = watch("saleEndDate");
  const handlePriceAfterDiscountChange = (e) => {
    const value = e.target.value;
    if (value > 0 && !saleEndDate) {
      setError("saleEndDate", {
        type: "manual",
        message: "* Sale End Date is required",
      });
    } else {
      setError("saleEndDate", null);
    }
  };

  return (
    <div>
      <div className="headline">
        <h2>Price Information</h2>
      </div>
      <div className="row priceInformation">
        <div className="col-lg-6 mb-4 form-group">
          <label className="form-label" htmlFor="price">
            Ordinary Price:
          </label>
          <input
            className="form-control "
            type="number"
            defaultValue={0}
            id="price"
            min="0"
            step="0.01"
            {...register("price")}
            onWheel={(e) => e.currentTarget.blur()}
            onKeyPress={handleKeyPress}
          />
          <p className="text-danger error-message">{errors.price?.message}</p>
        </div>
        <div className="col-lg-6 mb-4 form-group">
          <label className="form-label " htmlFor="priceAfterDiscount">
            Price After Discount
          </label>
          <input
            className="form-control"
            id="priceAfterDiscount"
            type="number"
            defaultValue={null}
            min="0"
            step="0.1"
            onWheel={(e) => e.currentTarget.blur()}
            {...register("priceAfterDiscount")}
            onKeyPress={handleKeyPress}
            onChange={handlePriceAfterDiscountChange}
          />

          <p className="text-danger error-message">
            {errors.priceAfterDiscount?.message}
          </p>
        </div>
        <div className="col-lg-6 mb-4 form-group">
          <label style={{ visibility: "hidden" }}>Hide price for public</label>
          <div className="form-control hide">
            <label htmlFor="hidePrice">Hide price for public </label>
            <input
              id="hidePrice"
              className="custom mx-2"
              type="checkbox"
              {...register("hidePrice")}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        <div className="col-lg-6 mb-4 form-group">
          <label className=" form-label " htmlFor="saleEndDate">
            Discount end date
          </label>
          <input
            className="form-control"
            id="saleEndDate"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            {...register("saleEndDate")}
            onKeyPress={handleKeyPress}
          />
          <p className="text-danger error-message">
            {errors.saleEndDate?.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceSection;
