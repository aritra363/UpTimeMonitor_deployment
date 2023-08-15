import LogRes from "./Component/LogRes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import { LoginPrivateRoute } from "./PrivateRoute/LoginPrivateRoute";

import { MainProvider } from "./Context/MainState";
import { DashboardPrivateRoute } from "./PrivateRoute/DashboardPrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <MainProvider>
      <Toaster position="top-center" reverseOrder={true} />
      <Router>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <DashboardPrivateRoute>
                  <LogRes />
                </DashboardPrivateRoute>
              }
            />
            <Route
              exact
              path="/Dashboard"
              element={
                <LoginPrivateRoute>
                  <Dashboard />
                </LoginPrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </MainProvider>
  );
}

export default App;
