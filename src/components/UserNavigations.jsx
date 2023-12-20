import { SignOut, UserCircle } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'
import { logout } from '../redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'




const UserNavigations = ({ state }) => {
    const ref = useRef();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const HandleClickOutSide = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            state(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', HandleClickOutSide, true);
        return () => {
            document.removeEventListener('click', HandleClickOutSide, true);
            state(false)
        }
    }, []);




    return (
        <div ref={ref} className="absolute top-20 right-3 shadow-sm border border-gray-200 rounded-sm w-[200px] bg-white">
            <Link
                onClick={() => state(false)}
                to ={`/profile/${user.userId}`}
                className="p-4 hover:bg-gray-100 cursor-pointer gap-3 duration-300 flex items-center "
            >
                <UserCircle size={20} weight="fill" />
                Profile
            </Link>
            <p
                onClick={() => dispatch(logout())}
                className="p-4 hover:bg-gray-100 cursor-pointer gap-3 duration-300 flex items-center "
            >
                <SignOut size={20} weight="fill" />
                Logout
            </p>

        </div>
    )
}

export default UserNavigations;