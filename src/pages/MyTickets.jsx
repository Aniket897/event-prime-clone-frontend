


import { useEffect, useState } from "react";
import NoResult from "../components/NoResult";
import { useSelector } from "react-redux";
import MainLoader from "../components/loader/MainLoader";
import axios from "../Utils/axios";
import TicketCard from "../components/TicketCard";



const MyTickets = () => {

    const user = useSelector(state => state.auth);
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getMyEvents();
    }, []);



    const getMyEvents = async () => {
        setLoading(true)
        const response = await axios.get('/ticket/get-my-tickets', {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });
        setLoading(false)
        if (response.data.tickets) setEvents(response.data.tickets)
    }


    const renderEvents = () => {
        if (loading) {
            return <MainLoader />
        } else if (events.length == 0) {
            return <NoResult mainText='You havents buy any tickets yet' />
        } else {
            return <div className='mt-[50px] cardContainer'>
                {events?.map((item, index) =>  <TicketCard key={index} ticket={item} />)}
            </div>
        }
    }



    return (
        <div className="min-h-[90vh]">
            <div className=" w-[80vw] mx-auto flex items-center justify-between mt-[50px]">
                <p className="logo font-bold text-3xl">My Tickets</p>
                <button
                    className="py-3 px-5 w-fit rounded-full container font-bold text-white bg-red-500">
                    Explore
                </button>
            </div>

            {renderEvents()}

        </div>
    )
}

export default MyTickets;