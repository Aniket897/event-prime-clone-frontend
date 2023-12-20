


import { useEffect, useState } from "react";
import EditProfile from "../components/EditProfile";
import NoResult from "../components/NoResult";
import { useParams } from "react-router-dom";
import axios from "../Utils/axios";
import MainLoader from "../components/loader/MainLoader";
import EventCard from "../components/EventCard";
import { useSelector } from 'react-redux';




const Profile = () => {
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { userId } = useParams();
    const [events, setEvents] = useState([]);
    const loggedUser = useSelector(state => state.auth)


    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async () => {
        setLoading(true)
        axios.get(`/user/get/${userId}`)
            .then((response) => {
                setUser(response.data.user);
                setEvents(response.data.events)
            }).catch(() => {
                setError(false)
            }).finally(() => {
                setLoading(false)
            })
    }

    if (loading) {
        return <MainLoader />
    }

    if (error || !user) {
        return <NoResult mainText='User not found' />
    }



    return (
        <div className="min-h-screen pb-[100px] w-[90vw] sm:w-[80vw] mx-auto">
            <div className="mt-20 flex gap-6 items-center">
                <div className="w-[100px] rounded-full overflow-hidden h-[100px]">
                    <img className="w-full h-full object-cover" src={user.picture} alt="" />
                </div>
                <div>
                    <p className="font-bold text-2xl">{user.name}</p>
                    {loggedUser.user.userId == user._id &&
                        <button className="bg-green-200 text-green-800 rounded-md px-3" onClick={() => setShowEditProfile(true)}>Update Profile</button>
                    }
                </div>
            </div>
            <div className="mt-8">
                <p>Description :</p>
                <p>{user.description}</p>
            </div>
            <div className="mt-8">
                <p className="font-bold text-3xl">Events Organized</p>
                {events.length == 0 && <NoResult mainText='no events Organized Yet' />}
                {events.length > 0 && <div className='mt-[50px] w-[80vw] mx-auto gap-9 sm:grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3'>
                    {events?.map((item, index) => <EventCard event={item} key={index} />)}
                </div>}
            </div>
            {showEditProfile && <EditProfile close={setShowEditProfile} />}
        </div>
    )
}

export default Profile;