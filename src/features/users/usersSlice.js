import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [];
export const fetchUsers = createAsyncThunk('users/fetchUers', async () => {
  try {
    const res = await fetch(USERS_URL);
    const data = res.json();
    return data;
  } catch (err) {
    return err;
  }
});
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
