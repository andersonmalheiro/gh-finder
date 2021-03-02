import { createSlice } from '@reduxjs/toolkit';
import { httpClient, UserService } from 'api';
import { Repository, User } from 'api/services/models';

const userService = new UserService(httpClient);

export interface UserListState {
  data?: User;
  loading: boolean;
  loadingRepos: boolean;
  myStarredRepos: Repository[];
  userStarredRepos: Repository[];
}

const initialState: UserListState = {
  data: undefined,
  loading: false,
  loadingRepos: false,
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
    setLoadingRepos: (state, action) => {
      state.loadingRepos = action.payload;
    },
    setUserStarredRepos: (state, action) => {
      state.userStarredRepos = action.payload;
    },
    setMyStarredRepos: (state, action) => {
      state.myStarredRepos = action.payload;
    },
    likeRepo: (state, action) => {
      const favIds = state.myStarredRepos.map((r) => r.id);
      if (!favIds.includes(action.payload.id)) {
        state.myStarredRepos = [...state.myStarredRepos, action.payload];
        state.userStarredRepos = state.userStarredRepos.map((repo) => {
          if (repo.id === action.payload.id) {
            repo.selected = true;
          }

          return { ...repo };
        });
        localStorage.setItem(
          'liked_repos',
          JSON.stringify(state.myStarredRepos)
        );
      }
    },
    dislikeRepo: (state, action) => {
      state.myStarredRepos = state.myStarredRepos.filter(
        (repo) => repo.id !== action.payload.id
      );

      state.userStarredRepos = state.userStarredRepos.map((repo) => {
        if (repo.id === action.payload.id) {
          repo.selected = false;
        }

        return { ...repo };
      });

      localStorage.setItem('liked_repos', JSON.stringify(state.myStarredRepos));
    },
  },
});

// Actions
export const {
  setData,
  setLoading,
  setLoadingRepos,
  setUserStarredRepos,
  setMyStarredRepos,
  likeRepo,
  dislikeRepo,
} = userSlice.actions;

// Async thunk to load data
export const loadData = (username: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));

    const user = await userService.get(username);

    if (user) {
      dispatch(setLoading(false));
      dispatch(setData(user));

      dispatch(setLoadingRepos(true));
      const repos = await userService.getStarredRepos(username);

      if (repos) {
        let formatedRepos: Repository[] = [];

        const likedRepos = localStorage.getItem('liked_repos');
        if (likedRepos) {
          const parsed = JSON.parse(likedRepos) as Array<Repository>;
          if (parsed.length) {
            const ids = parsed.map((repo) => repo.id);
            formatedRepos = repos.map((repo) => {
              repo.selected = ids.includes(repo.id);
              return repo;
            });
          } else {
            formatedRepos = repos;
          }
        } else {
          formatedRepos = repos;
        }

        dispatch(setLoadingRepos(false));
        dispatch(setUserStarredRepos(formatedRepos));
      }
    }
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(setLoadingRepos(false));
    dispatch(setData(undefined));
    dispatch(setUserStarredRepos([]));
  }
};

// Selector
export const userSelector = (state: any): UserListState => state.user;

// Reducer
export default userSlice.reducer;
