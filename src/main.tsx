import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { makeServer } from "./services/mirage";
import { theme } from "./styles/theme";
import { PaymentWizardProvider } from "./contexts/PaymentWizardContext";

makeServer();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PaymentWizardProvider>
        <App />
      </PaymentWizardProvider>
    </ChakraProvider>
  </React.StrictMode>
);
