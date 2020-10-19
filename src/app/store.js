import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import apartmentsReducer, { apartmentsSaga } from '../features/apartments/apartmentsSlice';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

/** For synchronous reduction of actions */
const rootReducer = combineReducers({
  apartments: apartmentsReducer
});

/** For asynchronous reduction of actions */
const rootSaga = function* (){
  yield all([
      ...apartmentsSaga
  ])
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

export default store;
