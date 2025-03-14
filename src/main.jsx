import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Pages/Root.jsx';
import Home from './Pages/Home.jsx';
import AddCampaign from './Pages/AddCampaign.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import AllCampaigns from './Pages/AllCampaigns.jsx';
import CampaignDetails from './Pages/CampaignDetails.jsx';
import MyCampaign from './Pages/MyCampaign.jsx';
import UpdateCampaign from './Pages/UpdateCampaign.jsx';
import MyDonation from './Pages/MyDonation.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import PrivateRoutes from './Routes/PrivateRoutes.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: '/addCampaign',
        element: <PrivateRoutes><AddCampaign></AddCampaign></PrivateRoutes>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/allCampaign',
        element: <AllCampaigns></AllCampaigns>

      },
      {
        path: '/allCampaign/:id',
        element: <PrivateRoutes><CampaignDetails></CampaignDetails></PrivateRoutes>
      },
      {
        path: '/myCampaign',
        element: <PrivateRoutes><MyCampaign></MyCampaign></PrivateRoutes>
      },{
        path: '/updateCampaign/:id',
        element: <UpdateCampaign></UpdateCampaign>,
        loader: ({params})=>fetch(`https://crowdcube-server-blond.vercel.app/updateCampaign/${params.id}`)
      },{
        path: '/myDonation',
        element: <PrivateRoutes><MyDonation></MyDonation></PrivateRoutes>
      }
    ]
  },

]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
