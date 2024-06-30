import * as yup from "yup";

const schema = yup
  .object({
    salesMan: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

export default schema;
