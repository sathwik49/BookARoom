import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import QueryProvider from "./providers/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <GoogleOAuthProvider clientId={import.meta.env["VITE_GOOGLE_CLIENT_ID"]}>
        <App />
        <Toaster position="top-right" />
      </GoogleOAuthProvider>
    </QueryProvider>
  </StrictMode>,
);
