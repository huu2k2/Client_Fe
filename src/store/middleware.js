import ProvicesApi from "@apis/slice/provices";
import RoomsApi from "@apis/slice/rooms";
import AcountsApi from "@apis/slice/Acount";
import ProfilesApi from "@apis/slice/profile";
import ServicesApi from "@apis/slice/services";
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(ProvicesApi.middleware)
    .concat(RoomsApi.middleware)
    .concat(AcountsApi.middleware)
    .concat(ProfilesApi.middleware)
    .concat(ServicesApi.middleware)

export default middleware;
