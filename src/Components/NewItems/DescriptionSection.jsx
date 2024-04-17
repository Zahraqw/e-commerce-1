import Editor from "./Editor";
const DescriptionSection = ({ control, register, handleKeyPress, errors }) => {
  return (
    <div>
      <div className="headline">
        <h2>Technical Details</h2>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4 form-group">
          <label className=" form-label " htmlFor="dimensions">
            product Dimensions
          </label>
          <input
            className="form-control"
            id="dimensions"
            {...register("dimensions")}
            onKeyPress={handleKeyPress}
          />
          <p className="text-danger error-message">
            {errors.dimensions?.message}
          </p>
        </div>
        <div className="col-md-6 mb-4 form-group">
          <label className=" form-label " htmlFor="weight">
            product Weight
          </label>
          <input
            className="form-control"
            id="weight"
            {...register("weight")}
            onKeyPress={handleKeyPress}
          />
          <p className="text-danger error-message">{errors.weight?.message}</p>
        </div>
      </div>

      <div className="headline">
        <h2>Description Details</h2>
      </div>
      <div className="row mb-4">
        <Editor control={control} name="description" />
      </div>
    </div>
  );
};

export default DescriptionSection;
