import * as yup from "yup";

const schema = yup.object().shape({
  // kitName: yup.string().required("* Kit name is required."),
  // price: yup
  //   .number()
  //   .required("* Price is required")
  //   .positive("* Price must be a positive number")
  //   .typeError("* Price must be a number"),
  // priceAfterDiscount: yup
  //   .number()
  //   .notRequired()
  //   .transform((curr, orig) => (orig === "" ? null : curr))
  //   .when("price", (price, schema) => {
  //     if (price !== undefined) {
  //       return schema
  //         .min(0, "* Price After Discount must be greater than or equal to 0")
  //         .max(
  //           price,
  //           "* Price After Discount must be less than or equal to the ordinary price"
  //         );
  //     }
  //     return schema;
  //   })
  //   .typeError("* Price must be a number"),
});

export default schema;
