import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import Error404 from "./Error404";
import GeneralSection from "../Components/NewKits/GeneralSection";
import ImagesSection from "../Components/NewItems/ImagesSection";
import StoreSection from "../Components/NewKits/StoreSection";
import DescriptionSection from "../Components/NewItems/DescriptionSection";
import {
  useParams,
  useSelector,
  isLoginUser,
  productStatus,
} from "../Constants";

import schema from "../Components/NewKits/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import Cart from "../Components/PointOfSale/Cart";
import AllItem from "../Components/AllItem";
import TableOfItems from "../Components/PointOfSale/Cart/TableOfItems";
import { EmptyState } from "@procore/core-react";
import kitSlice from "../store/kitSlice";
const NewKit = ({ isUpdatepage }) => {
  const { id } = useParams();
  const isLogin = true;
  // *****************************************
  const kit = useSelector((state) => state.kit);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      kitStatus: productStatus[0],
      subcategories: [],
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  // const handleEndDate = () => {
  //   const discount = parseFloat(watch(`priceAfterDiscount`));
  //   const saleEndDate = watch("saleEndDate");

  // if (discount > 0 && !saleEndDate) {
  //   setError("saleEndDate", {
  //     type: "manual",
  //     message: "* Sale End Date is required",
  //   });
  //   return false;
  // } else {
  //   setError("saleEndDate", null);
  // }

  //   if (saleEndDate && isNaN(new Date(saleEndDate))) {
  //     setError("saleEndDate", {
  //       type: "manual",
  //       message: "* Invalid date format",
  //     });
  //     return false;
  //   } else {
  //     setError("saleEndDate", null);
  //   }
  //   return true;
  // };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    console.log("kit Product data:", kit.kitItems);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="container NewKit">
      {true ? (
        <div className="row my-4">
          <ToastContainer />
          <form onSubmit={handleSubmit(onSubmit)}>
            <GeneralSection
              register={register}
              errors={errors}
              control={control}
              setError={setError}
              setValue={setValue}
              handleKeyPress={handleKeyPress}
            />

            <ImagesSection
              register={register}
              errors={errors}
              setValue={setValue}
              handleKeyPress={handleKeyPress}
            />
            <DescriptionSection
              control={control}
              register={register}
              errors={errors}
              setValue={setValue}
              handleKeyPress={handleKeyPress}
            />
            <div className="storeDetails">
              <div className="headline">
                <h2>Products Kit Need</h2>
              </div>
            </div>
            <div className="row">
              <ToastContainer />
              <div className="col-lg-8 mb-3">
                <div className="pos-col py-5 px-3">
                  <div className="Cart">
                    <div>
                      <label className="form-label" htmlFor="productBarcode">
                        Product Barcode:
                      </label>
                      <input
                        className="form-control  mb-4"
                        type="text"
                        placeholder="Search..."
                        // value={searchTerm}
                        // onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                      />
                      <hr />
                    </div>
                    {kit.kitItems.length === 0 ? (
                      <EmptyState className="mt-5">
                        <EmptyState.NoItems />
                        <EmptyState.Title
                          style={{
                            fontSize: "25px",
                            fontWeight: "bold",
                            color: "#ff5100",
                          }}
                        >
                          Your Kit Product Empty
                        </EmptyState.Title>
                      </EmptyState>
                    ) : (
                      <StoreSection
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        handleKeyPress={handleKeyPress}
                        control={control}
                        watch={watch}
                      />
                    )}
                  </div>
                  <button type="submit" className="submit mb-4">
                    SAVE
                  </button>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div
                  className="pos-col py-5 px-3"
                  style={{ backgroundColor: "#fcfcfced" }}
                >
                  <AllItem ADD={"newKit"} />
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Error404 />
      )}
    </div>
  );
};

export default NewKit;
