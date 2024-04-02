import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { useAppSelector } from "./redux/hooks";

function App() {
  const { darkMode } = useAppSelector((store) => store.theme);

  return (
    <div  className={` ${
      darkMode ? "bg-[#18191A] text-white" : ""
    }`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
