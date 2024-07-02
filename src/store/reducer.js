
import ProvicesApi from "@apis/slice/provices";
import RoomsApi from "@apis/slice/rooms";
import AcountsApi from "@apis/slice/Acount";
import ProfilesApi from "@apis/slice/profile";
import ServicesApi from "@apis/slice/services";
import ImagesApi from "@apis/slice/ImageOfRoom";
import BanksApi from '@apis/slice/Bank'
import ScheduleApi from '@apis/slice/ScheduleSeeRoom'
import Agencies from '@apis/slice/Agencies'

const Reducer = {
    [ProvicesApi.reducerPath]: ProvicesApi.reducer,
    [RoomsApi.reducerPath]: RoomsApi.reducer,
    [AcountsApi.reducerPath]: AcountsApi.reducer,
    [ProfilesApi.reducerPath]: ProfilesApi.reducer,
    [ServicesApi.reducerPath]: ServicesApi.reducer,
    [ImagesApi.reducerPath]: ImagesApi.reducer,
    [BanksApi.reducerPath]: BanksApi.reducer,
    [ScheduleApi.reducerPath]: ScheduleApi.reducer,
    [Agencies.reducerPath]: Agencies.reducer,

}

export default Reducer