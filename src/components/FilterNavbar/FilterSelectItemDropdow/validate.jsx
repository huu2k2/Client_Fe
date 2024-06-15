import * as yup from "yup";

export const schema = yup
  .object({
    address: yup.string().required(),
    distanceLookAt: yup.number().positive().integer().required(),
  })
  .required();
