import { createSlice } from '@reduxjs/toolkit';

const getInitialAsset = () => {
  // getting asset list
  const localAssetList = window.localStorage.getItem('assetList');
  // if asset list is not empty
  if (localAssetList) {
    return JSON.parse(localAssetList);
  }
  window.localStorage.setItem('assetList', []);
  return [];
};

const initialValue = {
  filterStatus: 'all',
  assetList: getInitialAsset(),
};

export const assetSlice = createSlice({
  name: 'asset',
  initialState: initialValue,
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { updateFilterStatus } =
  assetSlice.actions;
export default assetSlice.reducer;
