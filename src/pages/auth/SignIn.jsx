import { Link } from "react-router-dom";
import SignInForm from "../../components/auth/SignInForm";

const SignIn = () => {
    return (
        <div className='flex items-center flex-col gap-4 justify-center w-screen h-[80vh]'>
            <SignInForm />
            <p>not a user <Link className="link" to={'/sign-up'}>sign-up</Link> now</p>
        </div>
    )
}

export default SignIn;