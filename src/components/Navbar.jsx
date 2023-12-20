import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import Avatar from "./Avatar";
import { useState } from "react";
import UserNavigations from "./UserNavigations";
import { marketingNav, userNav } from "../data";
import { List } from "@phosphor-icons/react";
import Sidebar from "./Sidebar";




const Navbar = () => {
    const user = useSelector(state => state.auth);
    const [showUserNav, setShowUserNav] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false)

    const toggleUserNav = () => {
        setShowUserNav(!showUserNav);
    }


    const renderNav = () => {
        if (user.token) {
            return userNav.map((item, index) => (
                <Link
                    className="duration-300 uppercase text-sm hover:text-red-500"
                    to={item.href}
                    key={index}>
                    {item.name}
                </Link>
            ))
        } else {
            return marketingNav.map((item, index) => (
                <Link
                    className="duration-300 uppercase text-sm  hover:text-red-500"
                    to={item.href}
                    key={index}>
                    {item.name}
                </Link>
            ))
        }

    }


    return (
        <div className="w-[100vw]  py-5 border-b border-b-gray-200 shadow-sm">
            <div className="w-[90vw] mx-auto flex items-center justify-between">
                <Link
                    to={'/'}
                    className="logo font-bold text-3xl text-red-500">
                    EventPrime
                </Link>
                <div className="flex items-center gap-7">
                    <div className="flex max-md:hidden items-center gap-[50px]">
                        {renderNav()}
                    </div>
                    {
                        user.token ? (
                            <div onClick={toggleUserNav}>
                                <Avatar imgUrl={user.user.picture} />
                            </div>
                        ) : (
                            <Link
                                to={'/sign-in'}>
                                <button
                                    className="py-2 uppercase px-4 rounded-full container font-bold text-white bg-red-500">
                                    SignIn
                                </button>
                            </Link>
                        )
                    }
                    <div className="md:hidden" onClick={() => setShowSidebar(true)}>
                        <List size={20} />
                    </div>
                </div>
            </div>
            {(user.token && showUserNav) && <UserNavigations state={setShowUserNav} />}
            {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
        </div>
    )
}

export default Navbar;