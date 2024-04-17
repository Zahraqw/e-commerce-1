import React, { useState } from "react";
import {
  ProductCard,
  categories,
  priceQuantityRange,
  products,
} from "../Constants.js";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios, { all } from "axios";
import BASE_URL from "../Config.js";
import { Link, useNavigate } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
import EmptySrate from "../../src/Components/EmptyState/EmptyState.jsx";
import { ToastContainer } from "react-toastify";
import Error404 from "./Error404.jsx";
const AllItems = ({ isPOSPage }) => {
  const productStatus = ["all", "published", "not published", "restricted"];
  const productFeatures = ["all", "onSale", "New", "OnMost"];
  const productQuantity = [
    "all",
    "out of Stock",
    "low quantity",
    "high quantity",
    "retired",
  ];
  const perPageOptions = [
    { value: 1, label: "1" },
    { value: 4, label: "4" },
    { value: 12, label: "12" },
    { value: 16, label: "16" },
    { value: 20, label: "20" },
    { value: 24, label: "24" },
    { value: 28, label: "28" },
    { value: 32, label: "32" },
    { value: 36, label: "36" },
    { value: 40, label: "40" },
    { value: 44, label: "44" },
    { value: 48, label: "48" },
    { value: 52, label: "52" },
    { value: 56, label: "56" },
    { value: 60, label: "60" },
    { value: 64, label: "64" },
    { value: 68, label: "68" },
    { value: 72, label: "72" },
    { value: 76, label: "76" },
  ];
  const [productts, setProducts] = useState([]);
  const tableHeaders = [
    "#",
    "Order",
    "Image",
    "Name",
    "Category",
    "Total Quantity",
    "Primary/Discount Price",
    "All Prices",
    "Edit",
  ];

  // const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(perPageOptions[3].value);
  const [countOfAllProducts, setCountOfAllProducts] = useState(7);
  const totalPages = Math.ceil(countOfAllProducts / perPage);
  const navigate = useNavigate();
  const { register, control, handleSubmit, setValue } = useForm();

  const pageOptions = Array.from({ length: totalPages }, (_, index) => ({
    value: index + 1,
    label: (index + 1).toString(),
  }));
  const productStatusOption = productStatus.map((status, index) => ({
    value: index,
    label: status,
  }));
  const productFeaturesOption = productFeatures.map((status, index) => ({
    value: index,
    label: status,
  }));
  const productQuantityOption = productQuantity.map((status, index) => ({
    value: index,
    label: status,
  }));
  const handleSubcategoryChange = (selectedOptions) => {
    const selectedSubcategories = selectedOptions.map((option) => ({
      subcategory: option.label,
      category: option.category,
    }));
    handleChange("subcategories", selectedSubcategories);
  };

  const handleChange = async (fieldName, value) => {
    setPage(1);
    setValue(fieldName, value);
    handleSubmit(onSubmit)();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const fetchItems = async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/item/getItemsForAllItemsPage`,
        data,
        { withCredentials: true }
      );
      setItems(response?.data?.message?.items);
      setCountOfAllProducts(response?.data?.message?.countOfAllProducts);
      if (isPOSPage) {
        setProducts(response?.data?.message?.items);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const onSubmit = async (data) => {
    let firstIndex = (page - 1) * perPage;
    let lastIndex = page * perPage - 1;
    const modifiedData = {
      ...data,
      productStatus: data?.productStatus || "all",
      firstIndex: firstIndex,
      lastIndex: lastIndex,
    };
    console.log(modifiedData);
    fetchItems(modifiedData);
  };

  const isLogin = true;
  return (
    <div className="container newItem">
      <div className="headline my-5 ">
        <h2>All products on stores</h2>
      </div>
      {isLogin ? (
        <div className=" my-4">
          <form className="mb-2">
            <div className="row">
              <div className="col-md-6 mb-5">
                <label className="form-label " htmlFor="productName">
                  Product Name:
                </label>
                <input
                  className="form-control "
                  placeholder="Search..."
                  id="productName"
                  {...register("productName")}
                  onChange={(e) => handleChange("productName", e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-5">
                <label className="form-label " htmlFor="productBarcode">
                  Product Barcode:
                </label>
                <input
                  className="form-control "
                  placeholder="Search..."
                  id="productName"
                  {...register("productBarcode")}
                  onChange={(e) =>
                    handleChange("productBarcode", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-5 subcategories ">
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
                      options: category.subcategories.map(
                        (subcategory, index) => ({
                          value: index,
                          label: subcategory,
                          category: category.name,
                        })
                      ),
                    },
                  ])}
                  {...register("subcategories")}
                  onChange={handleSubcategoryChange}
                  placeholder="Select Subcategories"
                />
              </div>
              <div className="col-md-3 mb-5">
                <label className="form-label" htmlFor="productStatus">
                  Product status
                </label>
                <Select
                  id="productStatus"
                  className="custom-select"
                  options={productStatusOption}
                  defaultValue={productStatusOption[0]}
                  {...register("productStatus")}
                  onChange={(e) => handleChange("productStatus", e.label)}
                />
              </div>
              <div className="col-md-3 mb-4">
                <label className="form-label" htmlFor="productFeatures">
                  Product features
                </label>
                <Select
                  id="productStatus"
                  className="custom-select"
                  options={productFeaturesOption}
                  defaultValue={productFeaturesOption[0]}
                  {...register("productFeatures")}
                  onChange={(e) => handleChange("productFeatures", e.label)}
                />
              </div>
              <div className="col-md-3 mb-4">
                <label className="form-label" htmlFor="productQuantity">
                  Product Quantity Count
                </label>
                <Select
                  id="productQuantity"
                  className="custom-select"
                  options={productQuantityOption}
                  defaultValue={productQuantityOption[0]}
                  {...register("productQuantity")}
                  onChange={(e) => handleChange("productQuantity", e.label)}
                />
              </div>
            </div>
          </form>

          <label
            className="form-label"
            style={{ color: "var(--main-color)", fontWeight: "bold" }}
          >
            Count of all products: {countOfAllProducts || "0"}
          </label>
          <div
            className="table-responsive"
            style={{ fontWeight: "500", textAlign: "center" }}
          >
            <table className="table  table-bordered mt-1">
              <thead>
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((val, index) => (
                    <tr key={index} className="custom-row">
                      <td>{val.id}</td>
                      <td>{val.order}</td>
                      <td>
                        <img
                          style={{ width: "70px" }}
                          src={val.image}
                          alt={val.name}
                        />
                      </td>
                      <td>{val.name}</td>
                      <td className="custom-td">
                        <div className="d-flex flex-column justify-content-center ">
                          {val.subcategories.map((subcategories, index) => (
                            <p key={index}>
                              {subcategories.subcategory}&nbsp;-&nbsp;
                              {subcategories.category}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td>
                        {val?.storeDetails?.reduce(
                          (totalQty, store) => totalQty + (store?.qty || 0),
                          0
                        )}
                      </td>
                      <td>
                        {val.discountPrice ? (
                          <div className="d-flex justify-content-center  gap-3">
                            <span className="original-price  me-2">
                              {val.price0}₪
                            </span>
                            <span className="discount-price  me-2">
                              {val.discountPrice}₪
                            </span>
                          </div>
                        ) : (
                          <span className="original-price  me-2">
                            {val.price0}₪
                          </span>
                        )}
                      </td>
                      <td>
                        <table className="table-bordered w-100">
                          <thead>
                            <tr>
                              <th>Quantity</th>
                              <th>price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {priceQuantityRange.map((qty, index) => (
                              <tr>
                                <td>{qty}</td>
                                <td>{val[`price${index}`]}₪</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <Link
                          className=" col border-right icon-card"
                          to={`/updateItem/${val.id}`}
                        >
                          <button
                            className="submit"
                            style={{ padding: " 5px" }}
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Error404 />
      )}
    </div>
  );
};

export default AllItems;
