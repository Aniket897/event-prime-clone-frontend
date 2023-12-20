import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: "",
    signInLoading: false,
    signUploading: false,
    user: {
        email: "",
        userId: "",
        picture: "",
        name: "",
        description: ""
    }
}


const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        signin(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.data;
        },
        toggleSignInLoading(state) {
            state.signInLoading = !state.signInLoading
        },
        toggleSignUpLoading(state) {
            state.signUploading = !state.signUploading
        },
        setUser(state, action) {
            state.user = action.payload
        },
        logout(state) {
            state.token = "";
            state.user = {
                email: "",
                userId: "",
                picture: "",
                name: ""
            }
        }
    }
});



export const {
    signin,
    toggleSignInLoading,
    toggleSignUpLoading,
    logout,
    setUser
} = slice.actions;
export default slice.reducer;