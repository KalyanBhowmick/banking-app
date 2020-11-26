import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    rootElement,
);
