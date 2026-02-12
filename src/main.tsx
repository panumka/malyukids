
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { bootstrapAnalyticsConsent } from "./app/lib/analytics";

bootstrapAnalyticsConsent();

createRoot(document.getElementById("root")!).render(<App />);
  
