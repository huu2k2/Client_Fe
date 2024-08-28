import { RouterProvider } from "react-router-dom";
import { routers } from "./modules/router";
import { useIsLoading } from "@customhooks";
import { BarLoader } from "react-spinners";
function App() {
  const [isLoading,_] =useIsLoading() 
  return (
    <>
     { isLoading && <BarLoader height={5} width={"100%"} color="#c60000" loading={true} className="z-[100]"/>}
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
