import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { globalReducer } from './reducer';

const rootReducer = combineReducers({
  appState: globalReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger(),
  ),
);

export default store;

export type RootState = ReturnType<typeof rootReducer>
