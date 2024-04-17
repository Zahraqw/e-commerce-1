import React, { useEffect } from "react";
import { products } from "../Constants";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
const Transactions = () => {
  const itemsInInvoiceListHeaders = [
    "Item",
    "Item Name",
    "Quantity",
    "Original Price",
    "Paid Price",
    "Total Original Price",
    "Total Paid Price",
  ];
  const orderStatus = [
    "all",
    "OnCash",
    "OnDelivery",
    "Debit",
    "PendingOrder",
    "Visa",
    "Bank transfer",
    "Delivered",
  ];
  const orderStatusOption = orderStatus.map((status, index) => ({
    value: index,
    label: status,
  }));
  const handleOrderStatusChange = (selectedOption) => {
    setValue2("orderStatus", selectedOption.label);
  };

  const schema2 = yup.object().shape({
    customerName: yup.string().required("* Customer name is required."),

    customerPhone: yup
      .string()
      .matches(/^[0-9+]*$/, "*Please enter only numeric characters")
      .notRequired(),
  });
  const schema = yup.object().shape({
    dateFrom: yup.date().required("* Date From is required."),
    dateTo: yup.date().required("* Date To is required."),
  });
  const {
    control: control1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
    getValues: getValues1,
    setValue: setValue1,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit1 = (data) => {
    console.log("Form 1 data:", data);
  };
  const {
    register: register2,
    setValue: setValue2,
    handleSubmit: handleSubmit2,
    clearErrors,
    formState: { errors: errors2 },
  } = useForm({
    defaultValues: {
      customerName: "",
      orderStatus: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });
  const onSubmit2 = (data) => {
    console.log("Form 2 data:", data);
  };
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString();
    return formattedDate;
  };

  useEffect(() => {
    const currentDate = new Date();
    setValue1("dateFrom", currentDate);
    setValue1("dateTo", currentDate);
  }, []);
  return (
    <div className="container">
      <div className="headline my-5 ">
        <h2>Transactions on stores</h2>
      </div>
      <form onSubmit={handleSubmit1(onSubmit1)} className="mt-3 pos-col">
        <div className="row ">
          <div className="form-group col-md-4 mb-4">
            <label className="form-label">Date From:</label>
            <Controller
              control={control1}
              name="dateFrom"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  className="form-control"
                />
              )}
            />
            <p className="text-danger error-message">
              {errors1.dateFrom?.message}
            </p>
          </div>
          <div className="form-group col-md-4 mb-4">
            <label className="form-label">Date To:</label>
            <Controller
              control={control1}
              name="dateTo"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  className="form-control"
                />
              )}
            />
            <p className="text-danger error-message">
              {errors1.dateTo?.message}
            </p>
          </div>
          <div className="form-group col-md-4 mb-4">
            <label className="form-label">Created By:</label>
            <Controller
              control={control1}
              defaultValue=""
              name="createdBy"
              render={({ field }) => (
                <input {...field} className="form-control" />
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6 mb-4">
            <label className="form-label">Product Name:</label>
            <Controller
              control={control1}
              name="productName"
              defaultValue=""
              render={({ field }) => (
                <input {...field} className="form-control" />
              )}
            />
          </div>
          <div className="form-group col-md-6 mb-4">
            <label className="form-label">Customer Name:</label>
            <Controller
              control={control1}
              name="customerName"
              defaultValue=""
              render={({ field }) => (
                <input {...field} className="form-control" />
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6 mb-4">
            <label className="form-label">Note:</label>
            <Controller
              control={control1}
              name="note"
              render={({ field }) => (
                <input {...field} className="form-control" />
              )}
            />
          </div>
          <div className="form-group col-md-6 mb-4">
            <label className="form-label" htmlFor="orderStatus">
              Order Status:
            </label>

            <Select
              className="custom-select"
              options={orderStatusOption}
              placeholder="type of order..."
              onChange={handleOrderStatusChange}
            />

            <p className="text-danger error-message">
              {errors1.orderStatus?.message}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-secondary w-100 mb-2"
          disabled={Object.keys(errors1).length > 0}
        >
          Search
        </button>
      </form>

      <div
        className="pos-col d-flex align-items-start justify-content-between my-4"
        style={{ fontWeight: "500" }}
      >
        <div className="d-flex flex-column  justify-content-center align-items-center">
          <p> cash : 5₪ </p>
          <p> e-payment : 9₪ </p>
          <p>Total : 14₪</p>
        </div>
        <div>Grant Total : 33₪</div>
        <div className="d-flex flex-column  justify-content-center align-items-center">
          <p> On Delivery : 5₪ </p>
          <p> Debit : 5₪ </p>
          <p> pending Order : 9₪ </p>
          <p>Total Other Payment methods : 19₪</p>
        </div>
      </div>
      <div style={{ color: "var(--main-color)", fontWeight: "bold" }}>
        Number of Transactions:5
      </div>
      <form onSubmit={handleSubmit2(onSubmit2)}>
        <div className="table-responsive mt-3" style={{ textAlign: "center" }}>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> #</th>
                <th>Original Total Price</th>
                <th>Paid Total Price </th>
                <th>Tax</th>
                <th>Note</th>
                <th>Client</th>
                <th>Order Status</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{5}</td>
                <td>{300}</td>
                <td>{0}</td>
                <td>{false ? "Yes" : "No"}</td>
                <td>
                  <textarea
                    className="form-control"
                    {...register2("notes")}
                    style={{ minHeight: "100px" }}
                  />
                </td>
                <td>
                  <div>
                    <div className="d-flex gap-2 justify-content-between  mb-1">
                      <p>name:</p>
                      <input type="text" {...register2("customerName")} />
                    </div>
                    <p className="text-danger" style={{ fontSize: "12px" }}>
                      {errors2.customerName?.message}
                    </p>
                    <div className="d-flex gap-2 justify-content-between mb-1">
                      <p>phone:</p>
                      <input type="text" {...register2("customerPhone")} />
                    </div>
                    <p className="text-danger" style={{ fontSize: "12px" }}>
                      {errors2.customerPhone?.message}
                    </p>
                    <div className="d-flex gap-2 justify-content-between justify-content-between mb-1">
                      <p>address:</p>
                      <input type="address" {...register2("customerAddress")} />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex flex-column align-items-center">
                    <p>On Delivery</p>
                    <p>Amount&nbsp;Paid : 0</p>
                    <p>Remaining&nbsp;Amount:&nbsp;300</p>
                    <div>
                      <label className="d-flex align-items-center check-box-wrapper">
                        <p className="total-text">Done</p>
                        <input type="checkbox" className="custom mx-2" />
                      </label>
                    </div>
                  </div>
                </td>
                <td>{"createdBy"}</td>
                <td>{"createdAt)"}</td>
                <td>
                  <div className=" my-1 d-flex gap-2">
                    <Button type="submit" variant="success">
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      // onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </Button>
                  </div>

                  {
                    //role === "ROLE_ADMIN" && (
                    // )
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default Transactions;
