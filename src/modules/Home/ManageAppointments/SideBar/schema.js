import * as yup from "yup";
 

const schema = yup
  .object({
    fullName: yup.string().required("Tên đầy đủ là bắt buộc"),
    phoneNumber: yup.string().required("Số điện thoại là bắt buộc").length(10, "Số điện thoại phải có 10 ký tự"),
    birthOfDay: yup.date().required("Ngày sinh là bắt buộc"),
    identification: yup.string().required("Số chứng minh thư là bắt buộc").length(12, "Số chứng minh thư phải có 12 ký tự"),
    dateRange: yup.date().required("Ngày hợp lệ là bắt buộc"),
    issuedBy: yup.string().required("Nơi cấp là bắt buộc"),
    permanentAddress: yup.string().required("Địa chỉ thường trú là bắt buộc"),
  
    // Thông tin căn hộ
    roomId: yup.string().required("ID phòng là bắt buộc"),
    houseAddress: yup.string().required("Địa chỉ căn hộ là bắt buộc"),
    rentalPrice: yup.string().required("Giá cho thuê là bắt buộc"),
    depositDate: yup.date().required("Ngày đặt cọc là bắt buộc"),
    depositAmount: yup.number().required("Số tiền cọc giữ phòng là bắt buộc"),
    additionalDepositAmount: yup.number().required("Số tiền cọc bổ sung là bắt buộc"),
    depositPaymentDeadline: yup.date().required("Hạn thanh toán tiền cọc là bắt buộc"),
    rentalStartDate: yup.date().required("Ngày bắt đầu thuê là bắt buộc"),
    numberOfPeople: yup.number().required("Số người là bắt buộc"),
    numberOfVehicle: yup.number().required("Số xe là bắt buộc"),
    chuongTrinhUuDai: yup.string().required("Chương trình ưu đãi là bắt buộc"),
    note: yup.string().required("Ghi chú là bắt buộc"),
    rentalTerm: yup.number().required("Thời hạn hợp đồng là bắt buộc"),
    commissionPolicyId:yup.number().required("Chinh sách hoa hồng là bắt buộc")
  })
  .required();

export default schema;
