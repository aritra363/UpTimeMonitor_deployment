import { useContext } from "react";
import MainState from "../Context/MainState";
import "../CStyling/DashboardMain.css";

function DashboardMain() {
  const { optionComponent } = useContext(MainState);
  return (
    <div className="main-component">
      <div className="container pt-4">{optionComponent}</div>
    </div>
  );
}

export default DashboardMain;
