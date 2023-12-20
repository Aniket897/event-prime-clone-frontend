import { useSearchParams } from "react-router-dom";
import Divider from "../components/Divider";
import SearchBox from "../components/SearchBox";
import axios from '../Utils/axios';
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import MainLoader from "../components/loader/MainLoader";
import NoResult from "../components/NoResult";




const Search = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchResult = async () => {
        setLoading(true)
        const response = await axios.get(`/event/get-events?query=${searchParams.get('query')}`);
        if (response.data.events) setEvents(response.data.events);
        setLoading(false)
    }

    useEffect(() => {
        fetchResult();
    }, [searchParams]);


    const handleSetParams = (e) => {
        setSearchParams({ "query": e.target.value })
    }


    const renderEvents = () => {
        if (loading) {
            return <MainLoader />
        } else if (events.length == 0) {
            return <NoResult mainText={'No result found'} subText={"try somthing else"} />
        } else {
            return <div className="cardContainer mt-[70px]">
                {events.map((item, index) => <EventCard event={item} key={index} />)}
            </div>
        }
    }


    return (
        <div className="min-h-screen">
            <Divider text={"What are you looking for ?"} />
            <div className='w-[80vw]  mx-auto mt-12 flex items-center justify-between max-md:flex-col max-md:gap-y-5'>
                <SearchBox onchange={handleSetParams} />
            </div>
            {renderEvents()}
        </div>
    )
}

export default Search;