import { ToastContainer, toast } from "react-toastify";
import {
  Stores,
  Modal,
  Form,
  useState,
  useForm,
  Controller,
} from "../../Constants";
import BASE_URL from "../../Config";
import axios from "axios";
const MoveQtyForm = ({
  show,
  handleClose,
  storesDetails,
  itemId,
  fetchItemById,
  handleKeyPress,
}) => {
  const { handleSubmit, control, setValue, watch } = useForm();
  const [error, setError] = useState("");
  const handleQuantityChange = (e) => {
    const quantity = e.target.value;
    setValue("quantity", quantity);

    const selectedItem = storesDetails?.find(
      (item) => item.storeName === watch("SourceStore")
    );

    if (quantity > 0) {
      if (quantity <= selectedItem?.qty) {
        setError("");
      } else {
        setError(
          `* The Source Store have ${selectedItem?.qty} item as a max quantity`
        );
      }
    } else {
      setError("* The quantity should be positive");
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    setValue("quantity", "");
    if (data?.quantity > 0) {
      try {
        const formData = new FormData();
        formData.append("itemId", itemId);
        formData.append("sourceStoreName", data?.SourceStore);
        formData.append("destinationStoreName", data?.DestinationStore);
        formData.append("qty", data?.quantity);
        const response = await axios.put(
          `${BASE_URL}/item/moveBetweenStores`,
          formData,
          {
            withCredentials: true,
          }
        );
        if (response?.data?.status === "success") {
          await fetchItemById(itemId, setValue);
          toast.success(`the items moved successfully`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      handleClose();
    }
  };

  return (
    <Modal className="MoveQty" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "var(--main-color)" }}>
          Move Between Stores
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="fromItems" className="mb-3">
            <Form.Label>Source Store :</Form.Label>
            <Controller
              name="SourceStore"
              id="SourceStore"
              control={control}
              defaultValue={Stores[0]}
              render={({ field }) => (
                <select dir="rtl" className="form-control" {...field}>
                  {Stores?.map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            />
          </Form.Group>

          <Form.Group controlId="toItems" className="mb-3 ">
            <Form.Label>Destination Store :</Form.Label>
            <Controller
              name="DestinationStore"
              control={control}
              defaultValue={Stores[1]}
              render={({ field }) => (
                <select dir="rtl" className="form-control" {...field}>
                  {Stores?.map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            />
          </Form.Group>

          <Form.Group controlId="quantity" className="mb-3">
            <Form.Label>Quantity : </Form.Label>
            <Controller
              name="quantity"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Form.Control
                  type="text"
                  className="form-control"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleQuantityChange(e);
                  }}
                  onKeyPress={handleKeyPress}
                />
              )}
            />
            {error && <p className="text-danger error-message">{error}</p>}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button
              className="submit mb-4"
              type="submit"
              disabled={error !== ""}
            >
              Submit
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MoveQtyForm;
