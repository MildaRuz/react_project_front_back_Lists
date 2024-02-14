import './App.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import AuthCtxProvider from './store/AuthCtxtProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <AuthCtxProvider>
        <App />
      </AuthCtxProvider>
    </BrowserRouter>
  </>
);
