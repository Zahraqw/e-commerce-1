import { useState,useDispatch,setShipping } from "../../Constants";
import Accordion from "react-bootstrap/Accordion";

const ShippingMethod = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const handleCheckboxChange = (event, key) => {
    const isChecked = event.target.checked;
    setSelectedOption(isChecked ? key : null);
    if (isChecked) dispatch(setShipping(event.target.value));
    else dispatch(setShipping(event.target.value));
  };

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header >
          <div className="bef befp">+</div>
          <div className="bef befm">-</div>
          استلام من معرض الشركة
        </Accordion.Header>
        <Accordion.Body>
          <input className="custom"
            type="checkbox"
            name="shippingOption"
            value={0}
            checked={selectedOption === "1"}
            onChange={(e) => handleCheckboxChange(e, "1")}
          />
          بواسطة هذه الخدمة تستطيع استلام طلبك من معرض الشركة فور تثبيت
          الطلب دون اي تكاليف اضافية

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header >
          <div className="bef befp">+</div>
          <div className="bef befm">-</div>
          شحن داخل مدينة نابلس
        </Accordion.Header>
        <Accordion.Body>
          التوصيل من خلال الدراجات النارية.
          <br />
          <input className="custom"
            type="checkbox"
            name="shippingOption"
            value={15}
            checked={selectedOption === "2"}
            onChange={(e) => handleCheckboxChange(e, "2")}
          />
          رسوم الشحن 15 شيكل

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header >
          <div className="bef befp">+</div>
          <div className="bef befm">-</div>
          شحن الى محافظات الضفة الاخرى
        </Accordion.Header>
        <Accordion.Body>
          التوصيل من خلال شركة تورنيدو للتوصيل  .
          <br />
          <input className="custom"
            type="checkbox"
            name="shippingOption"
            value={20}
            checked={selectedOption === "3"}
            onChange={(e) => handleCheckboxChange(e, "3")}
          />
          رسوم الشحن 20 شيكل

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header >
          <div className="bef befp">+</div>
          <div className="bef befm">-</div>
          شحن الى الداخل المحتل
        </Accordion.Header>
        <Accordion.Body>
          التوصيل من خلال شركة تورنيدو للتوصيل  .
          <br />  <input
            type="checkbox" className="custom"
            name="shippingOption"
            value={70}
            checked={selectedOption === "4"}
            onChange={(e) => handleCheckboxChange(e, "4")} />
          رسوم الشحن 70 شيكل

        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header >
          <div className="bef befp">+</div>
          <div className="bef befm">-</div>
          شحن الى القدس وضواحيها
        </Accordion.Header>
        <Accordion.Body>
          التوصيل من خلال شركة تورنيدو للتوصيل  .
          <br />  <input className="custom"
            type="checkbox"
            name="shippingOption"
            value={30}
            checked={selectedOption === "5"}
            onChange={(e) => handleCheckboxChange(e, "5")} />
          رسوم الشحن 30 شيكل

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default ShippingMethod