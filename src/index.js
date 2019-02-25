import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'

import * as serviceWorker from './serviceWorker';

import configureStore, {history} from './configureStore';

import App from "./App";


const store = configureStore();


//Configuration react et redux
ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistStore(store)} loading={null}>
            <App history={history}/>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
