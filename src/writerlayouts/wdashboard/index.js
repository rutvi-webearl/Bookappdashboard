// import React from "react";
// import Grid from "@mui/material/Grid";
// import MDBox from "components/MDBox";
// import DashboardLayout from "writerexamples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "writerexamples/Navbars/DashboardNavbar";
// import Footer from "writerexamples/Footer";
// import ReportsBarChart from "writerexamples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "writerexamples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "writerexamples/Cards/StatisticsCards/ComplexStatisticsCard";
// import reportsBarChartData from "writerlayouts/wdashboard/data/reportsBarChartData";
// import reportsLineChartData from "writerlayouts/wdashboard/data/reportsLineChartData";
// import Projects from "writerlayouts/wdashboard/components/Projects";
// import OrdersOverview from "writerlayouts/wdashboard/components/OrdersOverview";
// import writerroutes from "writerroutes";

// function WDashboard() {
//   const { sales, tasks } = reportsLineChartData;

//   return (
//     <writerroutes>
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox py={3}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6} lg={3}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 color="dark"
//                 icon="weekend"
//                 title="Bookings"
//                 count={281}
//                 percentage={{
//                   color: "success",
//                   amount: "+55%",
//                   label: "than lask week",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} md={6} lg={3}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 icon="leaderboard"
//                 title="Today's Users"
//                 count="2,300"
//                 percentage={{
//                   color: "success",
//                   amount: "+3%",
//                   label: "than last month",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} md={6} lg={3}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 color="success"
//                 icon="store"
//                 title="Revenue"
//                 count="34k"
//                 percentage={{
//                   color: "success",
//                   amount: "+1%",
//                   label: "than yesterday",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} md={6} lg={3}>
//             <MDBox mb={1.5}>
//               <ComplexStatisticsCard
//                 color="primary"
//                 icon="person_add"
//                 title="Followers"
//                 count="+91"
//                 percentage={{
//                   color: "success",
//                   amount: "",
//                   label: "Just updated",
//                 }}
//               />
//             </MDBox>
//           </Grid>
//         </Grid>
//         <MDBox mt={4.5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsBarChart
//                   color="info"
//                   title="website views"
//                   description="Last Campaign Performance"
//                   date="campaign sent 2 days ago"
//                   chart={reportsBarChartData}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsLineChart
//                   color="success"
//                   title="daily sales"
//                   description={
//                     <>
//                       (<strong>+15%</strong>) increase in today sales.
//                     </>
//                   }
//                   date="updated 4 min ago"
//                   chart={sales}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsLineChart
//                   color="dark"
//                   title="completed tasks"
//                   description="Last Campaign Performance"
//                   date="just updated"
//                   chart={tasks}
//                 />
//               </MDBox>
//             </Grid>
//           </Grid>
//         </MDBox>
//         <MDBox>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} lg={8}>
//               <Projects />
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <OrdersOverview />
//             </Grid>
//           </Grid>
//         </MDBox>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//     </writerroutes>
//   );
// }

// export default WDashboard;
















import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "writerexamples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "writerexamples/Navbars/DashboardNavbar";
import Footer from "writerexamples/Footer";
import ReportsBarChart from "writerexamples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "writerexamples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "writerexamples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsBarChartData from "writerlayouts/wdashboard/data/reportsBarChartData";
import reportsLineChartData from "writerlayouts/wdashboard/data/reportsLineChartData";
import Projects from "writerlayouts/wdashboard/components/Projects";
import OrdersOverview from "writerlayouts/wdashboard/components/OrdersOverview";
import Sidenav from "writerexamples/Sidenav"; // Import Sidenav
import writerroutes from "writerroutes"; // Import routes

function WDashboard() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <Sidenav routes={writerroutes} brandName="Writer Dashboard" /> {/* Add Sidenav here */}
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Bookings"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than last week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default WDashboard;
