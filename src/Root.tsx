import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactsPage } from './pages/ContactsPage';
import { HelpPage } from './pages/HelpPage';
import { App } from './App';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardPage } from './pages/DashboardPage';
import { JournalPage } from './pages/JournalPage';
import { GasPage } from './pages/GasPage';
import { ReminderPage } from './pages/ReminderPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { store } from './app/store';
import { CarsPage } from './pages/CarsPage';

export const Root = () => (
  <StrictMode>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="register" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="dashboard" element={<DashboardPage />}>
                <Route path="journal" element={<JournalPage />} />
                <Route path="gas" element={<GasPage />} />
                <Route path="reminder" element={<ReminderPage />} />
                <Route path="statistics" element={<StatisticsPage />} />
                <Route path="cars" element={<CarsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<p>Not found page</p>} />
            {/* <Route path="dashboard" element={<DashboardPage />}>
              <Route path="journal" element={<JournalPage />} />
              <Route path="gas" element={<GasPage />} />
              <Route path="reminder" element={<ReminderPage />} />
              <Route path="statistics" element={<StatisticsPage />} />
              <Route path="cars" element={<CarsPage />} />
            </Route> */}
          </Route>
        </Routes>
      </Provider>
    </Router>
  </StrictMode>
);
