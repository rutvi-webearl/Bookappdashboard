import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SubCategories from "layouts/subcategories";
import Writer from "layouts/writer";
// @mui icons
import Icon from "@mui/material/Icon";
import Allusers from "layouts/allusers/allusers";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Sub Categories",
    key: "subcategories",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/subcategories",
    component: <SubCategories />,
  },
  {
    type: "collapse",
    name: "Writer",
    key: "writer",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/writer",
    component: <Writer />,
  },
  {
    type: "collapse",
    name: "All users",
    key: "allusers",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/allusers",
    component: <Allusers />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },

];

export default routes;

// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from 'layouts/dashboard';
// import Tables from 'layouts/tables';
// import Billing from 'layouts/billing';
// import RTL from 'layouts/rtl';
// import Notifications from 'layouts/notifications';
// import Profile from 'layouts/profile';
// import SignIn from 'layouts/authentication/sign-in';
// import SignUp from 'layouts/authentication/sign-up';
// import SubCategories from 'layouts/subcategories';
// import Writer from 'layouts/writer';
// import Icon from '@mui/material/Icon';
// import Allusers from 'layouts/allusers/allusers';
// import MDBox from 'components/MDBox';
// import MDTypography from 'components/MDTypography';

// // Admin Routes
// const adminRoutes = [
//   {
//     type: 'collapse',
//     name: 'Dashboard',
//     key: 'dashboard',
//     icon: <Icon fontSize="small">dashboard</Icon>,
//     route: '/dashboard',
//     component: <Dashboard />,
//   },
//   {
//     type: 'collapse',
//     name: 'Tables',
//     key: 'tables',
//     icon: <Icon fontSize="small">table_view</Icon>,
//     route: '/tables',
//     component: <Tables />,
//   },
//   {
//     type: 'collapse',
//     name: 'Sub Categories',
//     key: 'subcategories',
//     icon: <Icon fontSize="small">table_view</Icon>,
//     route: '/subcategories',
//     component: <SubCategories />,
//   },
//   {
//     type: 'collapse',
//     name: 'Writer',
//     key: 'writer',
//     icon: <Icon fontSize="small">table_view</Icon>,
//     route: '/writer',
//     component: <Writer />,
//   },
//   {
//     type: 'collapse',
//     name: 'All users',
//     key: 'allusers',
//     icon: <Icon fontSize="small">table_view</Icon>,
//     route: '/allusers',
//     component: <Allusers />,
//   },
//   {
//     type: 'collapse',
//     name: 'Billing',
//     key: 'billing',
//     icon: <Icon fontSize="small">receipt_long</Icon>,
//     route: '/billing',
//     component: <Billing />,
//   },
//   {
//     type: 'collapse',
//     name: 'RTL',
//     key: 'rtl',
//     icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
//     route: '/rtl',
//     component: <RTL />,
//   },
//   {
//     type: 'collapse',
//     name: 'Notifications',
//     key: 'notifications',
//     icon: <Icon fontSize="small">notifications</Icon>,
//     route: '/notifications',
//     component: <Notifications />,
//   },
//   {
//     type: 'collapse',
//     name: 'Profile',
//     key: 'profile',
//     icon: <Icon fontSize="small">person</Icon>,
//     route: '/profile',
//     component: <Profile />,
//   },
//   {
//     type: 'collapse',
//     name: 'Sign In',
//     key: 'sign-in',
//     icon: <Icon fontSize="small">login</Icon>,
//     route: '/authentication/sign-in',
//     component: <SignIn />,
//   },
//   {
//     type: 'collapse',
//     name: 'Sign Up',
//     key: 'sign-up',
//     icon: <Icon fontSize="small">assignment</Icon>,
//     route: '/authentication/sign-up',
//     component: <SignUp />,
//   },
// ];

// // Writer Routes
// const writerRoutes = [
//   {
//     type: 'collapse',
//     name: 'Dashboard',
//     key: 'dashboard',
//     icon: <Icon fontSize="small">dashboard</Icon>,
//     route: '/dashboard',
//     component: <Dashboard />,
//   },
//   {
//     type: 'collapse',
//     name: 'Books',
//     key: 'books',
//     icon: <Icon fontSize="small">Book</Icon>,
//     route: '/books',
//     component: <Book />,
//   },
//   {
//     type: 'collapse',
//     name: 'Profile',
//     key: 'profile',
//     icon: <Icon fontSize="small">person</Icon>,
//     route: '/profile',
//     component: <Profile />,
//   },
//   {
//     type: 'collapse',
//     name: 'Sign In',
//     key: 'sign-in',
//     icon: <Icon fontSize="small">login</Icon>,
//     route: '/authentication/sign-in',
//     component: <SignIn />,
//   },
//   {
//     type: 'collapse',
//     name: 'Sign Up',
//     key: 'sign-up',
//     icon: <Icon fontSize="small">assignment</Icon>,
//     route: '/authentication/sign-up',
//     component: <SignUp />,
//   },
// ];

// const Routes = () => {
//   // Determine if user is accessing admin or writer routes based on path or other criteria
//   const isAdminPath = window.location.pathname.startsWith('/admin');

//   return (
//     <MDBox pt={6} pb={3}>
//       <Routes>
//         {/* Admin Routes */}
//         {isAdminPath ? (
//           adminRoutes.map((route, index) => (
//             <Route key={index} path={route.route} element={route.component} />
//           ))
//         ) : (
//           /* Writer Routes */
//           writerRoutes.map((route, index) => (
//             <Route key={index} path={route.route} element={route.component} />
//           ))
//         )}

//         {/* Redirect to appropriate dashboard based on path */}
//         <Route path="/authentication/sign-in">
//           {isAdminPath ? (
//             <Navigate to="/admin/dashboard" />
//           ) : (
//             <Navigate to="/writer/dashboard" />
//           )}
//         </Route>

//         {/* Route for sign-up page */}
//         <Route path="/authentication/sign-up" element={<SignUp />} />
//       </Routes>
//     </MDBox>
//   );
// };

// export default Routes;