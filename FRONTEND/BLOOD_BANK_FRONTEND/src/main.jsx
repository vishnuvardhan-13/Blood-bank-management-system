import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes/App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import detailsStore from "./STORE/index.js";
import DonorProfile from "./COMPONENT/DonorProfile.jsx";
import Donor from "./COMPONENT/Donor.jsx";
import DonorHome from "./COMPONENT/DonorHome.jsx";
import Patient from "./COMPONENT/PATIENT_COMPONENT/Patient.jsx";
import PatientHome from "./COMPONENT/PATIENT_COMPONENT/PatientHome.jsx";
import PatientProfile from "./COMPONENT/PATIENT_COMPONENT/PatientProfile.jsx";
import DonorDetails from "./COMPONENT/DonorDetails.jsx";
import Home from "./COMPONENT/Home.jsx";
import DonorRequest from "./COMPONENT/PATIENT_COMPONENT/DonorRequest.jsx";
import BloodBankDetails from "./COMPONENT/BLOOD_BANK_COMPONENTS/BloodBankDetails.jsx";
import BloodBankRequest from "./COMPONENT/PATIENT_COMPONENT/BloodBankRequest.jsx";
import BloodBank from "./COMPONENT/BLOOD_BANK_COMPONENTS/BloodBank.jsx";
import BloodBankProfile from "./COMPONENT/BLOOD_BANK_COMPONENTS/BloodBankProfile.jsx";
import BloodBankHome from "./COMPONENT/BLOOD_BANK_COMPONENTS/BloodBankHome.jsx";
import BbDonorRequest from "./COMPONENT/BLOOD_BANK_COMPONENTS/BbDonorRequest.jsx";
import BloodCount from "./COMPONENT/BLOOD_BANK_COMPONENTS/BloodCount.jsx";
import Admin from "./COMPONENT/ADMIN COMPONENT/Admin.jsx";
import PatientDetails from "./COMPONENT/ADMIN COMPONENT/PatientDetails.jsx";
import AdminBloodBankDetails from "./COMPONENT/ADMIN COMPONENT/AdminBloodBankDetails.jsx";
import AdminDonorDetails from "./COMPONENT/ADMIN COMPONENT/AdminDonorDetails.jsx";
import DonorDelete from "./COMPONENT/DonorDelete.jsx";
import BloodBankDelete from "./COMPONENT/BLOOD_BANK_COMPONENTS/BloodBankDelete.jsx";
import PatientDelete from "./COMPONENT/PATIENT_COMPONENT/PatientDelete.jsx";
import AdminHome from "./COMPONENT/ADMIN COMPONENT/AdminHome.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> ,
  children:[
    {path:"/",element:<Home />},
    {path:"/donor_details",element:<DonorDetails />},
    {path:"/blood_bank_details",element:<BloodBankDetails />}

  ]
},
  {
    path: "/donor",
    element: <Donor />,
    children: [
      { path: "/donor", element: <DonorHome /> },
      { path: "donor/profile", element: <DonorProfile /> },
            { path: "donor/delete_account", element: <DonorDelete /> },

    ],
  },
  {
    path: "/patient",
    element: <Patient />,
    children: [
      { path: "/patient", element: <PatientHome /> },
      { path: "patient/profile", element: <PatientProfile /> },
      { path: "patient/request_donor", element: <DonorRequest /> },
      { path: "patient/request_blood_bank", element: <BloodBankRequest /> },
      { path: "patient/delete_account", element: <PatientDelete /> },
    ],
  },
  {  path: "/blood_bank",
  element: <BloodBank />,
  children: [
    { path: "/blood_bank", element: <BloodBankHome /> },
    { path: "blood_bank/profile", element: <BloodBankProfile /> },
    { path: "blood_bank/request_donor", element: <BbDonorRequest /> },
    { path: "blood_bank/blood_count", element: <BloodCount /> },
    { path: "blood_bank/delete_account", element: <BloodBankDelete /> },

]},
{path:"/admin",element:<Admin />,children:[
  { path: "/admin", element: <AdminHome /> },
  {path:"admin/patient",element:<PatientDetails/>},
  {path:"admin/blood_bank",element:<AdminBloodBankDetails/>},
  {path:"admin/donor",element:<AdminDonorDetails/>},
]}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={detailsStore}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
