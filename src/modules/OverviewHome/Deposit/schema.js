import * as yup from "yup";

export const furnitureSchema = yup.object({
  furnitureId: yup.number().required("ID nội thất là bắt buộc"),
  price: yup.number().required("Giá nội thất là bắt buộc").positive("Giá nội thất phải là số dương"),
  note: yup.string().required("Ghi chú là bắt buộc"),
  name: yup.string().required("Tên nội thất là bắt buộc"),
  status: yup.string().required("Trạng thái là bắt buộc"),
  isActived: yup.boolean().required("Trạng thái kích hoạt là bắt buộc"),
});

export const serviceSchema = yup.object({
  serviceId: yup.number().required("ID dịch vụ là bắt buộc"),
  servicePrice: yup.number().required("Giá dịch vụ là bắt buộc").positive("Giá dịch vụ phải là số dương"),
  dvt: yup.string().required("Đơn vị tính là bắt buộc"),
  serviceName: yup.string().required("Tên dịch vụ là bắt buộc"),
});

export const schema = yup.object({
  fullName: yup.string().required("Tên đầy đủ là bắt buộc"),
  phoneNumber: yup.string().required("Số điện thoại là bắt buộc").length(10, "Số điện thoại phải có 10 ký tự"),
  birthOfDay: yup.date().required("Ngày sinh là bắt buộc").typeError("Ngày sinh không hợp lệ"),
  identification: yup.string().required("Số chứng minh thư là bắt buộc").length(12, "Số chứng minh thư phải có 12 ký tự"),
  dateRange: yup.date().required("Ngày hợp lệ là bắt buộc").typeError("Ngày không hợp lệ"),
  issuedBy: yup.string().required("Nơi cấp là bắt buộc"),
  permanentAddress: yup.string().required("Địa chỉ thường trú là bắt buộc"),

  // Thông tin căn hộ
  roomId: yup.number().required("ID phòng là bắt buộc"),
  houseAddress: yup.string().required("Địa chỉ căn hộ là bắt buộc"),
  rentalPrice: yup.number().required("Giá cho thuê là bắt buộc"),
  depositDate: yup.date().required("Ngày đặt cọc là bắt buộc").typeError("Ngày không hợp lệ"),
  depositAmount: yup.number().required("Số tiền cọc giữ phòng là bắt buộc"),
  additionalDepositAmount: yup.number().required("Số tiền cọc bổ sung là bắt buộc"),
  depositPaymentDeadline: yup.date().required("Hạn thanh toán tiền cọc là bắt buộc").typeError("Ngày không hợp lệ"),
  rentalStartDate: yup.date().required("Ngày bắt đầu thuê là bắt buộc").typeError("Ngày không hợp lệ"),
  numberOfPeople: yup.number().required("Số người là bắt buộc"),
  numberOfVehicle: yup.number().required("Số xe là bắt buộc"),
  chuongTrinhUuDai: yup.string().required("Chương trình ưu đãi là bắt buộc"),
  note: yup.string().required("Ghi chú là bắt buộc"),
  rentalTerm: yup.number().required("Thời hạn hợp đồng là bắt buộc"),

  // Thông tin nhân viên sale
  // commissionPolicyId: yup.number().required("ID chính sách hoa hồng là bắt buộc"),
  // saleEmployeeCompany: yup.string().required("Tên công ty nhân viên sale là bắt buộc"),
  // makerId: yup.string().required("ID người tạo là bắt buộc"),

  // // Thông tin nội thất
  // furnitures: yup.array().of(furnitureSchema).required("Danh sách nội thất là bắt buộc"),

  // // Thông tin dịch vụ
  // services: yup.array().of(serviceSchema).required("Danh sách dịch vụ là bắt buộc"),
}).required();
