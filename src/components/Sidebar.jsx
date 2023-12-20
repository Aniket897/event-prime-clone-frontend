import { useSelector } from "react-redux";
import { marketingNav, userNav } from "../data";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Sidebar = ({ setShowSidebar }) => {
    const user = useSelector(state => state.auth);
    const ref = useRef();



    const HandleClickOutSide = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setShowSidebar(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', HandleClickOutSide, true);
        return () => {
            document.removeEventListener('click', HandleClickOutSide, true);
            setShowSidebar(false)
        }
    }, []);


    const renderNav = () => {
        if (user.token) {
            return userNav.map((item, index) => (
                <Link
                    onClick={() => setShowSidebar(false)}
                    className="duration-300 uppercase text-sm hover:text-red-500"
                    to={item.href}
                    key={index}>
                    {item.name}
                </Link>
            ))
        } else {
            return marketingNav.map((item, index) => (
                <Link
                    onClick={() => setShowSidebar(false)}
                    className="duration-300 uppercase text-sm  hover:text-red-500"
                    to={item.href}
                    key={index}>
                    {item.name}
                </Link>
            ))
        }

    }

    return (
        <div 
            ref={ref} 
            className="flex shadow-sm border-l border-l-gray-200 absolute z-10 top-0 right-0 h-screen bg-white gap-7 items-center justify-center flex-col p-3 w-[80vw] md:hidden">
            {renderNav()}
        </div>
    )
}

export default Sidebar;