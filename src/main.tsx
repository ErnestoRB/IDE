import ReactDOM from "react-dom/client";
import App from "./App";
import Modal from "react-modal";
import "./menuEvents";
import "./styles.css";
import "@fontsource/inter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);

Modal.setAppElement("#root");
