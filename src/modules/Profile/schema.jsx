import * as yup from "yup";

export const schema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  userName:yup.string().required("Username is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  bod: yup.date().required("Date of Birth is required").nullable(),
  identification: yup.string().required("Identification is required"),
  dateRange: yup.date().required("Date Range is required").nullable(),
  issuedBy: yup.string().required("Issued By is required"),
  permanentAddress: yup.string().required(" Address is required"),
  // signatureUrl: yup.string().nullable(),
  // beforeIdentification: yup.string().nullable(),
  // afterIdentification: yup.string().nullable(),
  bankCode: yup.string().required("Bank Code is required"),
  accountNumber: yup.string().required("Account Number is required"),
  accountName: yup.string().required("Account Name is required"),


}).required();
