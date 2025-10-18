import React, { useContext } from 'react'
import "./index.css"
import {createBrowserRouter , RouterProvider , Navigate } from "react-router-dom"
import Login from "./Pages/Auth/Login"
import SignUp from "./Pages/Auth/SignUp"
import PrivateRoute from './Routes/PrivateRoute'
import Dashboard from './Pages/Admin/DashBoard'
import ManageTask from './Pages/Admin/ManageTask'
import ManagaUser from './Pages/Admin/ManagaUser'
import CreateTask from './Pages/Admin/CreateTask'
import UserDashBoard from './Pages/User/UserDashBoard'
import MyTask from './Pages/User/MyTask'

import UserProvider, { UserContext } from './ContextApi/User'
import { Toaster } from 'react-hot-toast'
import ViewTaskDetails from './Pages/User/ViewTaskDetail'
const App = () => {
  const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Root/>
    },
    {
      path:"/Login",
      element:<Login/>
    },
    {
      path:"/SignUp",
      element:<SignUp/>
    },
    {
      element:<PrivateRoute allowedRole={["admin"]} />,
      children:[
        {path:"/admin/dashboard", element:<Dashboard/>},
        {path:"/admin/tasks", element:<ManageTask/>},
        {path:"/admin/create-task", element:<CreateTask/>},
        {path:"/admin/users", element:<ManagaUser/>},
      ]
    },
    {
      element:<PrivateRoute allowedRole={["users"]} />,
      children:[
        {path:"/user/dashboard", element:<UserDashBoard/>},
        {path:"/user/tasks", element:<MyTask/>},
        {path:"/user/task-detail/:id", element:<ViewTaskDetails/>},
  
      ]
    }
  ]
    
  )
  return (
    <UserProvider>
      <RouterProvider router={Routes} />
      <Toaster toastOptions={
        {
          className:"",
          style:{
            fontSize : "13px"
          }
        }
      }>
        
      </Toaster>
    </UserProvider>

  )
}

export default App

const Root = () => {
  const { User, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!User) {
    return <Navigate to="/Login" />;
  }

  return User.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
