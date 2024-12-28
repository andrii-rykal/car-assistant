// import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import 'bulma/bulma.scss';
import '@fortawesome/fontawesome-free/css/all.css';

import { Header } from "./components/Header";

export const App = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  )
}
