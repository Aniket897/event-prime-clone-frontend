import { Link, useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import Divider from "../components/Divider";
import axios from "../Utils/axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MainLoader from "../components/loader/MainLoader";






const Orders = () => {
    const { eventId } = useParams();
    const user = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        fetchOrders();
    }, [])

    const fetchOrders = async () => {
        setLoading(true)
        const response = await axios.get(`/event/orders/${eventId}`, {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        setLoading(false)
        console.log(response)
        if (response.data.orders) setOrders(response.data.orders);
        if (response.error) {
            console.log(response.error.message)
        }
    }


    
    return (
        <div className="w-screen mx-auto flex flex-col gap-y-6 min-h-screen">
            <Divider text={'Orders'} />
            {
                loading ? <MainLoader />
                    :
                    <table className="w-[80vw] mx-auto text-center">
                        <thead className="bg-gray-100 text-gray-800">
                            <tr>
                                <th className="py-3">user</th>
                                <th className="py-3">ticket id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="">
                                                <Link className="flex py-3 items-center justify-center gap-3" to={`/profile/${item.buyer._id}`}>
                                                    <Avatar imgUrl={item.buyer.picture} />
                                                    <p>{item.buyer.name}</p>
                                                </Link>
                                            </td>
                                            <td className="py-3">
                                                {item._id}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default Orders;