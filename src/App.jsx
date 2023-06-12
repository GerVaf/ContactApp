import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import RouteGuard from "./components/RouteGuard";
import Edit from "./pages/Edit";
import Favourite from "./pages/Favourite";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <RouteGuard>
              <Home />
            </RouteGuard>
          }
        />
        <Route
          path="/favourite"
          element={
            <RouteGuard>
              <Favourite />
            </RouteGuard>
          }
        />
        <Route
          path="/contacts/:id"
          element={
            <RouteGuard>
              <Detail />
            </RouteGuard>
          }
        />
        <Route
          path="/create"
          element={
            <RouteGuard>
              <Create />
            </RouteGuard>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <RouteGuard>
              <Edit />
            </RouteGuard>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
