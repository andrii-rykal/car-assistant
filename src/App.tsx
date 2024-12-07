// import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  )
}
