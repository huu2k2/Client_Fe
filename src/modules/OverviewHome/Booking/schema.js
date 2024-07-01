import * as yup from "yup";

const schema = yup
  .object({
    salerName: yup.string().required(),
    salerPhone: yup.string().required(),
    company: yup.string().required(),
    customerName: yup.string().required(),
    dateView: yup.string().required(),
    note: yup.string().required(),
  })
  .required();

export default schema;
