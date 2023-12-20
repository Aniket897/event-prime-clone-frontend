import { Link } from "react-router-dom"
import SignUpForm from "../../components/auth/SignUpForm"

const SignUp = () => {
    return (
        <div className="flex items-center flex-col justify-center w-screen h-[80vh] gap-3">
            <SignUpForm />
            <p>already a user <Link className="link" to={'/sign-in'}>sign-in</Link></p>
        </div>
    )
}

export default SignUp