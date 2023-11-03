// src/App.js

import React from "react";
import AppRouter from "./AppRouter";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <AppRouter />
      </div>
    </UserProvider>
  );
}

export default App;
