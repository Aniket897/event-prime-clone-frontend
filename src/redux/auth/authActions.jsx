import axios from '../../Utils/axios';
import { enqueueSnackbar } from 'notistack';
import {signin, toggleSignInLoading, toggleSignUpLoading } from './authSlice';





export function Signin(data) {
    return async (dispatch) => {
        dispatch(toggleSignInLoading())
        axios.post('/auth/sign-in', data)
            .then((response) => {
                console.log(response.data);
                enqueueSnackbar(response.data.message, { variant: 'success' });
                dispatch(signin(response.data))
            }).catch((error) => {
                console.log('error', error)
                enqueueSnackbar(error.message, { variant: 'error' })
            }).finally(() => {
                dispatch(toggleSignInLoading())
            })
    }
}



export function Signup(data) {
    return async (dispatch) => {
        dispatch(toggleSignUpLoading())
        axios.post('/auth/sign-up', data)
            .then((response) => {
                console.log(response.data);
                enqueueSnackbar(response.data.message, { variant: 'success' })
            }).catch((error) => {
                console.log(error)
                enqueueSnackbar(error.message, { variant: 'error' })
            }).finally(() => {
                dispatch(toggleSignUpLoading())
            })
    }
}


