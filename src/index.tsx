import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from './contexts/theme';
import { GamepadProvider } from './contexts/gamepad';
import { initI18n } from './lib/i18n';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    await navigator.serviceWorker.register('/sw.js');
  });
}

initI18n().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider>
        <GlobalStyle />
        <GamepadProvider>
          <App />
        </GamepadProvider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('app')
  );
});
