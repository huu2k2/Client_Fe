
import ProvicesApi from "@apis/slice/provices";
import RoomsApi from "@apis/slice/rooms";
import AcountsApi from "@apis/slice/Acount";
import ProfilesApi from "@apis/slice/profile";
import ServicesApi from "@apis/slice/services";
const Reducer = {
    [ProvicesApi.reducerPath]: ProvicesApi.reducer,
    [RoomsApi.reducerPath]: RoomsApi.reducer,
    [AcountsApi.reducerPath]: AcountsApi.reducer,
    [ProfilesApi.reducerPath]: ProfilesApi.reducer,
    [ServicesApi.reducerPath]: ServicesApi.reducer,
}

export default Reducer