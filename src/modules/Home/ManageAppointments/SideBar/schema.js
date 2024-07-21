import { parse, isBefore } from 'date-fns';
import * as yup from "yup";
 

const schema = yup
  .object({
    fullName: yup.string().required("Tên đầy đủ là bắt buộc"),
    phoneNumber: yup.string()
    .required("Số điện thoại là bắt buộc")
    .matches(/^\d{10,11}$/, "Số điện thoại phải có 10 sô"),
    birthOfDay: yup.string().required("Ngày sinh là bắt buộc").test('is-before-today', 'Ngày sinh phải trước ngày hiện tại', value => {
      if (!value) return false;
      const birthDate = parse(value, 'yyyy-MM-dd', new Date());  
      return isBefore(birthDate, new Date());
    }),
    identification: yup.string()
    .required("Số chứng minh thư là bắt buộc"),
    dateRange: yup.string().required("Ngày hợp lệ là bắt buộc").test('is-before-today', 'Ngày cấp phải trước ngày hiện tại', value => {
      if (!value) return false;
      const birthDate = parse(value, 'yyyy-MM-dd', new Date());  
      return isBefore(birthDate, new Date());
    }),
    issuedBy: yup.string().required("Nơi cấp là bắt buộc"),
    permanentAddress: yup.string().required("Địa chỉ thường trú là bắt buộc"),
  
    // Thông tin căn hộ
    roomId: yup.string().required("ID phòng là bắt buộc"),
    houseAddress: yup.string().required("Địa chỉ căn hộ là bắt buộc"),
    rentalPrice: yup.string().required("Giá cho thuê là bắt buộc").test('is-valid-number', 'Giá cho thuê phải là số hợp lệ', value => {
      // Loại bỏ dấu chấm và kiểm tra xem chuỗi có phải là số hay không
      return /^\d+$/.test(value.replace(/\./g, ''));
    }),
    depositDate: yup.string().required("Ngày đặt cọc là bắt buộc"),
    depositAmount: yup.string().required("Số tiền cọc giữ phòng là bắt buộc") .test('is-valid-number', 'Số tiền cọc giữ phòng phải là số hợp lệ', value => {
      // Loại bỏ dấu chấm và kiểm tra xem chuỗi có phải là số hay không
      return /^\d+$/.test(value.replace(/\./g, ''));
    }),
    additionalDepositAmount: yup.string().required("Số tiền cọc bổ sung là bắt buộc") .test('is-valid-number', 'Số tiền cọc bổ sung phải là số hợp lệ', value => {
      // Loại bỏ dấu chấm và kiểm tra xem chuỗi có phải là số hay không
      return /^\d+$/.test(value.replace(/\./g, ''));
    }),
    depositPaymentDeadline: yup.string().required("Hạn thanh toán tiền cọc là bắt buộc"),
    rentalStartDate: yup.string().required("Ngày bắt đầu thuê là bắt buộc"),
    numberOfPeople: yup.string().required("Số người là bắt buộc").matches(/^\d+$/, "Số người phải là số"),
    numberOfVehicle: yup.string().required("Số xe là bắt buộc").matches(/^\d+$/, "Số xe phải là số"),
    chuongTrinhUuDai: yup.string(),
    note: yup.string() ,
    rentalTerm: yup.string().required("Thời hạn hợp đồng là bắt buộc"),
    commissionPolicyId:yup.string() 
  })
  .required();

export default schema;
