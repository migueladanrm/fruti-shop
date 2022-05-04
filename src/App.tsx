import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppView } from "./views";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppView />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
