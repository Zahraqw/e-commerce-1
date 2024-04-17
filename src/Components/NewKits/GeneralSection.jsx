import { productStatus, categories } from "../../Constants.js";
import Select from "react-select";
import "./NewKits.css";
import "../NewItems/NewItems.css";
const GeneralSection = ({
  register,
  setError,
  errors,
  setValue,
  handleKeyPress,
}) => {
  const productStatusOption = productStatus.map((status, index) => ({
    value: index,
    label: status,
  }));

  const handleSubcategoryChange = (selectedOptions) => {
    const selectedSubcategories = selectedOptions.map((option) => ({
      subcategory: option.label,
      category: option.category,
    }));

    if (selectedSubcategories.length < 1) {
      setError("subcategories", {
        type: "manual",
        message: "* Please select at least one category.",
      });
    } else {
      setError("subcategories", null);
    }
    setValue("subcategories", selectedSubcategories);
  };
  const handleProductStatusChange = (selectedOption) => {
    setValue("kitStatus", selectedOption.label);
  };
  return (
    <div>
      <div className="headline">
        <h2>General Information</h2>
      </div>
      <div className="row generalInformation">
        <div className="col-md-8 mb-4 form-group">
          <label className="form-label" htmlFor="kitName">
            Kit Name:
          </label>
          <input
            className="form-control"
            id="kitName"
            {...register("kitName")}
            onKeyPress={handleKeyPress}
          />
          <p className="text-danger error-message">{errors.kitName?.message}</p>
        </div>

        <div className="col-md-4 mb-4 form-group">
          <label className="form-label" htmlFor="kitStatus">
            Kit status
          </label>
          <Select
            className="custom-select"
            options={productStatusOption}
            defaultValue={productStatusOption[0]}
            {...register("kitStatus")}
            onChange={handleProductStatusChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="col-md-6 mb-4 form-group">
          <label className="form-label" htmlFor="kitBarcode">
            Main Barcode
          </label>
          <input
            style={{ backgroundColor: "#eee" }}
            className="form-control"
            id="kitBarcode"
            {...register("kitBarcode")}
            readOnly
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="col-md-6 mb-4 form-group">
          <label className="form-label" htmlFor="kitSecondBarcode">
            Secondary Barcode:
          </label>
          <input
            className="form-control"
            id="kitSecondBarcode"
            {...register("kitSecondBarcode")}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="col-md-6 mb-4 form-group subcategories ">
          <label className="form-label" htmlFor="subcategories">
            Categories
          </label>
          <Select
            isMulti
            id="subcategories"
            className="custom-select"
            options={categories.flatMap((category) => [
              {
                label: category.name,
                options: category.subcategories.map((subcategory, index) => ({
                  value: index,
                  label: subcategory,
                  category: category.name,
                })),
              },
            ])}
            {...register("subcategories")}
            onChange={handleSubcategoryChange}
            placeholder="Select Subcategories"
            onKeyPress={handleKeyPress}
          />

          <p className="text-danger error-message">
            {errors.subcategories?.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralSection;
