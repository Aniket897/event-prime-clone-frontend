import { useDispatch, useSelector } from "react-redux";
import { Signin } from "../../redux/auth/authActions";
import ButtonLoader from "../loader/ButtonLoader";

const SignInForm = () => {
    const dispatch = useDispatch();
    const signInLoading = useSelector(state => state.auth.signInLoading);


    const HandleSignIn = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {};
        for (let [key, value] of form.entries()) {
            data[key] = value;
        }
        dispatch(Signin(data))
    }

    return (
        <form onSubmit={HandleSignIn} className="sm:w-[400px] w-[90vw] p-4 flex flex-col gap-y-3">
            <p className="font-bold text-3xl logo" >👋 welcome user</p >
            <div className="w-full mt-4">
                <p className="inputLabel">Your email</p>
                <input
                    className="formInput"
                    type="email"
                    name="email"
                    required
                />
            </div>
            <div className="w-full">
                <p className="inputLabel">Your password</p>
                <input
                    className="formInput"
                    type="password"
                    name="password"
                    minLength={6}
                    required
                />
            </div>
            <button
                title="sign-in"
                type="submit"
                className="mt-3 p-3 w-full bg-red-500 text-white rounded font-bold">
                {signInLoading ? <ButtonLoader /> : 'SignIn'}
            </button>
            <p className="text-xs mt-4">
                By clicking sign-in, you agree to taskify’s Terms of Service and Privacy Policy.
            </p>
        </form>
    )
}

export default SignInForm;