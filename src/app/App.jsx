import React from "react";
import Layout from "../components/Layout";
import AppRoutes from "./routes";
import { FocusModeProvider } from "../contexts/FocusModeContext";
import FocusModeBar from "../components/FocusModeBar";

const App = () => {
  return (
    <FocusModeProvider>
      <FocusModeBar />
      <Layout>
        <AppRoutes />
      </Layout>
    </FocusModeProvider>
  );
};

export default App;
