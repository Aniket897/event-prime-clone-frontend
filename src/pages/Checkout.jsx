import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../components/CheckOutForm';
import axios from '../Utils/axios';
import MainLoader from '../components/loader/MainLoader';
import NoResult from '../components/NoResult';
import { enqueueSnackbar } from 'notistack';

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_KEY}`);



const Checkout = () => {
    const { eventId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const user = useSelector(state => state.auth);
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState(null);


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    useEffect(() => {
        if (eventId) {
            createTicketOrder();
        } else {
            navigate('/')
        }
    }, []);



    const createTicketOrder = () => {
        setLoading(true)
        axios.post(
            `/ticket/create`,
            {
                eventId
            },
            {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${user.token}`
                }
            }).then((response) => {
                console.log(response);
                if (response.data.clientSecret) setClientSecret(response.data.clientSecret)
                else {
                    enqueueSnackbar("puchased successfully", { variant: 'success' })
                    navigate('/my-tickets')
                }
            }).catch((error) => {
                setError(true)
                console.log(error)
            }).finally(() => {
                setLoading(false)
            })
    }

    if (loading) {
        return <MainLoader />
    }

    if (error) {
        return <NoResult mainText={'Somthing went wrong please try again after refreshing page'} />
    }


    return (
        <div>
            <p className='font-bold logo text-center text-2xl mt-6'>Please make payment to create an order</p>
            <div className='h-[70vh] flex items-center justify-center'>
                {
                    clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )
                }
            </div>
        </div>
    )
}

export default Checkout;