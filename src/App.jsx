import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EventDetailsPage from './pages/EventDetailsPage'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import MyTickets from './pages/MyTickets'
import MyEvents from './pages/MyEvents'
import CreateEvent from './pages/CreateEvent'
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import Orders from './pages/Orders'




const App = () => {

    const user = useSelector(state => state.auth);


    return (
        <BrowserRouter>
            <SnackbarProvider />
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/event/:eventId' element={<EventDetailsPage />} />
                <Route path='/search' element={<Search />} />
                <Route path='/profile/:userId' element={<Profile />} />
                <Route path='*' element={<Navigate to={'/'} />} />
                {/*  */}
                <Route element={user.token ? <Navigate to={'/'} /> : <Outlet />}>
                    <Route path='/sign-up' element={<SignUp />} />
                    <Route path='/sign-in' element={<SignIn />} />
                </Route>
                {/*  */}
                <Route element={user.token ? <Outlet /> : <Navigate to={'/sign-in'} />}>
                    <Route path='/create-event' element={<CreateEvent />} />
                    <Route path='/my-events' element={<MyEvents />} />
                    <Route path='/my-tickets' element={<MyTickets />} />
                    <Route path='/checkout/:eventId' element={<Checkout />} />
                    <Route path='/orders/:eventId' element={<Orders />} />
                    <Route path='/success' element={<Success />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App