import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import DashBoard from "./components/DashBoard";
import DataContext, { DataProvider } from "./context/DataContext";
import Preview from "./components/Preview";
import { userId } from "./features/users/usersApiSlice";
import { useContext } from "react";
import PrivateRoute from "./features/auth/PrivateRoute";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";





function App() {

  const { userId, setUserId }= useContext(DataContext)


  return (
    <DataProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element= {<Login />} />
        <Route path="register" element={<Register/>} />
        <Route element={<PersistLogin/>}> {/* beginning of persist */}
        <Route element={<Prefetch/>}>
        {/* <Route path="" element={<PrivateRoute/>}> */}
          <Route path="dashboard/:id" element={<DashLayout/>}>
              <Route index element={<DashBoard/>} />
                 <Route path="preview" element={<Preview/>}/>
              </Route>
          </Route>
      {/* </Route> */}
      </Route>
      </Route> {/* end of persist */}
    </Routes>
    </DataProvider>
  );
}

export default App;
