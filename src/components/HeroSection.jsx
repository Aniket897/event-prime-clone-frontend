import { useState } from "react";
import { useNavigate } from 'react-router-dom'



const HeroSection = () => {
    const [value, setValue] = useState("");
    const navigate = useNavigate()


    const handleSearch = () => {
        if (value) {
            navigate(`/search?query=${value}`)
        }
    }
    return (
        <div className="h-[90vh] bg-gray-100 text-center flex flex-col items-center gap-5 justify-center max-sm:pt-[50px]">
            <div className="w-[90vw] flex items-center justify-center flex-col gap-4">
                <p className="logo font-bold text-5xl">Where Dreams Meet Dates: Book Your Moments</p>
                <p className="md:w-[70%]">Discover and book the extraordinary at [Your Website Name]. We're your gateway to unforgettable events tailored to your interests. From concerts to sports matches, find and reserve seamless experiences effortlessly. Join a vibrant community and elevate your calendar with moments that create lasting memories. Dive into extraordinary, book today!</p>
                <div className="flex mt-[50px] items-center w-[90vw] md:w-[40%] gap-7 max-sm:flex-col">
                    <input
                        onChange={(e) => setValue(e.target.value)}
                        className="p-4 rounded-sm flex-1 max-sm:w-full border border-500"
                        placeholder="Search Somthing..."
                        type="text" />
                    <button onClick={handleSearch} className=" sm:w-[100px] p-4 rounded-sm container font-bold text-white bg-red-500">search</button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;