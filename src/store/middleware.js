// middleware.js

import ProvicesApi from "@apis/slice/provices";
import RoomsApi from "@apis/slice/rooms";
import AcountsApi from "@apis/slice/Acount";
import ProfilesApi from "@apis/slice/profile";
import ServicesApi from "@apis/slice/services";
import ImagesApi from "@apis/slice/ImageOfRoom";
import BanksApi from '@apis/slice/Bank';
import ScheduleApi from '@apis/slice/ScheduleSeeRoom';
import Agencies from '@apis/slice/Agencies';
import HousesApi from '@apis/slice/Houses'
import DepositsApi from '@apis/slice/Deposit'
import InformationAPi from '@apis/slice/Infomation'
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(ProvicesApi.middleware)
    .concat(RoomsApi.middleware)
    .concat(AcountsApi.middleware)
    .concat(ProfilesApi.middleware)
    .concat(ServicesApi.middleware)
    .concat(ImagesApi.middleware)
    .concat(BanksApi.middleware)
    .concat(ScheduleApi.middleware)
    .concat(Agencies.middleware)
    .concat(HousesApi.middleware)
    .concat(DepositsApi.middleware)
    .concat(InformationAPi.middleware)
export default middleware;
