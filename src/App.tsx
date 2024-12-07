import { Route, Routes } from "react-router-dom";
// import styles from "./App.module.scss";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactsPage } from "./pages/ContactsPage";
import { HelpPage } from "./pages/HelpPage";
// import { Counter } from "./components/Counter";

export const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </div>
  )
}
