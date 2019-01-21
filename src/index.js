import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import configureStore from './store/configureStore';
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux'
import thunk from 'thunk'
import rootReducer from './reducers/rootReducer'

const store = configureStore(rootReducer, applyMiddleware(thunk));

window.store = store;

ReactDOM.render(
    (<Provider store={store}>
        <App />
    </Provider>), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
