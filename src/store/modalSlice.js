import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    stateModal: false,
    loginModal:false,
    describeLoginModal:"",
  },
  reducers: {
    openStateModal : (state) => {state.stateModal = true;},
    closeStateModal: (state) => {state.stateModal = false;},
    openLoginModal : (state) => {state.loginModal = true;},
    closeLoginModal: (state) => {state.loginModal = false;},
    setDescribe :(state,actions)=>{state.describeLoginModal=actions.payload}
  },
});

export const { openStateModal, closeStateModal, openLoginModal, closeLoginModal,setDescribe } = modalSlice.actions;
export const showStateModal = (state) => state.modal.stateModal;
export const showLoginModal = (state) => state.modal.loginModal;
export const describeLoginModal =(state) => state.modal.describeLoginModal;

export default modalSlice.reducer;
