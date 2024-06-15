import { BsGiftFill } from "react-icons/bs";
import Button from "@components/Button";
import { Skeleton } from "@mui/material";

const InfoRoomSkeleton = () => {
    return (
        <div>

            <div className="w-[723px] h-[578px] gap-4 flex flex-col ">
                {/* name home in stress */}
                <div className="w-full h-fit">
                    <Skeleton
                        height={32}
                        variant="rounded"
                    />
                </div>

                {/* endow  */}
                <div className="w-[723px] h-[96px] rounded-[4px] border p-2 gap-[102px] bg-[#FFFBEB] border-[#B45309] ">
                    <div className="w-[707px] h-[80px] gap-2">
                        {/* git  */}
                        <div className="w-[82px] h-[24px] gap-2 flex">
                            <BsGiftFill />
                            <span className="font-medium text-base">Ưu đãi</span>
                        </div>
                        {/*gif content */}
                        <div className="w-full h-[48px] gap-2 px-8 mt-2">
                            <ul className="list-disc ">

                                <li className="nthd_text_normal_sm_text2 mt-2">
                                    <Skeleton />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* info detail home  */}
                <div className="mt-2 w-full rounded-[4px] border p-6 gap-6 bg-[#F9FAFB] flex flex-col ">
                    <Skeleton
                        height={20}
                        variant="rounded"
                    />
                    <Skeleton
                        height={20}
                        variant="rounded"
                    />
                    <Skeleton
                        height={20}
                        variant="rounded"
                    />



                </div>

                <div className="flex justify-between w-full items-center h-40">
                    <div className="text-[28px] flex font-semibold leading-[28px]   text-red-700">
                        <Skeleton
                            height={28}
                            width={220}
                            variant="rounded"
                        />
                        <span className="font-normal text-gray-500 text-base ml-1 "> / Khách</span>
                    </div>

                    {/* button  */}
                    <div className="w-fit flex">
                        <div >
                            <Button
                                text={" Đặt lịch xem phòng"}
                                color={"text-white"}
                                background={"bg-red-700"}
                            />
                        </div>
                        <div className="mx-2">
                            <Button
                                text={"Tổng quan nhà trọ"}
                                color={"text-red-700"}
                                background={"bg-red-100"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoRoomSkeleton;
