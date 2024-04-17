import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Order = ({
  totalPriceWithTax,
  setTotalPriceWithTax,
  TAX,
  setIncludeTax,
  includeTax,
}) => {
  const pos = useSelector((state) => state.pos);

  const [totalPrice, setTotalPrice] = useState();

  const [totalTax, setTotalTax] = useState();

  const handleTaxCheckboxChange = () => setIncludeTax(!includeTax);

  const updateTotalPrice = () => {
    let totalPrice = 0;
    pos.posItems.forEach((item) => {
      totalPrice += item.subtotal;
    });
    let totalPriceTax = totalPrice;
    totalPriceTax += includeTax ? totalPriceTax * TAX : 0;
    setTotalTax((totalPrice * TAX)?.toFixed(2));
    setTotalPrice(totalPrice?.toFixed(2));
    setTotalPriceWithTax(totalPriceTax?.toFixed(2));
  };

  useEffect(() => {
    updateTotalPrice();
  }, [pos, includeTax]);

  return (
    <div
      style={{ borderRadius: 0 }}
      className="d-flex pos-col justify-content-between order"
    >
      <div>
        <label className="d-flex align-items-center check-box-wrapper">
          <p className="total-text">Include Tax</p>
          <input
            type="checkbox"
            checked={includeTax}
            onChange={handleTaxCheckboxChange}
            className="custom mx-2"
          />
        </label>
      </div>
      <div className="d-flex flex-column">
        {includeTax && (
          <>
            <p className="mb-2">Total Without:&nbsp;&nbsp;{totalPrice}₪</p>
            <p className="mb-2">Tax:&nbsp;&nbsp;{totalTax}₪</p>
            <hr className="divider" />
          </>
        )}

        <p>Total:&nbsp;&nbsp;{totalPriceWithTax}₪</p>
      </div>
    </div>
  );
};

export default Order;
