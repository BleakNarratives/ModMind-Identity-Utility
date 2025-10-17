import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// FIX: Import AiContext and ai instance from utils.ts to prevent circular dependency.
import { AiContext, ai } from './utils';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AiContext.Provider value={ai}>
      <App />
    {/* FIX: Corrected typo in closing tag from 'AixContext' to 'AiContext'. */}
    </AiContext.Provider>
  </React.StrictMode>
);
