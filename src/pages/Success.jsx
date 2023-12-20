import { CheckCircle } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../Utils/axios';

const Success = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        HandlePayment()
    })


    const HandlePayment = async () => {
        
        await axios.post('/ticket/payment-done', {
            paymentIntent: searchParams.get("payment_intent")
        });
        setTimeout(() => {
            navigate('/my-tickets')
        }, 5000);
    }


    
    return (
        <div className='flex items-center flex-col justify-center h-[90vh] gap-6'>
            <div className='flex flex-col items-center text-3xl font-bold text-green-600'>
                <CheckCircle size={100} />
                <p>Success</p>
            </div>
            <p>please do not close page you will automatically redirected to homepage</p>
        </div>
    )
}

export default Success;