import {
  priceQuantityRange,
  useEffect,
  useState,
  Controller,
} from "../../Constants.js";
const PriceSection = ({
  register,
  setError,
  errors,
  control,
  setValue,
  watch,
  handleKeyPress,
}) => {
  const handlePriceChange = (index, value) => {
    for (let i = index; i < 4; i++) {
      setValue(`price${i}`, value || 0);
    }
  };

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
          <h5>Ordinary Price</h5>
          <div className="table-responsive">
            <table
              style={{ textAlign: "center", fontSize: "18px" }}
              className="table table-striped table-bordered table-hover"
            >
              <thead
                style={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <tr>
                  <td>Quantity</td>
                  <td>Price</td>
                </tr>
              </thead>
              <tbody>
                {priceQuantityRange?.map((rowData, index) => (
                  <tr key={index}>
                    <td> {rowData}</td>
                    <td>
                      <Controller
                        name={`price${index}`}
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="quantity-group"
                            type="number"
                            min={0}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              handlePriceChange(index, value);
                            }}
                            onKeyPress={handleKeyPress}
                          />
                        )}
                      />

                      <p style={{ fontSize: "14px" }} className="text-danger">
                        {errors[`price${index}`]?.message}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-6 mb-4 form-group">
          <h5>Discount Price</h5>
          <div className="saleSection row ">
            <div className="form-group">
              <label className="form-label " htmlFor="discountPrice">
                Price After Discount
              </label>
              <input
                className="form-control"
                id="discountPrice"
                type="number"
                defaultValue={null}
                min="0"
                step="0.1"
                onWheel={(e) => e.currentTarget.blur()}
                {...register("discountPrice")}
                onKeyPress={handleKeyPress}
                onChange={handlePriceAfterDiscountChange}
              />

              <p className="text-danger error-message">
                {errors.discountPrice?.message}
              </p>
            </div>
            <div className="form-group">
              <label className=" form-label " htmlFor="saleEndDate">
                Discount end date
              </label>
              <input
                className="form-control"
                id="saleEndDate"
                type="date"
                placeholder="MM/DD/YYYY"
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

        <div className="col-lg-6 mb-4 form-group">
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
      </div>
    </div>
  );
};

export default PriceSection;
