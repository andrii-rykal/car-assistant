import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactsPage } from './pages/ContactsPage';
import { HelpPage } from './pages/HelpPage';
import { store } from './app/store';
import { App } from './App';
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';

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
            <Route path='*' element={<p>Not found page</p>} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  </StrictMode>
);
