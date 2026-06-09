import { UserRoute } from "@/Providers/PrivateRoute";
import React from "react";

const layout = ({ children }) => {
  return <UserRoute>{children}</UserRoute>;
};

export default layout;
