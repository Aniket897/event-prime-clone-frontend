import {
    MapPin,
    PencilCircle,
    Ticket
} from "@phosphor-icons/react";
import { useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import MainLoader from "../components/loader/MainLoader";
import NoResult from "../components/NoResult";
import Avatar from "../components/Avatar";
import axios from "../Utils/axios";
import convertStartDate from '../Utils/coverStartDate'




const EventDetailsPage = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(false)
    const [eventError, setEventError] = useState(false)
    const user = useSelector(state => state.auth);
    const navigate = useNavigate();


    useEffect(() => {
        fetchEvent()
    }, []);


    const fetchEvent = async () => {
        setLoading(true);
        await axios.get(`/event/get-event/${eventId}`)
            .then((response) => {
                setEvent(response.data.event)
            }).catch(() => {
                setEventError(true)
            }).finally(() => setLoading(false))
    }


    if (loading) {
        return <MainLoader />
    }

    if (eventError) {
        return <NoResult mainText='Event Ended or Not avilable' />
    }





    // if user is owner of event ? edit button : buy tickets
    const renderButton = () => {
        if (event.owner._id == user.user.userId) {
            return <button className="button">
                <PencilCircle size={20} weight="fill" />
                Edit
            </button>
        } else {
            return <button onClick={() => navigate(user.token ? `/checkout/${event._id}` : "/sign-in")} className="button">
                <Ticket size={20} weight="light" />
                Buy Tickets
            </button>
        }
    }






    return event && (
        <div className="min-h-screen w-screen">
            <div className={`w-screen overflow-hidden h-[350px] relative`}>
                <img
                    className="w-full h-full object-cover"
                    src={event.image}
                    alt="" />
                <div className="bg-black h-full top-0 absolute w-full opacity-50"></div>
                <div className="absolute bottom-4 md:left-[100px] text-white">
                    <p className="text-3xl">{event.title}</p>
                    <p className="flex items-center gap-1 mt-7">
                        <MapPin size={25} weight="light" />
                        <p>{event.location}</p>
                    </p>
                </div>
            </div>
            <div className="w-[80vw] mx-auto gap-[30px] flex justify-between mt-[100px] max-md:flex-col">
                <div className="md:w-[50%] w-full flex flex-col gap-y-10">
                    <div>
                        <p className="uppercase font-semibold pb-3">Description :</p>
                        <p>{event.description}</p>
                    </div>
                    <div>
                        <p className="uppercase font-semibold pb-3">Date and time</p>
                        <p>{convertStartDate(event.startDate)}</p>
                    </div>
                    <div>
                        <p className="uppercase font-semibold pb-3">location</p>
                        <p>{event.location}</p>
                    </div>
                    <div>
                        <p className="uppercase font-semibold pb-3">category</p>
                        <p>{event.category}</p>
                    </div>
                    <div>
                        <p className="uppercase font-semibold pb-3">ABOUT THE ORGANIZER</p>
                        <Link to={`/profile/${event.owner._id}`} className="flex gap-5 items-center ">
                            <Avatar imgUrl={event.owner.picture}  />
                            <p>{event.owner.name}</p>
                        </Link>
                    </div>
                </div>
                <div className="md:w-[40%]">
                    {renderButton()}
                </div>
            </div>
        </div>

    )
}

export default EventDetailsPage;

