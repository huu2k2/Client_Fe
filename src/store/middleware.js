import ProvicesApi from "@apis/slice/provices";
import RoomsApi from "@apis/slice/rooms";
import AcountsApi from "@apis/slice/Acount";
import ProfilesApi from "@apis/slice/profile";
import ServicesApi from "@apis/slice/services";
import ImagesApi from "@apis/slice/ImageOfRoom";
import BanksApi  from '@apis/slice/Bank' 
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(ProvicesApi.middleware)
    .concat(RoomsApi.middleware)
    .concat(AcountsApi.middleware)
    .concat(ProfilesApi.middleware)
    .concat(ServicesApi.middleware)
    .concat(ImagesApi.middleware)
    .concat(BanksApi.middleware)
export default middleware;
