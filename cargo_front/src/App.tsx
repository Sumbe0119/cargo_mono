import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster
          position="top-center"
          gutter={8}
          // containerStyle={{
          //   opacity: 1
          // }}
          toastOptions={{
            style: {
              backgroundColor: "rgba(10,10,10, 0.8)",
              color: "#fff",
              padding: "10px 16px",
            },
            className: "text-sm",
          }}
        />
        <AppRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
