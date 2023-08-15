import DashboardMain from "./DashboardMain";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <>
      <header>
        <Navbar />
        <Sidebar />
      </header>
      <DashboardMain />
    </>
  );
}

export default Dashboard;
