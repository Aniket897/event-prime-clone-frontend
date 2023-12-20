import { Link } from 'react-router-dom';
import { Calendar, MapPin } from '@phosphor-icons/react';
import convertStartDate from '../Utils/coverStartDate';
import { useSelector } from 'react-redux';


const EventCard = ({ event }) => {
    const user = useSelector(state => state.auth);

    return (
        <Link to={user.user.userId == event.owner._id ? `/orders/${event._id}` : `/event/${event._id}`}>
            <div className="w-full  overflow-hidden text-xs shadow">
                <div className="w-full h-[170px] relative">
                    <img
                        className="w-full h-full object-cover brightness-50"
                        src={event.image} alt="" />
                    <p className="py-1 px-3 bg-red-500  text-white absolute right-2 top-7">{event.price == 0 ? 'FREE' : "₹" + event.price}</p>
                    <p className="text-[20px] w-[90%] truncate py-2 absolute bottom-3 left-7 text-white">{event.title}</p>
                </div>
                <div className="gap-3 flex flex-col px-3 py-4">
                    <p className='flex items-center gap-1'>
                        <Calendar className='mt-[-3px]' size={15} />
                        {convertStartDate(event.startDate)}
                    </p>
                    <p className='flex items-center gap-1'>
                        <MapPin className='mt-[-3px]' size={15} />
                        {event.location}
                    </p>
                    <p className="py-1 px-3 w-fit border border-gray-300 rounded-full text-gray-800">
                        {event.category}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default EventCard;