import { Link } from 'react-router-dom';
import Divider from '../components/Divider';
import HeroSection from '../components/HeroSection'
import PopularEvents from '../components/PopularEvents';


const HomePage = () => {


    return (
        <>
            <HeroSection />
            <Divider text='Some popular Events' />
            <PopularEvents />
            <div className='w-[80vw] mx-auto mt-[50px]'>
                <div className='sm:w-fit'>
                    <Link to={'/search?query='}>
                        <button className='button'>explore more</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HomePage;