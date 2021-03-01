import { createSlice } from '@reduxjs/toolkit';
import { httpClient, UserService } from 'api';
import { Repository, User } from 'api/services/models';

const userService = new UserService(httpClient);

export interface UserListState {
  data?: User;
  loading: boolean;
  myStarredRepos: Repository[];
  userStarredRepos: Repository[];
}

const initialState: UserListState = {
  data: undefined,
  loading: false,
  myStarredRepos: [],
  userStarredRepos: [],
};

// User slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserStarredRepos: (state, action) => {
      state.userStarredRepos = action.payload;
    },
    setMyStarredRepos: (state, action) => {
      state.myStarredRepos = action.payload;
    },
  },
});

// Actions
export const {
  setData,
  setLoading,
  setUserStarredRepos,
  setMyStarredRepos,
} = userSlice.actions;

// Async thunk to load data
export const loadData = (username: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));

    const [user, repos] = await Promise.allSettled([
      userService.get(username),
      userService.getStarredRepos(username),
    ]);

    dispatch(setLoading(false));

    if (user && user.status === 'fulfilled') {
      dispatch(setData(user.value));
    }

    if (repos && repos.status === 'fulfilled') {
      dispatch(setUserStarredRepos(repos.value));
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setData(undefined));
  }
};

// Selector
export const userSelector = (state: any): UserListState => state.user;

// Reducer
export default userSlice.reducer;
