// import Dashboard from "layouts/dashboard";
// import Book from "layouts/books";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
// import SubCategories from "layouts/subcategories/SubCategories";
// import AllUsers from "layouts/allusers/AllUsers";
// import Icon from "@mui/material/Icon";

// const routes = [
//   {
//     type: "collapse",
//     name: "Dashboard",
//     key: "dashboard",
//     icon: <Icon fontSize="small">dashboard</Icon>,
//     route: "/dashboard",
//     component: <Dashboard />,
//   },

//   {
//     type: "collapse",
//     name: "Books",
//     key: "books",
//     icon: <Icon fontSize="small">Book</Icon>,
//     route: "/books",
//     component: <Book />,
//   },

//   // {
//   //   type: "collapse",
//   //   name: "Tables",
//   //   key: "tables",
//   //   icon: <Icon fontSize="small">table_view</Icon>,
//   //   route: "/tables",
//   //   component: <Tables />,
//   // },
//   // {
//   //   type: "collapse",
//   //   name: "SubCategories",
//   //   key: "tables",
//   //   icon: <Icon fontSize="small">table_view</Icon>,
//   //   route: "/subcategories",
//   //   component: <SubCategories />,
//   // },
//   // {
//   //   type: "collapse",
//   //   name: "All Users",
//   //   key: "tables",
//   //   icon: <Icon fontSize="small">table_view</Icon>,
//   //   route: "/allusers",
//   //   component: <AllUsers />,
//   // },
//   // {
//   //   type: "collapse",
//   //   name: "Billing",
//   //   key: "billing",
//   //   icon: <Icon fontSize="small">receipt_long</Icon>,
//   //   route: "/billing",
//   //   component: <Billing />,
//   // },
//   // {
//   //   type: "collapse",
//   //   name: "RTL",
//   //   key: "rtl",
//   //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
//   //   route: "/rtl",
//   //   component: <RTL />,
//   // },
//   // {
//   //   type: "collapse",
//   //   name: "Notifications",
//   //   key: "notifications",
//   //   icon: <Icon fontSize="small">notifications</Icon>,
//   //   route: "/notifications",
//   //   component: <Notifications />,
//   // },
//   {
//     type: "collapse",
//     name: "Profile",
//     key: "profile",
//     icon: <Icon fontSize="small">person</Icon>,
//     route: "/profile",
//     component: <Profile />,
//   },
 
//   {
//     type: "collapse",
//     name: "Sign In",
//     key: "sign-in",
//     icon: <Icon fontSize="small">login</Icon>,
//     route: "/authentication/sign-in",
//     component: <SignIn />,
//   },
//   {
//     type: "collapse",
//     name: "Sign Up",
//     key: "sign-up",
//     icon: <Icon fontSize="small">assignment</Icon>,
//     route: "/authentication/sign-up",
//     component: <SignUp />,
//   },
    
// ];

// export default routes;

import WDashboard from "writerlayouts/wdashboard";
import Book from "writerlayouts/books";
import Tables from "writerlayouts/tables";
import Billing from "writerlayouts/billing";
import RTL from "writerlayouts/rtl";
import Notifications from "writerlayouts/notifications";
import Profile from "writerlayouts/profile";
import SignIn from "writerlayouts/authentication/sign-in";
import SignUp from "writerlayouts/authentication/sign-up";
import SubCategories from "writerlayouts/subcategories/SubCategories";
import AllUsers from "writerlayouts/allusers/AllUsers";
import Icon from "@mui/material/Icon";

const writerroutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "wdashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/wdashboard",
    component: <WDashboard />,
  },
  {
    type: "collapse",
    name: "Books",
    key: "books",
    icon: <Icon fontSize="small">book</Icon>,
    route: "/books",
    component: <Book />,
  },
  // Uncomment the routes you need
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "SubCategories",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/subcategories",
  //   component: <SubCategories />,
  // },
  // {
  //   type: "collapse",
  //   name: "All Users",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/allusers",
  //   component: <AllUsers />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

export default writerroutes;
