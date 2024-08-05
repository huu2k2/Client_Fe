import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetListRoomCodeNotDepositQuery } from "@apis/slice/rooms";
import {
  usePostChangeRoomMutation,
  useGetListOfAppointmentsQuery,
} from "@apis/slice/Agencies";

const ModalChangeRoom = ({ houseId, roomCode, scheduleId }) => {
  const { data } = useGetListRoomCodeNotDepositQuery(houseId);
  const { refetch } = useGetListOfAppointmentsQuery({ queries: {}, body: {} });
  const [roomid, setRoomid] = useState(null);
  const [RoomCode, setRoomCode] = useState(null);
  const [ListRooms, setListRooms] = useState([]);

  useEffect(() => {
    if (data?.response) {
      setListRooms([...data.response]);
    }
  }, [data]);

  const handleChangeSelect = (e) => {
    setRoomid(e.target.value);
    setRoomCode(e.target.selectedOptions[0].label);
  };

  const [postChangeRoom] = usePostChangeRoomMutation();

  const handleClickSuccess = async () => {
    try {
      if (!roomid) {
        toast.info("Chưa chọn phòng mới!");
        return;
      }

      if (Number(roomCode) !== Number(RoomCode)) {
        const body = {
          scheduleId: Number(scheduleId),
          roomId: Number(roomid),
          roomCode: Number(RoomCode), // Ensure this is correct type
        };

        await postChangeRoom(body).unwrap();
        refetch(); // Make sure this is working and refreshing data
        toast.success("Chuyển phòng thành công!");
      } else {
        toast.info("Mã phòng không thay đổi!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error.message);
    }
  };

  return (
    <dialog id="modalChanegroom" className="modal z-30">
      <div className="modal-box flex flex-col gap-2">
        <h3 className="font-bold text-lg">Danh sách phòng có thể chuyển</h3>

        <div>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={handleChangeSelect}
          >
            <option disabled selected value="">
              P.{roomCode}
            </option>
            {ListRooms &&
              ListRooms.map((i, index) => (
                <option
                  key={index}
                  value={i.roomId}
                  label={`P.${i.roomCode}`}
                ></option>
              ))}
          </select>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn rounded-lg">Hủy</button>
            <button
              className="btn bg-rose-700 hover:bg-rose-700 ml-4 rounded-lg text-white"
              onClick={handleClickSuccess}
            >
              Chuyển phòng
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalChangeRoom;
