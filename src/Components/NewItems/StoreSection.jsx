import MoveQtyForm from "./MoveQtyForm";
import {
  storeDetailsHeader,
  storeDetailsData,
  useSelector,
  user,
  useState,
  useEffect,
  Controller,
} from "../../Constants.js";
import axios from "axios";
import BASE_URL from "../../Config";
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
  const userInfo = useSelector(user);
  const [showMoveQtyForm, setShowMoveQtyForm] = useState(false);
  const handleMoveQtyFormShow = () => setShowMoveQtyForm(true);
  const handleMoveQtyFormClose = () => setShowMoveQtyForm(false);
  const [totalStockQty, setTotalStockQty] = useState(0);
  const [totalThreshold, setTotalThreshold] = useState(0);
  const [tableHeader, setTableHeader] = useState(storeDetailsHeader);
  const [storesDetails, setStoresDetails] = useState(storeDetailsData);
  const stockQtyValues = watch(
    storesDetails?.map((_, index) => `storeDetails[${index}].qty`)
  );
  const ThresholdValues = watch(
    storesDetails?.map((_, index) => `storeDetails[${index}].threshold`)
  );
  const fetchItemById = async (itemId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/item/getItemById?itemId=${itemId}`,
        { withCredentials: true }
      );

      if (response?.data?.status === "success") {
        reset({
          storeDetails: response?.data?.message?.storeDetails,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (isUpdatepage) {
      setTableHeader([
        { id: "addToStock", name: "Add To Stock" },
        ...storeDetailsHeader,
      ]);
    }
  }, [isUpdatepage]);

  useEffect(() => {
    if (storesDetails) {
      const newTotalStockQty = stockQtyValues?.reduce(
        (acc, value) => acc + parseFloat(value) || 0,
        0
      );
      setTotalStockQty(newTotalStockQty);
    } else {
      setTotalStockQty(0);
    }
  }, [stockQtyValues, storesDetails]);

  useEffect(() => {
    if (storesDetails) {
      const newTotalThreshold = ThresholdValues?.reduce(
        (acc, value) => acc + parseFloat(value) || 0,
        0
      );
      setTotalThreshold(newTotalThreshold);
    } else {
      setTotalThreshold(0);
    }
  }, [ThresholdValues, storesDetails]);

  return (
    <div className="storeDetails">
      <div className="headline">
        <h2>Store Details</h2>
      </div>
      <div className="table-responsive mb-4">
        <table
          style={{ textAlign: "center" }}
          className="table table-striped table-bordered table-hover"
        >
          <thead>
            <tr>
              {tableHeader?.map((item, index) => (
                <th key={index} style={{ color: item.color }}>
                  {item?.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {storesDetails?.map((rowData, index) => (
              <tr key={index}>
                {tableHeader?.map((header) => (
                  <td key={header.id}>
                    {header.id === "addToStock" && isUpdatepage ? (
                      <div className="d-flex">
                        <input
                          name="addToStock"
                          type="number"
                          {...register("addToStockNumber")}
                          className="form-control me-2 quantity-group"
                          onKeyPress={handleKeyPress}
                        />
                        <button
                          type="button"
                          className="btn btn-secondary"
                          disabled={userInfo?.roles[0] !== "ROLE_ADMIN"}
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <Controller
                        name={`storeDetails[${index}].${header.id}`}
                        control={control}
                        defaultValue={rowData[header.id]}
                        render={({ field }) =>
                          header.id !== "name" ? (
                            <>
                              <input
                                {...field}
                                className="form-control quantity-group"
                                style={{ margin: "auto" }}
                                id={`stores[${index}].${header.id}`}
                                type={
                                  header.id === "qty" ||
                                  header.id === "threshold"
                                    ? "number"
                                    : "text"
                                }
                                min={
                                  header.id === "qty" ||
                                  header.id === "threshold"
                                    ? "0"
                                    : ""
                                }
                                onWheel={(e) => e.currentTarget.blur()}
                                readOnly={isUpdatepage && header.id === "qty"}
                                onKeyPress={handleKeyPress}
                              />
                              {errors?.storeDetails?.[index]?.[header.id] && (
                                <p
                                  className="text-danger"
                                  style={{ fontSize: "13px" }}
                                >
                                  {
                                    errors.storeDetails[index][header.id]
                                      .message
                                  }
                                </p>
                              )}
                            </>
                          ) : (
                            rowData[header.id]
                          )
                        }
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ fontWeight: "bold" }}>
              {isUpdatepage && <td></td>}
              <td></td>
              <td style={{ color: "#6118b5" }}>
                Total Quantity : {totalStockQty}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ color: "#cd7406" }}>
                Total Threshold : {totalThreshold}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isUpdatepage && (
        <button
          className="btn btn-secondary w-100 mb-4"
          type="button"
          onClick={handleMoveQtyFormShow}
        >
          Move between stores
        </button>
      )}
      <MoveQtyForm
        show={showMoveQtyForm}
        handleClose={handleMoveQtyFormClose}
        storesDetails={storesDetails}
        itemId={id}
        fetchItemById={fetchItemById}
        handleKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default StoreSection;
