// import { createBrowserRouter } from "react-router-dom";
// import RouterPage404 from "./Page_404/router";
// import RouterRegister from "./Register/router";
// import RouterLogin from "./Login/router";
// import RouterHome from "./Home/router";
// import RouterPageOverviewHome from "./OverviewHome/router";


// export const routers = createBrowserRouter([
//   RouterPage404,
//   RouterRegister,
//   RouterLogin,
//   RouterHome,
//   RouterPageOverviewHome,
 
// ]);
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Login from './Login'
import Home from './Home'
const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="login" element={<Login />} />
      <Route path="similarRooms?*" element={<Home />} />
    </Route>
  )
);

export default routers;
