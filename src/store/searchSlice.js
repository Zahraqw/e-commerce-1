import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchValue: '',
  },
  reducers: {
    setSearch: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export const searchValue =(state) => state.search.searchValue;

export default searchSlice.reducer;
