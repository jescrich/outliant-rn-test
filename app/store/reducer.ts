import { AnyAction } from 'redux';
import _ from 'lodash';
import * as ActionTypes from './actionTypes';
import User from '../models/user';
import PagedEntity from '../models/pagedEntity';

interface AppState { // Represents just a global app state for this example.
    users: PagedEntity<User>;
    error?: string;
    isLoading: boolean;
    isLoadingMore: boolean;
}

const initialState: AppState = {
  users: new PagedEntity<User>(),
  isLoading: false,
  isLoadingMore: false,
};

const globalReducer = (state: AppState = initialState, action: AnyAction): AppState => {
  let nextState = state;
  switch (action.type) {
    case ActionTypes.USERS_LOAD_INIT: {
      const { page } = action.payload;
      nextState = { ...state, isLoading: page === 1, isLoadingMore: page > 1 };
      break;
    }
    case ActionTypes.USERS_LOAD_SUCCEED: {
      nextState = {
        ...state,
        isLoading: false,
        isLoadingMore: false,
        users: {
          ...action.payload,
          data: _.unionBy(state.users.data, action.payload.data, 'id'),
        },
      };
      break;
    }
    case ActionTypes.USERS_LOAD_FAILED: {
      nextState = {
        ...state, isLoading: false, isLoadingMore: false, error: action.payload,
      };
      break;
    }
    default:
      nextState = state;
  }
  return nextState;
};

export { globalReducer, AppState };
