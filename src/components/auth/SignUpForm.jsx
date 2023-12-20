import { useDispatch, useSelector } from "react-redux";
import { Signup } from "../../redux/auth/authActions";
import ButtonLoader from "../loader/ButtonLoader";
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate()
    const signUploading = useSelector(state => state.auth.loading);

    const HandleSignUp = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = {};
        for (let [key, value] of form.entries()) {
            data[key] = value;
        }
        await dispatch(Signup(data)).then(() => navigate('/sign-in'))
    }


    return (
        <form onSubmit={HandleSignUp} className="sm:w-[400px] w-[90vw] p-4 flex flex-col gap-y-3">
            <p className="font-bold  logo text-3xl">Create an account</p>
            <div className="w-full mt-6">
                <p className="inputLabel">Full name</p>
                <input
                    className="formInput"
                    type="text"
                    name="name"
                    minLength={4}
                />
            </div>
            <div className="w-full">
                <p className="inputLabel">Your email</p>
                <input
                    className="formInput"
                    type="email"
                    name="email"
                />
            </div>
            <div className="w-full">
                <p className="inputLabel">Your password</p>
                <input
                    className="formInput"
                    type="password"
                    name="password"
                    required
                    minLength={6}
                />
            </div>
            <button
                type="submit"
                className="mt-3 p-3 w-full bg-red-500 text-white rounded font-bold">
                {signUploading ? <ButtonLoader /> : "SignUp"}
            </button>
            <p className="text-xs mt-4">
                By clicking sign-up, you agree to taskify’s Terms of Service and Privacy Policy.
            </p>
        </form>
    )
}

export default SignUpForm;