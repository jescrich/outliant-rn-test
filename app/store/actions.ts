import { Dispatch } from 'redux';
import * as ActionTypes from './actionTypes';
import UsersService from '../services/users';
import { RootState } from '.';
import PagedEntity from '../models/pagedEntity';
import User from '../models/user';

const getRandomUsers = (page = 1) => (dispatch: Dispatch, getState: () => RootState) => {
  const { appState } = getState();
  if (appState.isLoading === false && appState.isLoadingMore === false) { // prevent loading twice
    dispatch({
      type: ActionTypes.USERS_LOAD_INIT,
      payload: { page },
    });

    UsersService.getUsers(page).then((r) => {
      // An example how to map a response to a local model, can be done using different approaches.
      const pagedEntity = {
        data: r.data,
        page: r.page,
        pageSize: r.per_page,
        totalRecords: r.total,
        totalPages: r.total_pages,
      } as PagedEntity<User>;

      dispatch({
        type: ActionTypes.USERS_LOAD_SUCCEED,
        payload: pagedEntity,
      });
    }).catch((e) => {
      dispatch({
        type: ActionTypes.USERS_LOAD_FAILED,
        payload: e,
      });
    });
  }
};

export default {
  getRandomUsers,
};
