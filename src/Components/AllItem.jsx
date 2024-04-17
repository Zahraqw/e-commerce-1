import React, { useState } from "react";
import { ProductCard, categories, products } from "../Constants.js";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios, { all } from "axios";
import BASE_URL from "../Config.js";
import { useNavigate } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
import EmptySrate from "./EmptyState/EmptyState.jsx";
const AllItem = ({ ADD }) => {
  const productStatus = ["all", "published", "not published", "restricted"];
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

      setProducts(response?.data?.message?.items);
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

  return (
    <div>
      <form>
        <div>
          <label className="form-label " htmlFor="productName">
            Product Name:
          </label>
          <input
            className="form-control mb-4"
            type="text"
            placeholder="Search..."
            id="productName"
            {...register("productName")}
            onChange={(e) => handleChange("productName", e.target.value)}
          />
          <hr />
        </div>
        <div className="row">
          <div className="col-md-7 mb-4 subcategories ">
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
            />
          </div>
          <div className="col-md-5 mb-4">
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
        </div>
      </form>
      <label
        className="form-label mb-3"
        style={{ color: "var(--main-color)", fontWeight: "bold" }}
      >
        Count of all products: {countOfAllProducts || "0"}
      </label>
      {products?.length ? (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-6 mb-3">
              <ProductCard product={product} ADD={ADD} />
            </div>
          ))}
        </div>
      ) : (
        <EmptySrate />
      )}
    </div>
  );
};

export default AllItem;
