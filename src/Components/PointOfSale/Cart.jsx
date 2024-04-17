import React, { useState } from "react";
import { EmptyState } from "@procore/core-react";
import "./pos.css";
import { toast } from "react-toastify";
import axios, { all } from "axios";
import BASE_URL from "../../Config";
import TableCart from "../CartComponents/TableCart";
import TableOfItems from "./Cart/TableOfItems";
import "./Cart/Cart.css";
import Order from "./Cart/Order";
import InfoForm from "./InfoForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Cart = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const dispatch = useDispatch();
  const pos = useSelector((state) => state.pos);
  // const [searchResults, setSearchResults] = useState([]);
  // const [listOfItems, setListOfItems] = useState([]);
  // const allItemsRef = useRef(null);
  const TAX = 0.16;
  const [includeTax, setIncludeTax] = useState(false);
  const [totalPriceWithTax, setTotalPriceWithTax] = useState();
  const handleSearch = async () => {
    try {
      let response;
      if (searchTerm.startsWith("TL")) {
        response = await axios.get(
          `${BASE_URL}/item/getItemByBarcode?barcode=${searchTerm}`,
          { withCredentials: true }
        );
      } else {
        const intValue = parseInt(searchTerm, 10);
        response = await axios.get(
          `${BASE_URL}/item/getItemById?itemId=${intValue}`,
          { withCredentials: true }
        );
      }
      if (response?.data?.status === "success") {
        const item = response?.data?.message;
        console.log(item);
        const mappedData = {
          discountPrice: item?.priceAfterDiscount,
          id: item?.id,
          imageName: item?.imageName,
          order: item?.order,
          orderPrice: item?.orderPrice,
          price: item?.price,
          productName: item?.productName,
          wholeSalePrice: item?.wholeSalePrice,
          itemStoreDetailsList: item?.itemStoreDetailsList,
        };
        // handleAddToCart(mappedData);
      } else {
        console.log("Response:", response.data);
        if (response?.data?.status === "fail") {
          toast.error("This item dose not exist");
        }
      }
    } catch (error) {
      toast.error("This item dose not exist");
    }
    setSearchTerm("");
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="Cart">
      <div>
        <label className="form-label" htmlFor="productBarcode">
          Product Barcode:
        </label>
        <input
          className="form-control  mb-4"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <hr />
      </div>
      {pos.posItems.length === 0 ? (
        <EmptyState className="mt-5">
          <EmptyState.NoItems />
          <EmptyState.Title
            style={{ fontSize: "25px", fontWeight: "bold", color: "#ff5100" }}
          >
            Your POS Cart Empty
          </EmptyState.Title>
        </EmptyState>
      ) : (
        <div>
          <TableOfItems />
          <Order
            totalPriceWithTax={totalPriceWithTax}
            setTotalPriceWithTax={setTotalPriceWithTax}
            TAX={TAX}
            includeTax={includeTax}
            setIncludeTax={setIncludeTax}
          />
          <InfoForm
            totalPriceWithTax={totalPriceWithTax}
            TAX={TAX}
            includeTax={includeTax}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;
