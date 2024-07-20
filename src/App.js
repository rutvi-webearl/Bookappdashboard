

import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation, BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import routes from "routes";
import writerroutes from "writerroutes";

import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import { UserRoleProvider, useUserRole } from "context/ValidationContext";

import AddWriter from "layouts/writer/AddWriter";
import EditWriter from "layouts/writer/EditWriter";
import ForgetPassword from "layouts/authentication/sign-in/forgotpass";
import DeleteWriter from "layouts/writer/DeleteWriter";
import Basic from "layouts/authentication/sign-in";
import WriterSignIn from "writerlayouts/authentication/sign-in";
import WriterSignUp from "writerlayouts/authentication/sign-up";
import Book from "writerlayouts/books";
import WDashboard from "writerlayouts/wdashboard";
import WSidenav from "writerexamples/Sidenav";
import Bookdetails from "layouts/books/bookdetails";
import Booklist from "layouts/books/index";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const AppRoutes = () => {
    const { role } = useUserRole();

    return (
      <Routes>
        {role === "admin" && getRoutes(routes)}
        {role === "writer" && getRoutes(writerroutes)}
      </Routes>
    );
  };

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <UserRoleProvider>
      {direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
            <CssBaseline />
            {layout === "wdashboard" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                  brandName="Material Dashboard 2"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            {layout === "vr" && <Configurator />}
            
            <AppRoutes />
          </ThemeProvider>
        </CacheProvider>
      ) : (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="Material Dashboard 2"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          {layout === "vr" && <Configurator />}
          <Routes>
            {getRoutes(routes)}
            {getRoutes(writerroutes)}

            <Route path="/add-writer" element={<AddWriter />} /> 
            <Route path="/edit-writer/:id" element={<EditWriter />} />
            <Route path="/delete-writer/:id" element={<DeleteWriter />} />
            <Route path="/forgot-pass" element={<ForgetPassword />} />
            <Route path="/authentication/sign-in" element={<Basic />} />
            <Route path="/writer-signin" element={<WriterSignIn />} />
            <Route path="/writer-signup" element={<WriterSignUp />} />
            <Route path="/books" element={<Book />} />
            <Route path="/booklist" element={<Booklist />} />
            <Route path="/bookdetails/:bookId" element={<Bookdetails />} />
            <Route path="/wdashboard" element={<WDashboard />} />
            <Route path="/wSidenav" element={<WSidenav />} />
            {writerroutes.map((route) => (
              <Route key={route.key} path={route.route} element={route.component} />
            ))}
      
            <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
          </Routes>
          {/* <AppRoutes /> */}
        </ThemeProvider>
      )}
    </UserRoleProvider>
  );
}
