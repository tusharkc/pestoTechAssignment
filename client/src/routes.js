import React from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutesConstants } from "./constants/appRoutes";
import { LoginOrSignUp, Todos } from "./features";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={appRoutesConstants.LOGIN_OR_SIGN_UP_PATH}
        element={<LoginOrSignUp />}
      />
      <Route path={appRoutesConstants.TODOS} element={<Todos />} />
    </Routes>
  );
};

export default AppRoutes;
