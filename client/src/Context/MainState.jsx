import { createContext, useState } from "react";
import ViewLinks from "../Component/OptionsComponent/ViewLinks";

const MainState = createContext();

export const MainProvider = ({ children }) => {
  const [isLoggedin, setisLoggedin] = useState(false);
  const [userData, setuserData] = useState(undefined);
  const [sidebar, setsidebar] = useState({
    Lists: ["View Links", "Add Links"],
    Name: "Links",
  });
  const [settingsActive, setsettingsActive] = useState(false);
  const [linksActive, setlinksActive] = useState(true);
  const [optionComponent, setoptionComponent] = useState(<ViewLinks />);
  //interval id for tokenexpiry
  const [intID, setintID] = useState("");
  //interval id for links
  const [linkintID, setlinkintID] = useState("");
  //state for link delete id
  const [delLinkId, setdelLinkId] = useState("");
  //state to open close modal
  const [modal, setmodal] = useState(false);
  //state to notify that need a api call to get links after(delete,edit,add)
  const [needRefresh, setneedRefresh] = useState(false);
  //state to control link timer
  const [firstTimer, setfirstTimer] = useState(true);

  const [linkComp, setlinkComp] = useState(<p>No Links,Please Add</p>);
  return (
    <MainState.Provider
      value={{
        linkComp,
        setlinkComp,
        needRefresh,
        setneedRefresh,
        modal,
        setmodal,
        delLinkId,
        setdelLinkId,
        isLoggedin,
        setisLoggedin,
        userData,
        setuserData,
        sidebar,
        setsidebar,
        settingsActive,
        setsettingsActive,
        linksActive,
        setlinksActive,
        optionComponent,
        setoptionComponent,
        intID,
        setintID,
        linkintID,
        setlinkintID,
        firstTimer,
        setfirstTimer,
      }}
    >
      {children}
    </MainState.Provider>
  );
};

export default MainState;
