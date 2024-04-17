import {
  Yup,
  useFormik,
  useRef,
  Form,
  Modal,
  useSelector,
  useState,
  FontAwesomeIcon,
} from "../../Constants";

const FormCat = () => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const cart = useSelector((state) => state.cart);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      address2: "",
      img: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Invalid phone number")
        .required("Required"),
      address: Yup.string().required("Required"),
      address2: Yup.string().required("Required"),
      img: Yup.mixed().test(
        "isImage",
        "Please upload a valid image file",
        function (value) {
          if (!value) return true; // Allow empty field

          // Check if 'type' property exists before calling 'startsWith'
          return value && value.type && value.type.startsWith("image/");
        }
      ),
    }),
    onSubmit: (values) => {
      setShowOrderModal(true);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="fieldset">
      <Form.Group className="group">
        <FontAwesomeIcon icon="fa-user" />
        <Form.Control
          placeholder="الاسم"
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
      </Form.Group>
      <Form.Text className="text-danger mb-3">
        {formik.touched.name && formik.errors.name ? (
          <div className="text-danger">* {formik.errors.name}</div>
        ) : null}
      </Form.Text>
      <Form.Group className="group">
        <FontAwesomeIcon icon="fa-envelope" />
        <Form.Control
          placeholder="الايميل"
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </Form.Group>
      <Form.Text className="text-danger mb-3">
        {formik.touched.email && formik.errors.email ? (
          <div className="text-danger">* {formik.errors.email}</div>
        ) : null}
      </Form.Text>
      <Form.Group className="group">
        <FontAwesomeIcon icon="fa-phone" />
        <Form.Control
          dir="ltr"
          placeholder="05XXXXXXXX"
          type="tel"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
        />
      </Form.Group>
      <Form.Text className="text-danger mb-3">
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-danger">* {formik.errors.phone}</div>
        ) : null}
      </Form.Text>

      <div className="row">
        <div className="col-md-6 mb-3">
          <Form.Group className="group ">
            <FontAwesomeIcon icon="fa-location" />
            <Form.Control
              placeholder="المحافظة "
              type="address"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
          </Form.Group>
          <Form.Text className="text-danger mb-3">
            {formik.touched.address && formik.errors.address ? (
              <div className="text-danger">* {formik.errors.address}</div>
            ) : null}
          </Form.Text>
        </div>
        <div className="col-md-6 mb-3">
          <Form.Group className="group">
            <FontAwesomeIcon icon="fa-location" />
            <Form.Control
              placeholder="القرية / المخيم/ الحي "
              type="address"
              name="address2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address2}
            />
          </Form.Group>
          <Form.Text className="text-danger ">
            {formik.touched.address2 && formik.errors.address2 ? (
              <div className="text-danger">* {formik.errors.address2}</div>
            ) : null}
          </Form.Text>
        </div>
      </div>

      <p style={{ fontSize: "15px", color: "#84601d" }}>
        يوجد منتج لديك لا يتم بيعه الا برفع صورة للكتاب من المؤسسة المسؤولة
      </p>

      <button className="submit my-3" type="submit" id="register">
        تثبيت الطلب
      </button>
      <Modal
        dir="rtl"
        show={showOrderModal}
        onHide={() => setShowOrderModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <h1 style={{ flex: "1" }}>تأكيد الطلب</h1>
        </Modal.Header>
        <Modal.Body>
          <p>الإسم: &nbsp; {formik.values.name}</p>
          <p>رقم الجوال : &nbsp;{formik.values.phone}</p>
          <p>الايميل الخاص بك : &nbsp;{formik.values.email}</p>
          <p>
            العنوان : &nbsp;
            {formik.values.address + "/" + formik.values.address2}
          </p>
          <hr />
          <strong>
            وسيلة الشحن :{" "}
            {(() => {
              switch (cart.cartShipping) {
                case "15":
                  return "شحن داخل مدينة نابلس";
                case "20":
                  return " شحن الى محافظات الضفة الاخرى من خلال شركة تورنيدو للتوصيل";
                case "70":
                  return " شحن الى الداخل المحتل من خلال شركة تورنيدو للتوصيل";
                case "30":
                  return "شحن الى القدس وضواحيها من خلال شركة تورنيدو للتوصي";
                default:
                  return "استلام من معرض الشركة";
              }
            })()}
          </strong>

          <br />

          <strong>
            المجموع النهائي = {cart.cartTotalAmount + +cart.cartShipping}₪{" "}
          </strong>
          <hr></hr>
          <p style={{ color: "#777" }}>
            عند تأكيد الطلب سيتم إرسال ايميل يحتوي على تفاصيل طلبك والمعلومات
            التي تحتاجها{" "}
          </p>
          <br />
          <strong style={{ color: "red" }}>
            عند تأكيد الطلب لايمكن التراجع عن الطلب !
          </strong>
          <br />
          <br />
          <div
            dir="rtl"
            className="d-flex justify-content-center"
            style={{ fontSize: "14px" }}
          >
            <button className=" submit m-2  " type="submit" id="register">
              تأكيد الطلب <br />
              الدفع عند الإستلام
            </button>
            <button className="  submit m-2 p-3" type="submit" id="register">
              تأكيد الطلب <br /> الدفع عن طريق حوالة بنكية
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Form>
  );
};

export default FormCat;
