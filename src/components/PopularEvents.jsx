

import MainLoader from "./loader/MainLoader";
import NoResult from "./NoResult";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import axios from "../Utils/axios";



const PopularEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getPopularEvents()
    }, [])

    const getPopularEvents = async () => {
        setLoading(true)
        const response = await axios.get('/event/get-popular-events')
        if (response.data.events) setEvents(response.data.events);
        setLoading(false)

    }



    if (loading) {
        return <MainLoader />
    }

    if (events.length == 0) {
        return <NoResult
            mainText={"Somthing Went Wrong"}
            subText={'Please try after the refreshing page'}
        />
    }

    return (
        <div className='mt-[50px] cardContainer'>
            {events.map((item, index) => <EventCard event={item} key={index} />)}
        </div >
    )

}

export default PopularEvents;