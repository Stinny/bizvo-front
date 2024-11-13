import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './api/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="16474117620-hpevbaar7hqgg173ofovh8acighdpbm2.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);
