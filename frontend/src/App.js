import React, { Suspense } from "react"
import {BrowserRouter as Router} from "react-router-dom"
import  Applayout   from "./components/layouts/Applayout.js"
import { Container} from "@mui/material"
import { NotificationContainer } from "react-notifications";

import { UserProvider } from "./context/user-contex.js";
function App() {
  return (
    <UserProvider>
    <Suspense fallback={null}>
    <Container className="page-container">
      <Router>

        <Applayout/>
        <NotificationContainer/>
      </Router>
    </Container>
    </Suspense>
    </UserProvider>
  );
}

export default App;
