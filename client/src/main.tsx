import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@themesberg/flowbite';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <React.StrictMode>
                <CookiesProvider>
                    <App />
                </CookiesProvider>
            </React.StrictMode>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
