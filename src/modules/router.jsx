import { createBrowserRouter } from "react-router-dom";
import RouterPage404 from "./Page_404/router";
import RouterRegister from "./Register/router";
import RouterLogin from "./Login/router";
import RouterHome from "./Home/router";
import RouterPageOverviewHome from "./OverviewHome/router";


export const routers = createBrowserRouter([
  RouterPage404,
  RouterRegister,
  RouterLogin,
  RouterHome,
  RouterPageOverviewHome,
 
]);
 
