import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'              //./_reducers/index.js에서 index.js는 생략 가능
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)
//redux-thunk, redux-primise ==> store은 원래 객체밖에 받지 못하지만 thunk, promise모듈로 function, promise까지 받게 해준다. 

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

