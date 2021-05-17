import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import listReducer from '../components/listSlice';
import createSagaMiddleware from "redux-saga";
import saga from './sagas'

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export default configureStore({
  reducer: {
    list: listReducer,
  },
  middleware
});

sagaMiddleware.run(saga)