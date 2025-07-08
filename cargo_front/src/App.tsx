import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OrganizationContext from "./components/provider/OrganizationProvider";

function App() {
  const queryClient = new QueryClient()

  //@ts-ignore
  // const main = window.__INITIAL_STATE__ || {
  //   "id": 1,
  //   "name": "Тод од карго / Tod od cargo ",
  //   "phone": "80583384",
  //   "phone1": "96268444",
  //   "address": "ХУД Нисэхийн тойрог Буянт-Ухаа спорт цогцолборын хажууд Буман төв 1 давхар",
  //   "slug": "tododcargo",
  //   "national": "Монгол",
  //   "email": "",
  //   "timetable": "09:00-18:00",
  //   "links": {
  //     "url": "https://www.facebook.com/profile.php?id=100045469406962",
  //     "name": "facebook"
  //   },
  //   "description": "Түргэн шуурхай хүргэлт",
  //   "logoUrl": "https://scontent.fuln8-1.fna.fbcdn.net/v/t39.30808-6/489834907_1297475025111465_3016026117957180450_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=th4XPx7zPVkQ7kNvwEhsef1&_nc_oc=AdlTLVwsaremjHhIb9as9Sv3N31Wf2sJs9ahVcVGnqCOQkHydN_l8TlcDD7PUJH4VEY&_nc_zt=23&_nc_ht=scontent.fuln8-1.fna&_nc_gid=WNgDDEzw0u1vELu7sQPARg&oh=00_AfMxC1He2Cd4Pr09nUQh7OU_d5H3CI1I_UdsjFZIAMyEYA&oe=6852D34D",
  //   "state": "ACTIVE",
  //   "createdAt": "2025-06-11T03:23:20.757Z",
  //   "updatedAt": "2025-06-14T00:01:34.667Z",
  //   "initialWarehouseId": 1
  // };

  const main = window.__INITIAL_STATE__ || null;
  console.info("🚀 ~ App ~ main:", main)

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <OrganizationContext.Provider value={{ org: main }}>
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
            <AppRoutes />
          </BrowserRouter>
        </OrganizationContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
