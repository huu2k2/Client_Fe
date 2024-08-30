import { RouterProvider } from "react-router-dom";
import { routers } from "./modules/router";
import { useIsLoading } from "@customhooks";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { requestNotificationPermission } from "./helper/NotificationPermission";
import InfomationHook from "./customHooks/InfomationHook";
 
function App() {
  const [isLoading, _] = useIsLoading();
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  return (
    <>
      {isLoading && (
        <BarLoader
          height={5}
          width={"100%"}
          color="#c60000"
          loading={true}
          className="z-[200]"
        />
      )}
      <InfomationHook>
        <RouterProvider router={routers} />
      </InfomationHook>
    </>
  );
}

export default App;
