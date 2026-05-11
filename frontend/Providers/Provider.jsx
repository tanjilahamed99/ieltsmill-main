"use client";

import { Provider } from "react-redux";
import { store } from "../features/Store";

function RootProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default RootProvider;
