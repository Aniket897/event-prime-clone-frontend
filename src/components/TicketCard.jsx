import { Calendar, Clipboard, MapPin } from "@phosphor-icons/react";
import convertStartDate from "../Utils/coverStartDate";

const TicketCard = ({ ticket }) => {
    return (
        <div className="w-full  overflow-hidden text-xs shadow">
            <div className="w-full h-[170px] relative">
                <img
                    className="w-full h-full object-cover brightness-50"
                    src={ticket.event.image} alt="" />
                <p className="text-[20px] w-[90%] truncate py-2 absolute bottom-3 left-7 text-white">{ticket.event.title}</p>
            </div>
            <div className="gap-3 flex flex-col px-3 py-4">
                <p className='flex items-center gap-1'>
                    <Calendar className='mt-[-3px]' size={15} />
                    {convertStartDate(ticket.event.startDate)}
                </p>
                <p className='flex items-center gap-1'>
                    <MapPin className='mt-[-3px]' size={15} />
                    {ticket.event.location}
                </p>
                <p
                    className="py-1 px-3 w-fit cursor-pointer border border-gray-300 rounded-full text-gray-800">
                    {ticket._id}
                </p>
            </div>
        </div>
    )
}

export default TicketCard;