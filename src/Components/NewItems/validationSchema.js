// import * as yup from "yup";

// const validationSchema = yup.object().shape({
//   name: yup.string().required("* Product name is required."),
//   subcategories: yup
//     .array()
//     .required("* Please select at least one category.")
//     .min(1, "* Please select at least one category."),
//   price0: yup
//     .number()
//     .required("* Price is required")
//     .positive("* Price must be a positive number")
//     .typeError("* Price must be a number"),
//   price1: yup
//     .number()
//     .positive("* Price must be a positive number")
//     .typeError("* Price must be a number"),
//   price2: yup
//     .number()
//     .positive("* Price must be a positive number")
//     .typeError("* Price must be a number"),
//   price3: yup
//     .number()
//     .positive("* Price must be a positive number")
//     .typeError("* Price must be a number"),

//   priceAfterDiscount: yup
//     .number()
//     .notRequired()
//     .transform((curr, orig) => (orig === "" ? null : curr))
//     .when("price0", (price0, schema) => {
//       if (price0 !== undefined) {
//         return schema
//           .positive("* Price after discount must be a positive number")
//           .max(
//             price0,
//             "* Price after discount must be less than or equal main price"
//           );
//       }
//       return schema;
//     })
//     .typeError("Price must be a number"),
//   saleEndDate: yup
//     .date("* Invalid date format") // Custom error message for date format
//     .nullable("Sale end date cannot be null") // Custom error message for nullable
//     .transform((curr, orig) => (orig === "" ? null : curr))
//     .notRequired()
//     .min(
//       new Date().toISOString().slice(0, 10),
//       "* Discount end date must be greater than or equal to the current date"
//     ),
// });

// export default validationSchema;
