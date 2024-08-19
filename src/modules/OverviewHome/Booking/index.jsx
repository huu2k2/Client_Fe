import React from "react";
import GroupInput from "./GroupInput";
import { useGetInfoItem } from "@customhooks/ServicesCustomHook";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { usePostScheduleRoomMutation } from "../../../apis/slice/ScheduleSeeRoom";
import { convertToDateISOString } from "../../../utils/ConverDate";

import { toast } from "react-toastify";

const index = () => {
  const [address] = useGetInfoItem();

  const [postScheduleRoom, { data: dataOfPost, isLoading, error }] =
    usePostScheduleRoomMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const formData = {
      roomId: sessionStorage.getItem("idroom"),
      ...data,
      dateView: convertToDateISOString(data.dateView),
    };
    console.log(formData);
    try {
      await postScheduleRoom(formData).unwrap();
      toast.success("Schedule posted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Error posting schedule:", err);
      toast.error(err.data.mesagee, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <div className="w-full h-[116px] py-10 shadow justify-center items-center inline-flex bg-black">
        <div className="grow shrink basis-0 h-9 px-[280px] justify-start items-start flex">
          <div className="text-white text-3xl font-bold leading-9">
            Đặt lịch dẫn khách
          </div>
        </div>
      </div>

      <div className="w-full h-[778px] flex-col justify-start items-center inline-flex">
        <div className="w-full h-[778px] relative">
          <div className="w-full h-32 left-0 top-0 absolute bg-black" />
          <div className="h-[728px] px-10 py-6 left-[280px] top-0 absolute bg-white rounded-lg shadow flex-col justify-start items-center gap-6 inline-flex">
            {/* form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="self-stretch h-[680px] flex-col justify-start items-start gap-8 flex"
            >
              <div className="self-stretch h-[589px] flex-col justify-start items-start gap-10 flex">
                <div className="self-stretch h-[589px] flex-col justify-start items-start gap-5 flex">
                  <div className="self-stretch h-12 flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch text-gray-900 text-lg font-medium leading-normal">
                      Nhà trọ {address}
                    </div>
                    <div className="self-stretch text-gray-500 text-sm font-normal leading-tight">
                      {address}
                    </div>
                  </div>

                  <GroupInput register={register} errors={errors} />
                </div>
              </div>

              <div className="self-stretch h-[59px] flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch h-px flex-col justify-start items-start flex">
                  <div className="self-stretch h-px bg-gray-200" />
                </div>
                <div className="self-stretch justify-end items-center gap-3 inline-flex">
                  <button
                    type="submit"
                    className="px-[17px] py-[9px] bg-rose-600 rounded-md shadow justify-center items-center flex"
                  >
                    <div className="text-white text-sm font-medium leading-tight">
                      Đặt lịch
                    </div>
                  </button>
                </div>
              </div>
            </form>
            {/* form */}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
