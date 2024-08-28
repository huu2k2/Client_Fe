import React, { useEffect, useState } from 'react';
import { useCreateDepositPaymentLinkFirstMutation } from '../../apis/slice/Bank';

function Payment({ id, setIsPayment }) {
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [createPayment, { data: paymentData, isLoading, isError }] = useCreateDepositPaymentLinkFirstMutation();
    console.log("🚀 ~ Payment ~ paymentData:", paymentData)

    useEffect(() => {
        // Call the mutation when the component mounts
        createPayment(id);
    }, [id, createPayment]);

    useEffect(() => {
        // Countdown timer logic
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            // Action when the timer reaches 0
            // You might want to redirect or show a message here.
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !paymentData) {
        return <div className='w-screen h-screen flex flex-col justify-center items-center fixed bg-gray-500 bg-opacity-50 inset-0 z-50'><div>Error loading payment data</div></div>;
    }

    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center fixed bg-gray-500 bg-opacity-50 inset-0 z-50'>
            <div className="bg-white rounded-md p-4 ">
                <div className='flex justify-end w-full'>
                    <button
                        className='p-2 bg-slate-500 rounded'
                        onClick={() => setIsPayment(false)}>
                        X
                    </button>
                </div>
                <div className='flex justify-end w-full'>
                    <p className='text-rose-600'>Thời gian còn lại: {formatTime(timeLeft)}</p>
                </div>
                <p className='font-bold text-[20px] text-gray-600'><strong className='font-normal'>Chủ tài khoản: </strong>Trần Quốc Tài</p>
                <div className="flex justify-center mb-4">
                    <img src={paymentData.response.data.QRCode} alt="QR Code" />
                </div>
                <div className="mb-4 flex flex-col justify-start text-gray-600">
                    <div className="text-right text-gray-600 mb-4 flex justify-between items-center">
                        <p className='font-bold text-[25px] text-[#2D6BB8]'>
                            <strong className='font-normal text-black'>Số tiền: </strong>
                            {paymentData.response.data.Amount} VND
                        </p>
                    </div>
                    <div className='flex gap-1'>
                        <p>Nội dung: </p>
                        <strong>{paymentData.response.data.Description}</strong>
                    </div>
                    <p className='text-rose-600'>Vui lòng không sửa nội dung!</p>
                </div>
                <div className="flex justify-end gap-3">
                    <button className="bg-rose-600 text-white p-2 rounded-md hover:bg-rose-500">
                        Gửi hóa đơn
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Payment;

