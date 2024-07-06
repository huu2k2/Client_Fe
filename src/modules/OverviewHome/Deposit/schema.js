import * as yup from "yup"

export const schema = yup
  .object({
    fullName: yup.string().required(),
    phoneNumber: yup.string().required(),
    birthOfDay: yup.string().required(),
    identification: yup.string().required(),
    dateRange: yup.string().required(),
    issuedBy: yup.string().required(),
    permanentAddress: yup.string().required(),
    //  Thông tin căn hộ
    // roomId: yup.string().required(),
    houseAddress: yup.string().required(),
    rentalPrice: yup.string().required(), //Giá cho thuê
    rentalTerm: yup.string().required(),  // Thời hạn hợp đồng
    depositAmount: yup.string().required(), //Số tiền cọc giữ phòng
    additionalDepositAmount: yup.string().required(), //Số tiền cọc bổ sung
    rentalStartDate: yup.string().required(), //Ngày bắt đầu thuê
    depositPaymentDeadline: yup.string().required(), //Hạn thanh toán tiền cọc
    numberOfPeople: yup.string().required(),
    numberOfVehicle: yup.string().required(),
    chuongTrinhUuDai: yup.string().required(),
    note: yup.string().required(),
  })
  .required()