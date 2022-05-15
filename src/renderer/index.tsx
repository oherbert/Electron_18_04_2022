import { createRoot } from 'react-dom/client';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { AppContext } from './context/AppContext';
import { GlobalStyles } from './styles/global-styles';
import { lightTheme } from './styles/themes';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <ThemeProvider theme={lightTheme}>
    <GlobalStyles />
    <AppContext>
      <Router>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </AppContext>
  </ThemeProvider>
);
