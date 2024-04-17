import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import BASE_URL from "../../Config2";
import { useDispatch } from "react-redux";
import { removeAllPos } from "../../store/posSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropZone from "../NewItems/DropZone";
import { fetchCustomers, selectCustomers } from "../../store/customersSlice";
import {
  fetchOrderStatus,
  selectOrderStatus,
} from "../../store/orderStatusSlice";
const InfoForm = ({ totalPriceWithTax, includeTax, TAX }) => {
  const dispatch = useDispatch();
  const customers = useSelector(selectCustomers);
  const orderStatus = useSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchOrderStatus());
  }, [dispatch]);

  const pos = useSelector((state) => state.pos);
  const [selectedOption, setSelectedOption] = useState(null);
  const customersOption = customers.map((status, index) => ({
    value: index,
    label: status.name,
  }));
  const orderStatusOption = orderStatus.map((status, index) => ({
    value: index,
    label: status.name,
  }));
  const handleOrderStatusChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (
      selectedOption.label === "PendingOrder" ||
      selectedOption.label === "OnDelivery"
    ) {
      setValue("amountPaid", 0);
      setValue("remaining", totalPriceWithTax);
    } else {
      setValue("amountPaid", totalPriceWithTax);
      setValue("remaining", 0);
    }

    setValue("orderStatus", selectedOption.label);
    clearErrors("orderStatus");
  };
  const handleCustomerNameChange = (selectedOption) => {
    if (selectedOption.value === 0) {
      setShowCustomInput(true);
      setValue("customerName", "");
    } else {
      setValue("customerName", selectedOption.label);

      clearErrors("customerName");
      setShowCustomInput(false);
    }
    setValue("customerPhone", customers[selectedOption.value].phone);
    setValue("customerAddress", customers[selectedOption.value].address);
  };

  const schema = yup.object().shape({
    customerName: yup.string().required("* Customer name is required."),
    orderStatus: yup.string().required("* Order Status is required."),

    customerPhone: yup.string().when("orderStatus", {
      is: (orderStatus) => orderStatus === "OnDelivery",
      then: () =>
        yup
          .string()
          .matches(/^[0-9+]{10,}$/, "* Please enter correct number")
          .required("* Phone number is required "),
      otherwise: () =>
        yup
          .string()
          .matches(/^[0-9+]{10,}$/, "* Please enter correct number")
          .notRequired(),
    }),
    customerAddress: yup.string().when("orderStatus", {
      is: (orderStatus) => orderStatus === "OnDelivery",
      then: () => yup.string().required("* Address is required "),
      otherwise: () => yup.string().notRequired(),
    }),
    receipt: yup.mixed().when("orderStatus", {
      is: (orderStatus) => ["Visa", "Bank transfer"].includes(orderStatus),
      then: () =>
        yup
          .mixed()
          .required(
            "* Receipt image is required when using Visa or Bank transfer"
          ),
      otherwise: () => yup.mixed().notRequired(),
    }),
  });

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      customerName: "",
      orderStatus: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [showCustomInput, setShowCustomInput] = useState(false);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  const onSubmit = async (data) => {
    const hasZeroQuantity = pos.posItems.some((item) => item?.qty === 0);
    if (hasZeroQuantity) {
      toast.error("Quantity must be greater than 0 for all items.");
      return;
    }
    const itemsInInvoiceDtoList = pos.posItems.map((item) => ({
      itemId: item?.id,
      itemName: item?.name,
      quantity: item?.qty,
      storeName: item?.store.name,
      discountPrice: item?.discountPrice,
      topPrice: item?.topPrice,
      price0: item?.price0.toFixed,
      price1: item?.price1,
      price2: item?.price2,
      price3: item?.price3,
      paidPrice: item?.orderPrice,
    }));
    let originalPrice = 0;
    pos.posItems.forEach((item) => {
      if (item?.qty < 5) originalPrice += item?.price0 * item?.qty;
      else if (item?.qty < 10) originalPrice += item?.price1 * item?.qty;
      else if (item?.qty < 21) originalPrice += item?.price2 * item?.qty;
      else originalPrice += item?.price3 * item?.qty;
    });
    originalPrice += includeTax ? originalPrice * TAX : 0;
    const transactionData = {
      isTaxIncluded: includeTax,
      note: data?.notes,
      customerName: data?.customerName,
      customerPhone: data?.customerPhone,
      customerAddress: data?.customerAddress,
      paymentStatus: selectedOption.label,
      amountPaid: data?.amountPaid,
      remaining: data?.remaining,
      totalOriginalPrice: originalPrice,
      totalPaidPrice: totalPriceWithTax,
      itemsInInvoiceDtoList,
      // receipt: data?.receipt,
    };
    console.log(transactionData);
    // console.log(data);
    try {
      const response = await axios.post(
        `${BASE_URL}/transaction/newTransaction`,
        transactionData,
        {
          withCredentials: true,
        }
      );
      if (response?.data?.status === "success") {
        toast.success(response.data.message);
        dispatch(removeAllPos());
        // allItemsRef.current.onSubmit();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setSelectedOption(null);

    setValue("orderStatus", "");
    // setValue("remaining", 0);
  }, [totalPriceWithTax, orderStatus, setValue]);

  return (
    <form
      className="pos-col py-4"
      style={{ borderRadius: 0 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="row">
        {!showCustomInput && (
          <div className="form-group col-md-4 mb-2">
            <label className="form-label " htmlFor="customerName">
              Choose a client:
            </label>

            <Select
              className="custom-select"
              options={customersOption}
              placeholder="name of client..."
              onChange={handleCustomerNameChange}
            />

            <p className="text-danger error-message">
              {errors.customerName?.message}
            </p>
          </div>
        )}
        {showCustomInput && (
          <div className="form-group col-md-4 mb-2">
            <FontAwesomeIcon
              style={{ color: "var(--main-color", paddingRight: "7px" }}
              className="link"
              icon="fa-solid fa-angles-left"
              onClick={() => setShowCustomInput(false)}
            />
            <label className="form-label" htmlFor="customerName">
              Enter client name:
            </label>

            <input
              type="text"
              className="form-control "
              {...register("customerName")}
            />
            <p className="text-danger error-message mt-1">
              {errors.customerName?.message}
            </p>
          </div>
        )}

        <div className="form-group col-md-4  mb-2">
          <label className="form-label " htmlFor="customerPhone">
            Phone:
          </label>

          <input
            type="text"
            className="form-control "
            placeholder="Client phone number ..."
            {...register("customerPhone")}
          />
          <p className="text-danger error-message mt-1">
            {errors.customerPhone?.message}
          </p>
        </div>
        <div className="form-group col-md-4  mb-2">
          <label className="form-label" htmlFor="customerAddress">
            Address:
          </label>

          <input
            type="address"
            className="form-control "
            placeholder="Client Address ..."
            {...register("customerAddress")}
          />
          <p className="text-danger error-message mt-1">
            {errors.customerAddress?.message}
          </p>
        </div>
      </div>
      <hr style={{ color: "green" }} className="mb-4" />
      <div className="form-group row mb-4">
        <label className="form-label col-md-2" htmlFor="orderStatus">
          Order Status:
        </label>
        <div className="col-md-10">
          <Select
            className="custom-select"
            options={orderStatusOption}
            placeholder="type of order..."
            value={selectedOption}
            onChange={handleOrderStatusChange}
          />

          <p className="text-danger error-message">
            {errors.orderStatus?.message}
          </p>
        </div>
      </div>
      {(watch("orderStatus") === "Debit" ||
        watch("orderStatus") === "OnDelivery" ||
        watch("orderStatus") === "PendingOrder") && (
        <div className="row mb-2">
          <div className="form-group col-md-6  mb-4">
            <label className="form-label " htmlFor="amountPaid">
              amount paid:
            </label>

            <input
              id="amountPaid"
              type="number"
              step={0.01}
              className="form-control"
              {...register("amountPaid")}
            />
          </div>
          <div className="form-group col-md-6  mb-4">
            <label className="form-label " htmlFor="remaining">
              remaining amount
            </label>
            <input
              id="remaining"
              type="number"
              readOnly
              value={(totalPriceWithTax - watch("amountPaid")).toFixed(2)}
              {...register("remaining")}
              className="form-control"
            />
          </div>
          <hr />
        </div>
      )}
      {(watch("orderStatus") === "Visa" ||
        watch("orderStatus") === "Bank transfer") && (
        <div className="row mb-2">
          <div className="form-group col-md-12  mb-4">
            <label className="form-label mb-2 " htmlFor="receipt">
              receipt image :
            </label>
            <DropZone
              tit="Drag & drop Image here"
              multiple={false}
              register={register("receipt")}
              handleKeyPress={handleKeyPress}
              setValue={setValue}
            />
            <p className="text-danger error-message mt-1">
              {errors.receipt?.message}
            </p>
          </div>
          <hr />
        </div>
      )}
      <div className="form-group row mb-4">
        <label className="form-label col-md-2" htmlFor="notes">
          Notes:
        </label>
        <div className="col-md-10">
          <textarea className="form-control" {...register("notes")} />
        </div>
      </div>
      <div className="d-flex gap-4">
        <Button
          onClick={() => dispatch(removeAllPos())}
          variant="danger"
          className="w-50"
          style={{ fontWeight: "bold", fontSize: "large" }}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          type="submit"
          className="w-50"
          style={{ fontWeight: "bold", fontSize: "large" }}
        >
          Check Out
        </Button>
      </div>
    </form>
  );
};

export default InfoForm;
